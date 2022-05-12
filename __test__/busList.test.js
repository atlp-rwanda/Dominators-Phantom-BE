import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import props from '../src/config/config';

chai.use(chaiHttp);
describe("DISPLAYING BUSES!", () => {
    
    it('IT GETS ALL BUSES', (done) => {
        chai
        .request(app)
        .get('/api/v1/buslist/')
        // .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
        .end((err, response) => {
            chai.expect(response.statusCode).to.equal(200);
        });
        done();
    });
});

describe('GET ONE BUS', () => {
    it('IT GETS ONE BUS', (done) => {
      chai
        .request(app)
        .get('/api/v1/buslist/748784cc-48ec-4e08-8e35-61e460bc7e0b')
        // .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(404);
        });
      done();
    });
  });