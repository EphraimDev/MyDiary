import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import data from '../data/userData';
//import resetUser from '../data/resetInfo';

import app from '../app';

chai.should();

chai.use(chaiHttp);

//console.log(resetUser);
describe('Tests for My Diary API endpoints', () => {
  describe('GET api/v1', () => {
    it('should display a welcome page', (done) => {
      chai.request(app)
        .get('/api/v1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('string');
          done();
        });
    });
  });

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

    /*describe('POST /api/v1/auth/reset-password', () => {
      it('should reset the password', (done) => {
        chai.request(app)
          .post('/api/v1/auth/reset-password')
          .send(resetUser)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Password has been reset successfully');
            res.body.should.have.property('userToken');
            done();
          });
      });
    });*/
  });

  describe('Handles invalid endpoints for users login and sign up', () => {
    describe('POST /api/v1/auth/signup', () => {
      it('should return an error message for no first name', (done) => {
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(data.noFirstName)
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('First name should only contain letters');
            done();
          });
      });
    });

    describe('POST /api/v1/auth/signup', () => {
      it('should return an error message for no last name', (done) => {
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(data.noLastName)
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Last name should only contain letters');
            done();
          });
      });
    });

    describe('POST /api/v1/auth/signup', () => {
      it('should return an error message for no country', (done) => {
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(data.noCountry)
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Country should only contain letters');
            done();
          });
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
        it('should return an error message for no valid image', (done) => {
          chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.noValidImg)
            .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Add a valid image');
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
        it('should return an error message for wrong email format', (done) => {
          chai.request(app)
            .post('/api/v1/auth/login')
            .send(data.wrongEmailLoginFormat)
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

      describe('POST /api/v1/auth/login', () => {
        it('should an error message for user that does not exist', (done) => {
          chai.request(app)
            .post('/api/v1/auth/login')
            .send(data.noUser)
            .end((err, res) => {
              res.should.have.status(401);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('User does not exist');
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

      describe('POST /api/v1/auth/forgot-password', () => {
        it('should return error message for invalid email', (done) => {
          chai.request(app)
            .post('/api/v1/auth/forgot-password')
            .send(data.invalidEmail)
            .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Invalid email');
              done();
            });
        });
      });

      describe('POST /api/v1/auth/reset-password', () => {
        it('should return error message for incorrect email', (done) => {
          chai.request(app)
            .post('/api/v1/auth/reset-password')
            .send(data.incorrectResetEmail)
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

      describe('POST /api/v1/auth/reset-password', () => {
        it('should return error message for no email', (done) => {
          chai.request(app)
            .post('/api/v1/auth/reset-password')
            .send(data.noResetEmail)
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

      describe('POST /api/v1/auth/reset-password', () => {
        it('should return error message for no password', (done) => {
          chai.request(app)
            .post('/api/v1/auth/reset-password')
            .send(data.noResetPassword)
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

      describe('POST /api/v1/auth/reset-password', () => {
        it('should return error message for no token', (done) => {
          chai.request(app)
            .post('/api/v1/auth/reset-password')
            .send(data.noToken)
            .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Type in the correct token');
              done();
            });
        });
      });

      describe('POST /api/v1/auth/reset-password', () => {
        it('should return error message for wrong reset token', (done) => {
          chai.request(app)
            .post('/api/v1/auth/reset-password')
            .send(data.wrongToken)
            .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Password reset token is invalid or has expired');
              done();
            });
        });
      });
  });
});
