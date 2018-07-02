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
      // strategy:
      //    1. get back all posts returned by by GET request to `/posts`
      //    2. prove res has right status, data type
      //    3. prove the number of posts we got back is equal to number
      //       in db.
      let res;
      return chai.request(app)
        .get('/logged')
        .then(_res => {
          res = _res;
          res.should.have.status(200);
          // otherwise our db seeding didn't work
          res.body.should.have.lengthOf.at.least(1);

          return loggedItem.count();
 })
        .then(count => {
          // the number of returned posts should be same
          // as number of posts in DB
          res.body.should.have.lengthOf(count);
        });
    });

    it('should return food items with right fields', function () {
      // Strategy: Get back all posts, and ensure they have expected keys

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
            logs.should.include.keys('id', 'name', 'calories', 'cholesterol', 'dietaryFiber');
          });
          // just check one of the posts that its values match with those in db
          // and we'll assume it's true for rest
          resLogs = res.body[0];
          return loggedItem.findById(resLogs.id);
        })
        .then(logs => {
          resLogs.name.should.equal(logs.name);
          resLogs.calories.should.equal(logs.calories);
          resLogs.cholesterol.should.equal(logs.cholesterol);
          resLogs.dietaryFiber.should.equal(logs.dietaryFiber);
        });
    });
  });
 });