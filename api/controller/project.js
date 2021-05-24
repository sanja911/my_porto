const ProjectSchema = require('../schemas/project.mongoose-schema');
const UserSchema = require('../schemas/user.mongoose-schema');

module.exports = {
  create: async (req, res) => {
    const { name, description, links, start_date, end_date } = req.body;
    const currentUser = res.locals.user;
    const findUser = await UserSchema.findById(currentUser.id);
    const users = { userId: currentUser.id, name: findUser.name };

    const createProject = await ProjectSchema.create({
      name,
      users,
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

  // TODO: This function only for test
  findLastProject : async (req, res) => {
    /**
     * 1. Get newer project
     * 2. return the id
     */
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name, description, links } = req.body;
    const findProject = await ProjectSchema.findById(id);

    if (findProject.users.length) {
      await ProjectSchema.findOneAndUpdate({ _id: id }, { $set: req.body });
      return res.status(200).json({
        success: true,
        message: 'Update Successfully',
        result: findProject,
      });
    }

    return res
      .status(404)
      .json({ success: false, message: 'Data Not Found On This User' });
  },

  delete: async (req, res, next) => {
    const { id } = req.params;
    const findProject = await ProjectSchema.find({ _id: id });
    if (!findProject) {
      return res.status(403).json({
        success: false,
        message: 'Data Not Found',
      });
    }
    await ProjectSchema.findOneAndDelete({ _id: id });
    await UserSchema.find({ _id: res.locals.user.id }).updateOne({
      $pull: { 'project.id': findProject._id },
    }, (err, next) => {
      if (err) next(err);
      return true;
    });
    return res.status(200).json({
      success: true,
      message: 'Delete Successfully',
      result: await UserSchema.find({ _id: res.locals.user.id }),
    });
  },
};
