const app = require('../server');
const User = require('../api/schemas/user.mongoose-schema');
const Project = require('../api/schemas/project.mongoose-schema');
const mongoose = require('mongoose');
const faker = require('faker');
const supertest = require('supertest');
const { expect } = require('chai');

let jwtToken;
beforeEach(async(done) => {
    mongoose.connect("mongodb://localhost:27017/JestDB",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
});

beforeEach(async() => {
    const data = {
        name: 'Jacklyn60',
        email: 'test@mail.com',
        password: "Testing123",
    }

    await supertest(app).post('/user/').send(data).expect(200).then((response) => {
        expect(response.body.name).toBe(data.name);
        expect(response.body.email).toBe(data.email);
    })

    const loginData = {
        email: 'test@mail.com',
        password: "Testing123",
    }

    const user = await supertest(app).post('/user/login').send(loginData).expect(200).then((response) => {
        jwtToken = 'Token ' +response.body.data.token;
    });
})
// Test Project
test("POST /project/", async() => {
    const project = {
        name: faker.commerce.department(),
        description: faker.lorem.lines(),
        links: faker.internet.url(),
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString()
    }
    console.log("jwtToken: ", jwtToken)
    await supertest(app).post('/project')
    .send(project)
    .set('Authorization', jwtToken)
    .expect(200)
    .then((response) => {
        console.log(response.body.result)
        expect(response.statusCode).lessThanOrEqual(200)
        expect(200);
        expect(response.body.result.name);
        expect(response.body.result.description);
    })
}, 3000)

test("PUT /project/:id", async() =>{
    const projectData = await Project.create({
        name: faker.company.companyName(),
        description: faker.lorem.lines(),
        links: faker.internet.url(),
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString()
    })

    const project = {
        name: faker.commerce.department(),
        description: faker.lorem.lines(),
        links: faker.internet.url(),
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString()
    }
    console.log(jwtToken)
    await supertest(app).put('/project/'+ projectData._id )
    .send(project)
    .set('Authorization', jwtToken)
    .then(async(response) => {
        expect(200);
        expect(response.body.name);
        expect(response.body.description);
        expect(response.body.links);
        console.log(response.body)
        const currentProject = await Project.find({_id: response.body.id});
        console.log(currentProject)
        expect(response.body.name).toBe(currentProject.name);
        expect(response.body.description).toBe(currentProject.description);
        expect(response.body.links).toBe(currentProject.links);
    })
}, 3000)

test("DELETE /project/:id", async() => {
    const projectData = await Project.create({
        name: faker.company.companyName(),
        description: faker.lorem.lines(),
        links: faker.internet.url(),
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString()
    })
    console.log(jwtToken)
    await supertest(app).delete('/project/', projectData._id)
    .set('Authorization', jwtToken)
    .then((response) => {
        expect(200);
    })
}, 3000)