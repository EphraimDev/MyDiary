process.env.NODE_ENV = 'test';

import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import data from '../data/testData';

import app from '../app';

chai.should();

chai.use(chaiHttp);

describe('Tests for My Diary API endpoints', () => {
  describe('Handles valid endpoints for users login and sign up', () => {
    describe('POST /api/v1/auth/signup', () => {
      it('should add a new user to the database', (done) => {
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(data.signup)
          .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('User created');
            res.body.should.have.property('token');
            res.body.should.have.property('success');
            res.body.success.should.equal(true);
            done();
          });
      });
    });

    describe('POST /api/v1/auth/login', () => {
      it('should login in an existing user', (done) => {
        chai.request(app)
          .post('/api/v1/auth/login')
          .send(data.login)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Login successful');
            res.body.should.have.property('user');
            res.body.user.should.be.a('object');
            res.body.should.have.property('token');
            res.body.should.have.property('success');
            res.body.success.should.equal(true);
            done();
          });
      });
    });

    describe('POST /api/v1/auth/forgot-password', () => {
      it('should send a token to the user', (done) => {
        chai.request(app)
          .post('/api/v1/auth/forgot-password')
          .send(data.forgotPassword)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('A reset token has been sent to your email address');
            res.body.should.have.property('token');
            done();
          });
      });
    });
  });

  describe('Handles invalid endpoints for users login and sign up', () => {
    describe('POST /api/v1/auth/signup', () => {
      it('should return an error message for no name', (done) => {
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(data.noName)
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('First name should only contain letters');
            done();
          });
      });

      describe('POST /api/v1/auth/signup', () => {
        it('should return an error message for wrong email format', (done) => {
          chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.wrongEmailFormat)
            .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Check the email');
              done();
            });
        });
      });

      describe('POST /api/v1/auth/signup', () => {
        it('should return an error message for wrong password format', (done) => {
          chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.wrongPasswordFormat)
            .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Password must contain minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');
              done();
            });
        });
      });

      describe('POST /api/v1/auth/signup', () => {
        it('should return an error message for user that exists already', (done) => {
          chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.signup)
            .end((err, res) => {
              res.should.have.status(409);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('User exists already');
              done();
            });
        });
      });

      describe('POST /api/v1/auth/login', () => {
        it('should an error message for wrong email format', (done) => {
          chai.request(app)
            .post('/api/v1/auth/login')
            .send(data.noUser)
            .end((err, res) => {
              res.should.have.status(401);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Email or password incorrect');
              done();
            });
        });
      });

      describe('POST /api/v1/auth/login', () => {
        it('should an error message for wrong password format', (done) => {
          chai.request(app)
            .post('/api/v1/auth/login')
            .send(data.wrongPasswordLoginFormat)
            .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Password must contin minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');
              done();
            });
        });
      });

      describe('POST /api/v1/auth/login', () => {
        it('should an error message for incorrect password', (done) => {
          chai.request(app)
            .post('/api/v1/auth/login')
            .send(data.incorrectPassword)
            .end((err, res) => {
              res.should.have.status(401);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Email or password incorrect');
              done();
            });
        });
      });

      describe('POST /api/v1/auth/forgot-password', () => {
        it('should return error message for incorrect email', (done) => {
          chai.request(app)
            .post('/api/v1/auth/forgot-password')
            .send(data.incorrectEmail)
            .end((err, res) => {
              res.should.have.status(401);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Email is incorrect');
              done();
            });
        });
      });
    });
  });
});
