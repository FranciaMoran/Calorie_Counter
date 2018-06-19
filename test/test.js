'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

 
describe('localhost:3000', function () {
   before(function() {
    return runServer();
  });

   after(function() {
    return closeServer();
  });

  it('should return greeting page', function () {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
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