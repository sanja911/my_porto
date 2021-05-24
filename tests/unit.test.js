const app = require('../server');
const User = require('../api/schemas/user.mongoose-schema');
const mongoose = require('mongoose');
const supertest = require('supertest');

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

// Create User
test("POST /user/", async() => {
    const data = {
        name: 'Jacklyn60',
        email: 'test@mail.com',
        password: "Testing123",
    }

    await supertest(app).post('/user/').send(data).expect(200).then((response) => {
        expect(response.body.name).toBe(data.name);
        expect(response.body.email).toBe(data.email);
    })
})

test("POST /user/login/", async() => {
    await User.create({
        email: 'test@mail.com',
        password: "Testing123",
    })

    const loginData = {
        email: 'test@mail.com',
        password: "Testing123",
    }

    await supertest(app).post('/user/login').send(loginData).expect(200).then((response) => {
        expect(response.body.token);
    })
})