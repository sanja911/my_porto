const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
// Middleware
app.set('secretKey', 'node-rest');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use(express.static('public'));
app.use(require('./api/routes'));

module.exports = app;