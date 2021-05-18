const express = require('express');
const router = new express.Router();

const auth = require('./middleware/auth');
const Users = require('./controller/user');
const Projects = require('./controller/project');
// user routes
router.post('/user/', Users.create);
router.post('/user/login', Users.login);

// project routes
router.post('/project/',auth.authenticated, Projects.create);
router.put('/project/:id', auth.authenticated, Projects.update);
router.delete('/project/:id', auth.authenticated, Projects.delete);
// Export router module
module.exports = router;
