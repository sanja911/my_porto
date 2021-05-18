const jwt = require('jsonwebtoken');
const config = require('../config/config');
const UserSchama = require('../schemas/user.mongoose-schema');

module.exports = {
  authenticated: async (req, res, next) => {
    const token = req.headers['authorization'] || req.query.token;

    if (!token) {
      return res.status(403).json({
        success: false,
        message: 'You dont have token',
      });
    }

    new Promise((resolve, reject) => {
      jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    })
      .then((decoded) => {
        res.locals.user = decoded;
        UserSchama.findOne({ _id: decoded.id }, (err, result) => {
          if (!result) {
            return res.status(404).json({
              success: false,
              message: 'User Not Found',
            });
          } else {
            next();
          }
        });
      })
      .catch((error) => {
        return res.status(403).json({
          success: false,
          message: error.message,
        });
      });
  },
};
