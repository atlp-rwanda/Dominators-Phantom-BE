import test from './index';
const { server, chai } = test;
const token = `Bearer ${process.env.ADMIN_TOKEN}`;
var OperatorToken;

describe.only('asssign User with Operator', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/users/login')
      .send({
        email: 'operator@test.com',
        password: 'pass12345',
      })
      .end((error, response) => {
        OperatorToken = response.body.token;
      });
    done();
  });
  it('Assign Driver to Buse Get with status code 200 ', (done) => {
    chai
      .request(server)
      .get('/api/v1/assign')
      .set('Authorization', `Bearer ${OperatorToken}`)
      .then((err, res) => {
        chai.expect(res).to.have.status(200);
        done();
      });
    done();
  });
  it('Get One Driver Assigned to Buse with status code 404', (done) => {
    chai
      .request(server)
      .get('/api/v1/assign/a896d871-3bc3-4e38-811f-9505dd03ed4e')
      .set('authorization', `Bearer ${OperatorToken}`)
      .then((res) => {
        chai.expect(res).to.have.status(404);
        done();
      })
      .catch((err) => {
        done(err);
      });
    done();
  });
  it("Assign Get All user who Haven't assigned to any bus ", (done) => {
    chai
      .request(server)
      .get('/api/v1/unassigned')
      .set('authorization', `Bearer ${OperatorToken}`)
      .then((res) => {
        chai.expect(res).to.have.status(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
    done();
  });
  it('Assign Drivers to Buse using post and error with error 400 missing fields ', (done) => {
    const data = {
      userId: '',
      buseId: '',
    };
    chai
      .request(server)
      .post('/api/v1/assign/bus/""/driver/""')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${OperatorToken}`)
      .then((res) => {
        chai.expect(res).to.have.status(400);
      });
    done();
  });
  it('Assign Drivers to Buse using post and error with status code  201', (done) => {
    const data = {
      userId: 8,
      buseId: 'a896d871-3bc3-4e38-811f-9505dd03ed4e',
    };
    chai
      .request(server)
      .post('/api/v1/assign')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${OperatorToken}`)
      .send(data)
      .then((res) => {
        chai.expect(res).to.have.status(201);
        chai.expect(res).to.property('Message');
      });
    done();
  });
  it('Get One Driver Assigned to Buse with status code 500', (done) => {
    chai
      .request(server)
      .get('/api/v1/assign/a')
      .set('Authorization', `Bearer ${OperatorToken}`)
      .then((res) => {
        chai.expect(res).to.have.status(500);
      })
      .catch((err) => {
        done(err);
      });
    done();
  });
  it('Update Assigned driver to Buse with status code 201', (done) => {
    const data = {
      userId: 8,
      buseId: 'a896d871-3bc3-4e38-811f-9505dd03ed4e',
      updateAt: new Date().toISOString(),
    };
    chai
      .request(server)
      .patch('/api/v1/assign/d4764540-2477-4bf5-ab5c-6bc677f94e27')
      .set('Authorization', `Bearer ${OperatorToken}`)
      .send(data)
      .then((res) => {
        chai.expect(res).to.status(201);
      })
      .catch((err) => {
        done(err);
      });
    done();
  });
  it('Update Assigned drive to Buse with status code  401', (done) => {
    const data = {
      userId: 8,
      buseId: 'a896d871-3bc3-4e38-811f-9505dd03ed4e',
      updateAt: new Date().toISOString(),
    };
    chai
      .request(server)
      .patch('/api/v1/assign/d')
      .set('Acuthorization', token)
      .send(data)
      .then((res) => {
        chai.expect(res).to.status(500);
      });
    done();
  });
});
