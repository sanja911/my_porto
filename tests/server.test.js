const app = require('../index');
const User = require('../api/schemas/user.mongoose-schema');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { expect } = require('chai');

beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/JestDB",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });
  
  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
  });

  test("POST /user/create", async () => {
      const data = {
          name: 'Elise',
          email: 'Laurianne.Gerhold34@gmail.com',
          password: 'bqFFEZrGBTlgR_X'
      };

      await (await supertest(app).post("/user/create"))
      .send(data)
      .expect(200)
      .then((response) => {
        expect(response.body.name).toBe(data.name);
        expect(response.body.email).toBe(data.email);

      // Check data in the database
        // const post = await User.findOne({ _id: response.body._id });
        // expect(post).toBeTruthy();
        // expect(post.name).toBe(data.name);
        // expect(post.email).toBe(data.email);
      })
  })