const mongoose = require('mongoose');
const EducationSchema = new mongoose.Schema(
    {
      name: String,
      majors: String,
      start_date: Date,
      end_date: Date,
    },
    {
      timestamps: true,
    },
);

module.exports = mongoose.model('Education', EducationSchema);
