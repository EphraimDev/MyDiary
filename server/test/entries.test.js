import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
// import chaiAsPromised from 'chai-as-promised';
import GUID from '../utils/guid';
import { date, time } from '../utils/moment';
// chai.use(chaiAsPromised)

import app from '../app';

chai.should();

chai.use(chaiHttp);

describe('Tests for My Diary API endpoints', () => {
  describe('GET api/v1', () => {
    it('should display a welcome page', (done) => {
      chai.request(app)
        .get('/api/v1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          res.body.should.be.a('string');
          if (err) return done(err);
          done();
        });
    });
  });
  describe('Handles valid endpoints for entries', () => {
    describe('POST api/v1/entries', () => {
      it('should add an entry', (done) => {
        const newEntry = {
          entryId: GUID,
          title: 'Hello World!',
          entry: 'This is a valid test',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
          date,
          time,
        };
        chai.request(app)
          .post('/api/v1/entries')
          .send(newEntry)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.newEntry).to.include.keys('entryId');
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Entry added successfully');
            res.body.should.have.property('newEntry').eql(newEntry);
            if (err) return done(err);
            done();
          });
      });
    });

    describe('PUT api/v1/entries/:entryId', () => {
      it('should modify an entry', (done) => {
        const updatedEntry = {
          entryId: 'gsk57w62-d3af-6y78-6b85-hd640d8kstw9',
          title: 'Hello World!',
          entry: 'This is a valid test',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
          date,
          time,
        };
        chai.request(app)
          .put('/api/v1/entries/gsk57w62-d3af-6y78-6b85-hd640d8kstw9')
          .send(updatedEntry)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.updatedEntry).to.include.keys('entryId');
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Entry modified successfully');
            res.body.should.have.property('updatedEntry').eql(updatedEntry);
            if (err) return done(err);
            done();
          });
      });
    });

    describe('GET api/v1/entries/:entryId', () => {
      it('should return an entry', (done) => {
        chai.request(app)
          .get('/api/v1/entries/gsk57w62-d3af-6y78-6b85-e9b30a043e28')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.entryFound).to.include.keys('entryId');
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Entry was found');
            res.body.should.have.property('entryFound');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('GET api/v1/entries', () => {
      it('should get all entries', (done) => {
        chai.request(app)
          .get('/api/v1/entries')
          .end((err, res) => {
            expect(res.body).to.include.keys('entries');
            expect(res.statusCode).to.equal(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Entries retrieved successfully');
            res.body.should.have.property('entries');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('DELETE api/v1/entries/:entryId', () => {
      it('should delete selected ride offer option', (done) => {
        chai.request(app)
          .delete('/api/v1/entries/gsk57w62-d3af-6y78-6b85-hd640d8kstw9')
          .end((err, res) => {
            expect(res.statusCode).to.equal(204);
            if (err) return done(err);
            done();
          });
      });
    });
  });

  describe('Handles invalid endpoints for entries', () => {
    describe('POST api/v1/entries', () => {
      it('should return an error message to check entry input', (done) => {
        const newEntry = {
          id: GUID,
          entry: 'This is an invalid test',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
          date,
          time,
        };
        chai.request(app)
          .post('/api/v1/entries')
          .send(newEntry)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Valid title and entry data is required');
            if (err) return done(err);
            done();
          });
      });

      it('should return an error message to check input fields', (done) => {
        const newEntry = {
          id: GUID,
          title: 'Invalid endpoint',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
          date,
          time,
        };
        chai.request(app)
          .post('/api/v1/entries')
          .send(newEntry)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Valid title and entry data is required');
            if (err) return done(err);
            done();
          });
      });

      it('should return an error message to add valid image url', (done) => {
        const newEntry = {
          id: GUID,
          title: 'Invalid endpoint',
          entry: 'Image link is not valid',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop',
          date,
          time,
        };
        chai.request(app)
          .post('/api/v1/entries')
          .send(newEntry)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Add a valid image');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('PUT api/v1/entries/:entryId', () => {
      it('should return an error message to check entry input', (done) => {
        const updatedEntry = {
          id: '34c00ed9-6571-57a6-4a5e-b408e0220754',
          entry: 'This is an invalid test',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
          date,
          time,
        };
        chai.request(app)
          .put('/api/v1/entries/34c00ed9-6571-57a6-4a5e-b408e0220754')
          .send(updatedEntry)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Valid title and entry data is required');
            if (err) return done(err);
            done();
          });
      });

      it('should return an error message to check input fields', (done) => {
        const updatedEntry = {
          id: '34c00ed9-6571-57a6-4a5e-b408e0220754',
          title: 'Invalid endpoint',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
          date,
          time,
        };
        chai.request(app)
          .put('/api/v1/entries/2e00bcef-d3af-6y78-6b85-e9b30a043e28')
          .send(updatedEntry)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Valid title and entry data is required');
            if (err) return done(err);
            done();
          });
      });

      it('should return an error message to add valid image url', (done) => {
        const updatedEntry = {
          id: GUID,
          title: 'Invalid endpoint',
          entry: 'Image link is not valid',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop',
          date,
          time,
        };
        chai.request(app)
          .put('/api/v1/entries/2e00bcef-d3af-6y78-6b85-e9b30a043e28')
          .send(updatedEntry)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Add a valid image');
            if (err) return done(err);
            done();
          });
      });

      it('should return an error message for an entry that does not exist', (done) => {
        const updatedEntry = {
          entryId: 'gsk57w62-d3af-6y78-6b85-hd6d8kstw9',
          title: 'Hello World!',
          entry: 'This should not valid test',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
          date,
          time,
        };
        chai.request(app)
          .put('/api/v1/entries/gsk57w62-d3af-6y78-6b85-hd6d8kstw9')
          .send(updatedEntry)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Entry does not exist');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('GET api/v1/entries/:entryId', () => {
      it('should return an error message for an entry that does not exist', (done) => {
        chai.request(app)
          .get('/api/v1/rides/2e00ucef-d3af-9d13-6b85-e9b30a043e28')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            res.body.should.be.a('object');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('DELETE api/v1/entries/:entryId', () => {
      it('should return error if selected entry id does not exist', (done) => {
        chai.request(app)
          .delete('/api/v1/entries/2e00ucef-d3af-9d13-6b85-e9b30a043e28')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Entry not found');
            if (err) return done(err);
            done();
          });
      });
    });
  });
});
