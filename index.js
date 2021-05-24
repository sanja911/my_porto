const mongoose = require('mongoose');
const app = require('./server');

mongoose.connect('mongodb://localhost/porto', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(8080, () => {
    console.log("Server Started")
  })
})