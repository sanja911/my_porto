const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    users: [
      {
        _id: false,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String,
      },
    ],
    description: String,
    links: String,
    start_date: Date,
    end_date: Date,
  },
);

module.exports = mongoose.model('Project', ProjectSchema);
