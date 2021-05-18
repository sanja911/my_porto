const mongoose = require('mongoose');
const SkillsSchema = new mongoose.Schema({
    name: String,
    expertise: {
      type: String,
      enum: ['Newbie', 'Skillful', 'Expert'],
    },
  });

module.exports = mongoose.model('Skills', SkillsSchema);
