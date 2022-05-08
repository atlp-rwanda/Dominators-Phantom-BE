/* eslint-disable node/no-unpublished-import */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';

chai.should();
chai.use(chaiHttp);
describe('TESTING REGISTRATION OF USERS', () => {
  describe('POST /api/v1/users/register', () => {
    it('User login success', (done) => {
      chai
        .request(server)
        .post('/api/v1/users/login')
        .send({
          email: 'admin8@test.com',
          password: 'pass12345',
        })
        .end((error, response) => {
          chai.expect(response.statusCode).to.equal(200);
          chai.expect(response.body).to.have.property('token');
        });
      done();
    });

    it('User successfully registered', (done) => {
      chai
        .request(server)
        .post('/api/v1/users/register')
        .set('Authorization', `Bearer ${process.env.admintoken}`)
        .send({
          firstName: 'kalimba',
          lastName: 'kevin',
          email: 'umusaz3@gmail.com',
          role: 'driver',
        })
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(201);
        });
      done();
    });
  });

  // GET all Users test

  describe('GET /api/v1/users/', () => {
    it('Users retreived', (done) => {
      chai
        .request(server)
        .get('/api/v1/users/')
        .set('Authorization', `Bearer ${process.env.admintoken}`)
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(200);
        });
      done();
    });
  });
  // GET one user tset
  describe('GET /api/v1/users/:id', () => {
    it('User retreived', (done) => {
      chai
        .request(server)
        .get('/api/v1/users/2')
        .set('Authorization', `Bearer ${process.env.admintoken}`)
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(200);
        });
      done();
    });
  });

  describe('PUT /api/v1/users/1', () => {
    it('User successfully updated', (done) => {
      chai
        .request(server)
        .put('/api/v1/users/1')
        .set('Authorization', `Bearer ${process.env.admintoken}`)
        .send({
          firstName: 'KEVIN',
          lastName: 'KALIMBA',
          email: 'kevin.kalimba54@gmail.com',
          role: 'operator',
        })
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(200);
        });
      done();
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('User deleted', (done) => {
      chai
        .request(server)
        .delete('/api/v1/users/11')
        .set('Authorization', `Bearer ${process.env.admintoken}`)
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(200);
        });
      done();
    });
  });

  describe('Getting error messages', () => {
    it('email exists', (done) => {
      chai
        .request(server)
        .post('/api/v1/users/register')
        .set('Authorization', `Bearer ${process.env.admintoken}`)
        .send({
          firstName: 'umuhanga',
          lastName: 'kalimba',
          email: 'kevin.kalimba54@gmail.com',
          role: 'operator',
        })
        .end((error, response) => {
          chai.expect(response.statusCode).to.equal(400);
        });
      done();
    });
  });

  describe('Getting error messages', () => {
    it('enter credentials', (done) => {
      chai
        .request(server)
        .post('/api/v1/users/register')
        .set('Authorization', `Bearer ${process.env.admintoken}`)
        .send({
          firstName: '',
          lastName: '',
          email: '',
          role: '',
        })
        .end((error, response) => {
          chai.expect(response.statusCode).to.equal(500);
        });
      done();
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('User with Id does not exist', (done) => {
      chai
        .request(server)
        .get('/api/v1/users/100')
        .set('Authorization', `Bearer ${process.env.admintoken}`)
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(400);
        });
      done();
    });
  });

  describe('PUT /api/v1/users/20', () => {
    it('The user with id does not exist', (done) => {
      chai
        .request(server)
        .put('/api/v1/users/22')
        .set('Authorization', `Bearer ${process.env.admintoken}`)
        .send({
          firstName: 'kevin',
          lastName: 'kalimba',
          email: 'kevin.kalimba@gmail.com',
          role: 'operator',
        })
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(400);
        });
      done();
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('no user to be deleted', (done) => {
      chai
        .request(server)
        .delete('/api/v1/users/12')
        .set('Authorization', `Bearer ${process.env.admintoken}`)
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(404);
        });
      done();
    });
  });
});
