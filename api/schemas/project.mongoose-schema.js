const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    userId: String,
    description: String,
    links: String,
    start_date: Date,
    end_date: Date,
  },
);

module.exports = mongoose.model('Project', ProjectSchema);
