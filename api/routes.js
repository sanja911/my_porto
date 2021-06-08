const express = require('express');
const router = new express.Router();

const auth = require('./middleware/auth');
const Users = require('./controller/user');
const Projects = require('./controller/project');
const Education = require('./controller/education');
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
// Export router module
module.exports = router;
