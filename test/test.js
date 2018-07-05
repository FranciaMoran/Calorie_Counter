'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const should = chai.should();
const {app, runServer, closeServer} = require('../server');
const {loggedItem} = require('../models');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);
const expect = chai.expect;

/////////////////////////////////////////////////

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}


///////////////////////////////////////////

function seedBlogPostData() {
  console.info('seeding food data');
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      name: faker.commerce.color(), 
      calories: faker.random.number(),
      cholesterol: faker.random.number(),
      dietaryFiber: faker.random.number(),
      protein: faker.random.number(),
      saturatedFat: faker.random.number(),
      sodium: faker.random.number(),
      sugars: faker.random.number(),
      carbohydrates: faker.random.number(),
      totalFat: faker.random.number()
    });
  }
  return loggedItem.insertMany(seedData);
}

//////////////////////////////////////////////


describe('logged food API resource', function () {

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function () {
    return seedBlogPostData();
  });

  afterEach(function () {
    return tearDownDb();
  });

  after(function () {
    return closeServer();
  });

  ///////////////////////////////////////////////////////////

  it('should return greeting page', function () {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });

describe('The greeting page', function () {
it('should return the search page when the button is pressed', function () {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
});

/////////////////////////////////////////////////////////////////
 describe('GET endpoint', function () {

    it('should return all existing logs', function () {
      let res;
      return chai.request(app)
        .get('/logged')
        .then(_res => {
          res = _res;
          res.should.have.status(200);
          res.body.should.have.lengthOf.at.least(1);

          return loggedItem.count();
 })
        .then(count => {
          res.body.should.have.lengthOf(count);
        });
    });

    it('should return food items with right fields', function () {

      let resLogs;
      return chai.request(app)
        .get('/logged')
        .then(function (res) {

          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.lengthOf.at.least(1);

          res.body.forEach(function (logs) {
            logs.should.be.a('object');
            logs.should.include.keys('id', 'name', 'calories', 'cholesterol', 'dietaryFiber', 'protein', 'saturatedFat', 'sodium', 'sugars', 'carbohydrates', 'totalFat');
          });
          resLogs = res.body[0];
          return loggedItem.findById(resLogs.id);
        })
        .then(logs => {
          resLogs.name.should.equal(logs.name);
          resLogs.calories.should.equal(logs.calories);
          resLogs.cholesterol.should.equal(logs.cholesterol);
          resLogs.dietaryFiber.should.equal(logs.dietaryFiber);
          resLogs.protein.should.equal(logs.protein);
          resLogs.saturatedFat.should.equal(logs.saturatedFat);
          resLogs.sodium.should.equal(logs.sodium);
          resLogs.sugars.should.equal(logs.sugars);
          resLogs.carbohydrates.should.equal(logs.carbohydrates);
          resLogs.totalFat.should.equal(logs.totalFat);
        });
    });
  });

 describe('POST endpoint', function () {
    it('should add a new food item', function () {

      const newItem = {
      name: faker.commerce.color(), 
      calories: faker.random.number(),
      cholesterol: faker.random.number(),
      dietaryFiber: faker.random.number(),
      protein: faker.random.number(),
      saturatedFat: faker.random.number(),
      sodium: faker.random.number(),
      sugars: faker.random.number(),
      carbohydrates: faker.random.number(),
      totalFat: faker.random.number()
      };

      return chai.request(app)
        .post('/logged')
        .send(newItem)
        .then(function (res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'id', 'name', 'calories', 'cholesterol', 'dietaryFiber', 'protein', 'saturatedFat', 'sodium', 'sugars', 'carbohydrates', 'totalFat');
          res.body.id.should.not.be.null;
          res.body.name.should.equal(newItem.name);
          res.body.calories.should.equal(newItem.calories);
          res.body.cholesterol.should.equal(newItem.cholesterol);
          res.body.dietaryFiber.should.equal(newItem.dietaryFiber);
          res.body.protein.should.equal(newItem.protein);
          res.body.saturatedFat.should.equal(newItem.saturatedFat);
          res.body.sodium.should.equal(newItem.sodium);
          res.body.sugars.should.equal(newItem.sugars);
          res.body.carbohydrates.should.equal(newItem.carbohydrates);
          res.body.totalFat.should.equal(newItem.totalFat);
          return loggedItem.findById(res.body.id);
        })
        .then(function (post) {
          post.name.should.equal(newItem.name);
          post.calories.should.equal(newItem.calories);
          post.cholesterol.should.equal(newItem.cholesterol);
          post.dietaryFiber.should.equal(newItem.dietaryFiber);
          post.protein.should.equal(newItem.protein);
          post.saturatedFat.should.equal(newItem.saturatedFat);
          post.sodium.should.equal(newItem.sodium);
          post.sugars.should.equal(newItem.sugars);
          post.carbohydrates.should.equal(newItem.carbohydrates);
          post.totalFat.should.equal(newItem.totalFat);
        });
    });
  });

describe('PUT endpoint', function () {

    it('should update details when user edits', function () {
      const updateData = {
      name: 'pineapple', 
      calories: 100,
      cholesterol: 0,
      dietaryFiber: 1,
      protein: 1,
      saturatedFat: 0,
      sodium: 5,
      sugars: 10,
      carbohydrates: 10,
      totalFat: 0
      };

      return loggedItem
        .findOne()
        .then(post => {
          updateData.id = post.id;

          return chai.request(app)
            .put(`/logged/${post.id}`)
            .send(updateData);
        })
        .then(res => {
          res.should.have.status(204);
          return loggedItem.findById(updateData.id);
        })
        .then(post => {
          post.name.should.equal(updateData.name);
          post.calories.should.equal(updateData.calories);
          post.cholesterol.should.equal(updateData.cholesterol);
          post.dietaryFiber.should.equal(updateData.dietaryFiber);
          post.protein.should.equal(updateData.protein);
          post.saturatedFat.should.equal(updateData.saturatedFat);
          post.sodium.should.equal(updateData.sodium);
          post.sugars.should.equal(updateData.sugars);
          post.carbohydrates.should.equal(updateData.carbohydrates);
          post.totalFat.should.equal(updateData.totalFat);
        });
    });
  });

describe('DELETE endpoint', function () {

    it('should delete a post by id', function () {

      let post;

      return loggedItem
        .findOne()
        .then(_post => {
          post = _post;
          return chai.request(app).delete(`/logged/${post.id}`);
        })
        .then(res => {
          res.should.have.status(204);
          return loggedItem.findById(post.id);
        })
        .then(_post => {
          should.not.exist(_post);
        });
    });
  });

});


