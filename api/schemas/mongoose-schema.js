const mongoose = require('mongoose');
const UserSchama = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    education: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Education',
    },
    skills: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skills',
    },
    experience: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Experiences',
    },
    created: {
      type: Date,
      default: Date.now,
    },
    updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    start_date: Date,
    end_date: Date,
  },
  {
    timestamps: true,
  }
);

const EducationSchema = new mongoose.Schema(
  {
    name: String,
    majors: String,
    start_date: Date,
    end_date: Date,
  },
  {
    timestamps: true,
  }
);

const SkillsSchema = new mongoose.Schema({
  name: String,
  expertise: {
    type: String,
    enum: ['Newbie', 'Skillful', 'Expert'],
  },
});

const ExperienceSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    start_date: String,
    end_date: String,
  },
  {
    timestamps: true,
  }
);

const SocialMediaSchema = new mongoose.Schema(
  {
    name: String,
    icon: String,
    link: String
  }
)

module.exports = mongoose.model('User', UserSchama);
module.exports = mongoose.model('Project', ProjectSchema);
module.exports = mongoose.model('Education', EducationSchema);
module.exports = mongoose.model('Skills', SkillsSchema);
module.exports = mongoose.model('Experience', ExperienceSchema);
module.exports = mongoose.model('SocialMedia', SocialMediaSchema);