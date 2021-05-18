const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express();
// Middleware
app.set('secretKey', 'node-rest');
app.use(cors());
mongoose.connect('mongodb://localhost/porto', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use(require('./api/routes'));
app.listen(8080, () => response.json('Server On !'));
