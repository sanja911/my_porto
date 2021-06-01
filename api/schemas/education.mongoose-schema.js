const mongoose = require('mongoose');
const EducationSchema = new mongoose.Schema(
    {
      name: String,
      userId: String,
      majors: String,
      start_year: Number,
      graduate_year: Number,
    },
    {
      timestamps: true,
    },
);

module.exports = mongoose.model('Education', EducationSchema);
