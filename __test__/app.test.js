import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

chai.use(chaiHttp);
describe('Root testing: welcome', () => {
  it('it should repond message welcome', (done) => {
    chai
      .request(app)
      .get('/api/v1')
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(res.body).to.have.property('message');
      });
    done();
  });
});
