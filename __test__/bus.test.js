import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';

chai.should();
chai.use(chaiHttp);
describe('TESTING CRUD OPERATION FOR BUSES', () => {
  describe('POST /api/v1/buses', () => {
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

    it('Bus successfully created', (done) => {
      chai
        .request(server)
        .post('/api/v1/buses')
        .set('Authorization', `Bearer ${process.env.admintoken}`)
        .send({
          routeId: '123',
          prateNumber: 'RAD459123423',
          busType: 'KBS'
        })
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(201);
        });
      done();
    });
  });

  // GET all Users test

  describe('GET /api/v1/buses/', () => {
    it('Buses retreived', (done) => {
      chai
        .request(server)
        .get('/api/v1/buses/')
        .set('Authorization', `Bearer ${process.env.admintoken}`)
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(200);
        });
      done();
    });
  });
  // GET one user tset
  describe('GET /api/v1/buses/:id', () => {
    it('Bus retreived', (done) => {
      chai
        .request(server)
        .get('/api/v1/buses/2552485d-c7f7-48bf-8812-8e4640f108dc')
        .set('Authorization', `Bearer ${process.env.admintoken}`)
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(200);
        });
      done();
    });
  });

  describe('PUT /api/v1/buses/2552485d-c7f7-48bf-8812-8e4640f108dc', () => {
    it('Bus successfully updated', (done) => {
      chai
        .request(server)
        .patch('/api/v1/buses/2552485d-c7f7-48bf-8812-8e4640f108dc')
        .set('Authorization', `Bearer ${process.env.admintoken}`)
        .send({
            routeId: '63735',
            prateNumber: 'RAD459123',
            busType: 'KBS'
        })
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(200);
        });
      done();
    });
  });

  describe('DELETE /api/v1/buses/:id', () => {
    it('Bus deleted', (done) => {
      chai
        .request(server)
        .delete('/api/v1/buses/2552485d-c7f7-48bf-8812-8e4640f108dc')
        .set('Authorization', `Bearer ${process.env.admintoken}`)
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(200);
        });
      done();
    });
  });

});