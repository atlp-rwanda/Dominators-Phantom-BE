import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';

const token = `Bearer ${process.env.ADMIN_TOKEN}`;
console.log(token)

chai.use(chaiHttp);
describe("DISPLAYING ROUTES!", () => {
    
    it('IT GETS ALL ROUTES', async () => {
        chai
        .request(app)
        .get('/api/v1/routelist/')
        .set('Accept', 'application/json')
        .end((err, response) => {
            chai.expect(response.statusCode).to.equal(200);
        });
        
    });

    it('IT GETS ONE ROUTE', async () => {
      chai
        .request(app)
        .get('/api/v1/routelist/748784cc-48ec-4e08-8e35-61e460bc7e0b')
        .set('Accept', 'application/json')
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(200);
        });
      
    });

    it('IT GETS SINGLE ROUTE', async () => {
      chai.request(app)
          .get(`/api/v1/routelist/748784cc-48ec-4e08-8e35-61e460bc7e0b`)
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .then((res) => {
              chai.expect(res.status).to.equal(200);
              
          }).catch((err) => (err));
  });

  it('INVALID ROUTE ID', async () => {
    chai.request(app)
        .get(`/api/v1/routelist/InvalidId`)
        .set('Authorization', token)
        .then((res) => {
            chai.expect(res.status).to.equal(404);
            
        }).catch((err) => done(err));
});
});