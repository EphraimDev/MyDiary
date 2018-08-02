import auth from '../middlewares/auth';
import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import data from '../data/entriesData';

import app from '../app';

chai.should();

chai.use(chaiHttp);

const user = {
  email: 'abgf@yahoo.com',
  password: 'JamesAnd1@'
};

const token = auth.generateToken(user);

describe('Tests for My Diary API endpoints', () => {
  describe('Handles valid endpoints for diary entries', () => {
    describe('GET /api/v1/entries', () => {
      it('should get all entries', (done) => {
        chai.request(app)
          .get('/api/v1/entries')
          .set('authorization', `bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('entries');
            res.body.should.have.property('message');
            res.body.message.should.equal('All entries successfully retrieved');
            res.body.should.have.property('success');
            res.body.success.should.equal(true);
            done();
          });
      });
    });

    describe('GET /api/v1/entries/:entryId', () => {
      it('should get an existing entry', (done) => {
        chai.request(app)
          .get('/api/v1/entries/gsk57w62-d3af-6y78-6b85-e9b30a043e28')
          .set('authorization', `bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Entry successfully retrieved');
            res.body.should.have.property('entry');
            res.body.entry.should.be.a('object');
            res.body.should.have.property('success');
            res.body.success.should.equal(true);
            done();
          });
      });
    });

    describe('POST /api/v1/entries', () => {
      it('should add a new entry', (done) => {
        chai.request(app)
          .post('/api/v1/entries')
          .set('authorization', `bearer ${token}`)
          .send(data.newEntry)
          .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Entry successfully created');
            res.body.should.have.property('success');
            res.body.success.should.equal(true);
            res.body.should.have.property('entry');
            done();
          });
      });
    });

    describe('PUT /api/v1/entries/:entryId', () => {
      it('should modify an entry', (done) => {
          chai.request(app)
            .put(`/api/v1/entries/2e00bcef-d3af-9d13-6b85-e9b30a043e28`)
            .set('authorization', `bearer ${token}`)
            .send(data.modifyEntry)
            .end((err, res) => {
              res.should.have.status(201);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Entry successfully modified');
              res.body.should.have.property('success');
              res.body.success.should.equal(true);
              done();
            });
          });
    });

    describe('DELETE /api/v1/entries/:entryId', () => {
      it('should delete an entry', (done) => {
        chai.request(app)
          .delete('/api/v1/entries/gsk57w62-d3af-6y78-idt4-e9b30a043e28')
          .set('authorization', `bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Entry successfully deleted');
            res.body.should.have.property('success');
            res.body.success.should.equal(true);
            done();
          });
      });
    });
  });

  describe('Handles invalid endpoints for diary entries', () => {
    describe('GET /api/v1/entries/1', () => {
      it('should return an error message for entry that does not exist', (done) => {
        chai.request(app)
          .get('/api/v1/entries/1')
          .set('authorization', `bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(404);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Entry does not exist');
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            done();
          });
      });
    });
 
    describe('PUT /api/v1/entries/1', () => {
      it('should return an error message for entry that does not exist', (done) => {
        chai.request(app)
          .put('/api/v1/entries/1')
          .set('authorization', `bearer ${token}`)
          .send(data.modifyEntry)
          .end((err, res) => {
            res.should.have.status(404);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Entry does not exist');
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            done();
          });
      });
    });

    describe('PUT /api/v1/entries/1', () => {
      it('should return an error message for entry that can no longer be modified', (done) => {
        chai.request(app)
          .put('/api/v1/entries/gsk57w62-d3af-6y78-6b85-e9b30a043e28')
          .set('authorization', `bearer ${token}`)
          .send(data.modifyEntry)
          .end((err, res) => {
            res.should.have.status(403);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Entry can no longer be modified');
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            done();
          });
      });
    });

    describe('PUT /api/v1/entries/:entryId', () => {
      it('should return an error message for ni title', (done) => {
          chai.request(app)
            .put(`/api/v1/entries/2e00bcef-d3af-9d13-6b85-e9b30a043e28`)
            .set('authorization', `bearer ${token}`)
            .send(data.noTitle)
            .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Title cannot be empty');
              done();
            });
          });
    });

    describe('PUT /api/v1/entries/:entryId', () => {
      it('should return an error message for no entry', (done) => {
          chai.request(app)
            .put(`/api/v1/entries/2e00bcef-d3af-9d13-6b85-e9b30a043e28`)
            .set('authorization', `bearer ${token}`)
            .send(data.noEntry)
            .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Entry cannot be empty');
              done();
            });
          });
    });

    describe('PUT /api/v1/entries/:entryId', () => {
      it('should return an error message for invalid image', (done) => {
          chai.request(app)
            .put(`/api/v1/entries/2e00bcef-d3af-9d13-6b85-e9b30a043e28`)
            .set('authorization', `bearer ${token}`)
            .send(data.wrongImg)
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

    describe('POST /api/v1/entries', () => {
      it('should return an error message for no title', (done) => {
          chai.request(app)
            .post(`/api/v1/entries`)
            .set('authorization', `bearer ${token}`)
            .send(data.noTitle)
            .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Title cannot be empty');
              done();
            });
          });
    });

    describe('POST /api/v1/entries', () => {
      it('should return an error message for no entry', (done) => {
          chai.request(app)
            .post(`/api/v1/entries`)
            .set('authorization', `bearer ${token}`)
            .send(data.noEntry)
            .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Entry cannot be empty');
              done();
            });
          });
    });

    describe('POST /api/v1/entries', () => {
      it('should return an error message for invalid image', (done) => {
          chai.request(app)
            .post(`/api/v1/entries`)
            .set('authorization', `bearer ${token}`)
            .send(data.wrongImg)
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

    describe('DELETE /api/v1/entries/1', () => {
      it('should return an error message for entry that does not exist', (done) => {
        chai.request(app)
          .delete('/api/v1/entries/1')
          .set('authorization', `bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(404);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Entry does not exist');
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            done();
          });
      });
    });

    describe('DELETE /api/v1/entries/1', () => {
      it('should return an error message for entry that does not exist', (done) => {
        chai.request(app)
          .delete('/api/v1/entries/1')
          .set('authorization', `bearer abcd`)
          .end((err, res) => {
            res.should.have.status(401);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Token is invalid or not provided');
            done();
          });
      });
    });
  });
});
