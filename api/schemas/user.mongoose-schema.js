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
        _id: false,
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'Education'},
        created: String,
      },
    ],
    skills: [
      {
        _id: false,
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'Education'},
        created: String,
      },
    ],
    experience: [
      {
        _id: false,
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'Experiences'},
        created: String
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
