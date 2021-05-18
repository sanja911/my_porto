const mongoose = require('mongoose');
const UserSchama = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    project: [
      {
        _id: false,
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
        created: String,
      },
    ],
    education: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Education',
      },
    ],
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skills',
      },
    ],
    experience: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experiences',
      },
    ],
    created: [
      {
        type: Date,
        default: Date.now,
      },
    ],
    updated: [
      {
        type: Date,
        default: Date.now,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', UserSchama);
