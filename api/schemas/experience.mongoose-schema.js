const mongoose = require('mongoose');
const ExperienceSchema = new mongoose.Schema(
    {
      name: String,
      description: String,
      start_year: Number,
      end_year: Number,
      total_year: String,
    },
    {
      timestamps: true,
    },
  );

module.exports = mongoose.model('Experience', ExperienceSchema);
