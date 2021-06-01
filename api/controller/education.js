const EducationSchema = require('../schemas/education.mongoose-schema');
const UserSchema = require('../schemas/user.mongoose-schema');

module.exports = {
    create: async (req, res) => {
        const currentUser = res.locals.user;
        const { name, majors, start_year, graduate_year } = req.body;
        const findUser = await UserSchema.findById(currentUser.id);
        const createEducation = await EducationSchema.create({
            name,
            userId: currentUser.id,
            majors,
            start_year,
            graduate_year
        })

        findUser.education.push({
            id: createEducation, created: new Date().toISOString()
        })
        await findUser.save();

        return res.status(200).json({
            success: true,
            message: 'Education Success Added To '+ currentUser.id +' ',
            result: createEducation
        })
    },

    update: async (req, res) => {
        const {id} = req.params;
        const { name, majors, start_year, end_date } = req.body;
        const findEducation  = await EducationSchema.findById(id);

        if(findEducation.user.length) {
            await EducationSchema.findOneAndUpdate({_id: id}, {$set: req.body});
            return res.status(200).json({
                success: true,
                message: 'Update Successfully',
                result: findEducation,
            });
        }

        res.status(404).json({
            success: false,
            message: 'Data Not Found In This User'
        })
    },

    delete: async (req, res, next) => {
        const { id } = req.params;
        const education = await EducationSchema.findById(id);
    
        if (education.length) {
            await UserSchema.find({ _id: res.locals.user.id }).update({
                $pull: { education: {id: id }},
            });
            
            await EducationSchema.findOneAndDelete({ _id: id });
            return res.status(200).json({
                success: true,
                message: 'Delete Successfully',
                result: await UserSchema.find({ _id: res.locals.user.id }),
            });
        }

        return res.status(404).json({
          success: false,
          message: 'Education Data Not Found',
        });
    },
}