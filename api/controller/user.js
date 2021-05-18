const UserSchama = require('../schemas/mongoose-schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const mongooseSchema = require('../schemas/mongoose-schema');

module.exports = {
    create: async (req, res) => {
        const hash = bcrypt.hashSync(req.body.password, 10);
        const { name, username, email } = req.body;
        const user = await UserSchama.create({
            name,
            username,
            email,
            password: hash
        })
    }
}