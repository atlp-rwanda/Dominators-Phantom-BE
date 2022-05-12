import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import props from '../src/config/config';

chai.use(chaiHttp);
describe("DISPLAYING ROUTES!", () => {
    
    it('IT GETS ALL ROUTES', (done) => {
        chai
        .request(app)
        .get('/api/v1/routelist/')
        // .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
        .end((err, response) => {
            chai.expect(response.statusCode).to.equal(200);
        });
        done();
    });
});

describe('GET ONE ROUTE', () => {
    it('IT GETS ONE ROUTE', (done) => {
      chai
        .request(app)
        .get('/api/v1/routelist/748784cc-48ec-4e08-8e35-61e460bc7e0b')
        // .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(200);
        });
      done();
    });
  });