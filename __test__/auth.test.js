import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';

chai.use(chaiHttp);

describe('TESTING USER AUTHENTICATION', () => {
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

  // it('User login fail(message:Incorrect email or password)', (done) => {
  //   chai
  //     .request(server)
  //     .post('/api/v1/users/login')
  //     .send({
  //       email: 'admin@mail.com',
  //       password: 'mybrandapi',
  //     })
  //     .end((error, response) => {
  //       chai.expect(response.statusCode).to.equal(401);
  //       chai.expect(response.body).to.have.property('error');
  //       chai
  //         .expect(response.body.message)
  //         .to.equal('Incorrect email or password');
  //     });
  //   done();
  // });

  // it('User login fail(message:Please provide email and password!)', (done) => {
  //   chai
  //     .request(server)
  //     .post('/api/v1/users/login')
  //     .send({
  //       email: '',
  //       password: '',
  //     })
  //     .end((error, response) => {
  //       chai.expect(response.statusCode).to.equal(400);
  //       chai.expect(response.body).to.have.property('error');
  //       chai
  //         .expect(response.body.message)
  //         .to.equal('Please provide email and password!');
  //     });
  //   done();
  // });
});
