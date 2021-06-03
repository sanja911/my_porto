const ProjectSchema = require('../schemas/project.mongoose-schema');
const UserSchema = require('../schemas/user.mongoose-schema');

module.exports = {
  create: async (req, res) => {
    const currentUser = res.locals.user;
    const { name, description, links, start_date, end_date } = req.body;
    const findUser = await UserSchema.findById(currentUser.id);

    const createProject = await ProjectSchema.create({
      name,
      userId: currentUser.id,
      description,
      links,
      start_date,
      end_date,
    });

    findUser.project.push({ id: createProject, created: new Date().toISOString() });
    await findUser.save();
    return res.status(200).json({
      success: true,
      message: 'Success Create Project',
      result: createProject,
    });
  },

  find: async (res) => {
    const findProject = await ProjectSchema.find({})
    return res.status(200).json({
      success: true,
      result: findProject,
    });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const currentUser = res.locals.user;
    const { name, description, links } = req.body;
    const findProject = await ProjectSchema.find({userId: currentUser.id});

    if (findProject.length) {
      await ProjectSchema.findOneAndUpdate({ _id: id }, { $set: req.body });
      return res.status(200).json({
        success: true,
        message: 'Update Successfully',
        result: findProject,
      });
    }

    return res
      .status(404)
      .json({ success: false, message: 'Data Not Found In This User' });
  },

  delete: async (req, res, next) => {
    const { id } = req.params;
    const findProject = await ProjectSchema.find({ _id: id });

    if (!findProject) {
      return res.status(404).json({
        success: false,
        message: 'Project Not Found',
      });
    }

    await UserSchema.find({ _id: res.locals.user.id }).update({
      $pull: { project: {id: id }},
    });

    await ProjectSchema.findOneAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      message: 'Delete Successfully',
      result: await UserSchema.find({ _id: res.locals.user.id }),
    });
  },
};
