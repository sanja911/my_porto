const express = require('express');
const router = new express.Router();

const auth = require('./middleware/auth');
const Users = require('./controller/user');
const Projects = require('./controller/project');
const Education = require('./controller/education');
const Skill = require('./controller/skill');
const Experience = require('./controller/experience');
// user routes
router.post('/user/', Users.create);
router.post('/user/login', Users.login);

// project routes
router.post('/project/',auth.authenticated, Projects.create);
router.put('/project/:id', auth.authenticated, Projects.update);
router.delete('/project/:id', auth.authenticated, Projects.delete);

// education routes
router.post('/education/',auth.authenticated, Education.create);
router.put('/education/:id', auth.authenticated, Education.update);
router.delete('/education/:id', auth.authenticated, Education.delete);

// Skill routes
router.post('/skills', auth.authenticated, Skill.create);
router.put('/skills', auth.authenticated, Skill.update);
router.delete('/skills', auth.authenticated, Skill.delete);

// Experiences routes
router.post('/experiences', auth.authenticated, Experience.create);
router.put('/experiences/:id', auth.authenticated, Experience.update);
router.delete('/experiences/:id', auth.authenticated, Experience.delete);
// Export router module
module.exports = router;
