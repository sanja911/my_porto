const ExperienceSchema = require('../schemas/experience.mongoose-schema');
const UserSchema = require('../schemas/user.mongoose-schema');

module.exports = {
    create: async (req, res) => {
        let end_year;
        let start_year;
        const currentUser = res.locals.user;
        start_year = req.body.start_year;
        end_year = req.body.end_year;

        if (!end_year) {
            end_year = new Date().getFullYear();
        }

        if (!start_year) {
            start_year = new Date().getFullYear();
        }

        const total_year = end_year - start_year;
        const { name, description } = req.body;
        const findUser = await UserSchema.findById(currentUser.id);
        const createExperience = await ExperienceSchema.create({
            name,
            description,
            start_year,
            end_year,
            total_year: `${total_year} year`
        });

        findUser.experience.push({
            id: createExperience, created: new Date().toISOString(),
        });

        await findUser.save();

        return res.status(200).json({
            success: true,
            message: 'Education Success Added To '+ currentUser.id +' ',
            result: createExperience,
        });
    },

    update: async (req, res) => {
        let end_year;
        let start_year;
        const {id} = req.params;
        const findExperience  = await ExperienceSchema.findById(id);

        start_year = req.body.start_year;
        end_year = req.body.end_year;

        if (!end_year) {
            end_year = new Date().getFullYear();
        }

        if (!start_year) {
            start_year = new Date().getFullYear();
        }

        const total_year = end_year - start_year;

        if(findExperience) {
            await ExperienceSchema.findOneAndUpdate({_id: id}, {$set: 
                {
                    name: req.body.name,
                    description: req.body.description,
                    start_year: start_year,
                    end_year: end_year,
                    total_year: `${total_year} year` 
                } 
            });

            return res.status(200).json({
                success: true,
                message: 'Update Successfully',
                result: findExperience,
            });
        }

        res.status(404).json({
            success: false,
            message: 'Data Not Found In This User',
        });
    },

    delete: async (req, res ) => {
        const { id } = req.params;
        const experience = await ExperienceSchema.findById(id);
    
        if (experience) {
            await UserSchema.find({ _id: res.locals.user.id }).update({
                $pull: { education: {id: id }},
            });
            
            await ExperienceSchema.findOneAndDelete({ _id: id });
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