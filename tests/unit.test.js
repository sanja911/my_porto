const app = require('../server');
const User = require('../api/schemas/user.mongoose-schema');
const Project = require('../api/schemas/project.mongoose-schema');
const Education = require('../api/schemas/education.mongoose-schema');
const mongoose = require('mongoose');
const faker = require('faker');
const supertest = require('supertest');
const uri = "mongodb+srv://sanja_porto:sanja1996@cluster0.baefa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const uri2 = "mongodb://localhost:27017";
let jwtToken;
let user_id;
beforeEach((done) => {
    mongoose.connect(uri2, { useNewUrlParser: true, useUnifiedTopology: true },
      async () => {
      const data = {
          name: 'Jacklyn60',
          email: 'test@mail.com',
          password: "Testing123",
      }
      
      await supertest(app).post('/user/').send(data).expect(200)
      
      const loginData = {
          email: 'test@mail.com',
          password: "Testing123",
      }
      
      await supertest(app).post('/user/login/').send(loginData).expect(200).then((response) => {
        jwtToken = 'Token ' +response.body.data.token;
        user_id = response.body.data.userInfo._id;
      });
      done()
    });
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
});

// ====== Project Testing ======
describe('PROJECT API UNIT TESTING', () => {
    it("POST /project/", async() => {
        const project = {
            name: faker.commerce.department(),
            userId: user_id,
            description: faker.lorem.lines(),
            links: faker.internet.url(),
            start_date: new Date().toISOString(),
            end_date: new Date().toISOString()
        }
    
        await supertest(app).post('/project')
        .send(project)
        .set('Authorization', jwtToken)
        .expect(200)
        .then(async (response) => {
            const currentProject = await Project.findOne({_id: response.body.result._id});
            expect(response.statusCode).toBe(200)
            expect(response.body.result.name).toBe(currentProject.name);
            expect(response.body.result.description).toBe(currentProject.description);
            expect(response.body.result.link).toBe(currentProject.link);
        })
    }, 3000)
    
    it("PUT /project/:id", async() =>{
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
    
        await supertest(app).put(`/project/${projectData._id}` )
        .send(project)
        .set('Authorization', jwtToken)
        .then(async(response) => {
            expect(200);
            expect(response.body.name);
            expect(response.body.description);
            expect(response.body.links);
            const currentProject = await Project.find({_id: response.body.id});
            expect(response.body.name).toBe(currentProject.name);
            expect(response.body.description).toBe(currentProject.description);
            expect(response.body.links).toBe(currentProject.links);
        })
    }, 3000)
    
    it("DELETE /project/:id", async() => {
        const projectData = await Project.create({
            name: faker.company.companyName(),
            description: faker.lorem.lines(),
            links: faker.internet.url(),
            start_date: new Date().toISOString(),
            end_date: new Date().toISOString()
        })
    
        await supertest(app).delete(`/project/${projectData._id}`)
        .set('Authorization', jwtToken)
        .then((response) => {
            expect(response.statusCode).toBe(200);
        })
    }, 3000);
})

describe('EDUCATION API UNIT TESTING', () => {
    it('POST /education', async() => {
        const education = {
            name: faker.company.companyName(),
            userId: user_id,
            majors: faker.name.jobTitle(),
            start_year: new Date().getUTCFullYear(),
            graduate_year: new Date().getUTCFullYear(),
        } 
    
        await supertest(app).post('/education')
        .send(education)
        .set('Authorization', jwtToken)
        .expect(200)
        .then(async (response) => {
            const currentEducation = await Education.findById(response.body.result._id)
            expect(response.statusCode).toBe(200);
            expect(response.body.result.name).toBe(currentEducation.name);
            expect(response.body.result.userId).toBe(user_id);
            expect(response.body.result.majors).toBe(currentEducation.majors);
        })
    })
})