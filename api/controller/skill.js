const SkillSchema = require('../schemas/skill.mongoose-schema');
const UserSchema = require('../schemas/user.mongoose-schema');

module.exports = {
    create: async (req, res) => {
        const currentUser = res.locals.user;
        const { name, expertise } = req.body;
        const findUser = await UserSchema.findById(currentUser.id);
        const createSkills = await SkillSchema.create({
            name,
            expertise
        })

        findUser.skills.push({
            id: createSkills, created: new Date().toISOString(),
        })
        await findUser.save();

        return res.status(200).json({
            success: true,
            message: 'Skills Success Added To '+ currentUser.id +' ',
            result: createSkills,
        })
    },

    update: async (req, res) => {
        const {id} = req.params;
        const currentUser = res.locals.user;
        const { name, expertise } = req.body;
        const findSkills  = await SkillSchema.findById(id);

        if(findSkills) {
            await SkillSchema.findOneAndUpdate({_id: id}, {$set: req.body});
            return res.status(200).json({
                success: true,
                message: 'Update Successfully',
                result: findSkills,
            });
        }

        res.status(404).json({
            success: false,
            message: 'Data Not Found In This User',
        })
    },

    delete: async (req, res ) => {
        const { id } = req.params;
        const skill = await SkillSchema.findById(id);
    
        if (skill) {
            await UserSchema.find({ _id: res.locals.user.id }).update({
                $pull: { skills: {id: id }},
            });
            
            await SkillSchema.findOneAndDelete({ _id: id });
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