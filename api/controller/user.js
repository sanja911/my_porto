const UserSchema = require('../schemas/user.mongoose-schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
  create: async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const findEmail = await UserSchema.find({ email: req.body.email });

    if (findEmail.length) {
      return res.status(401).json({
        success: false,
        message: 'This email is available, use another email',
      });
    } else {
      const { name, email, password } = req.body;
      const user = await UserSchema.create({
        name,
        email,
        password: hash,
      });

      return res.status(200).json(user);
    }
  },

  login: async (req, res) => {
    const user = await UserSchema.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found',
      });
    }

    const getPassword = bcrypt.compareSync(req.body.password, user.password);
    const userInfo = await UserSchema.findOne(
      { email: req.body.email },
      { password: getPassword },
    );

    if (!userInfo) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorized to login',
      });
    }

    const token = jwt.sign({ id: userInfo._id }, config.JWT_SECRET, {
      expiresIn: '8h',
    });

    return res.status(200).json({
      success: true,
      data: { userInfo, token },
    });
  },
};
