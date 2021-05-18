const mongoose = require('mongoose');
const ExperienceSchema = new mongoose.Schema(
    {
      name: String,
      description: String,
      start_date: String,
      end_date: String,
    },
    {
      timestamps: true,
    },
  );

module.exports = mongoose.model('Experience', ExperienceSchema);
