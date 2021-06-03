const UserSchema = require('../schemas/user.mongoose-schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
  create: async (req, res) => {
    let hash;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hashed) => {
        hash = hashed
        console.log(hashed)
      });
    })
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
    // let userPassword;
    const user = await UserSchema.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found',
      });
    }

    const userPassword = bcrypt.compareSync(req.body.password, user.password, (err,result) => {
      return result;
    });
    
    const userInfo = await UserSchema.find(
      { email: req.body.email });

    if (!userPassword) {
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
