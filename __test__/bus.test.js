import model from '../src/database/models'
import Op from 'sequelize';
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../src/server'
const token = `Bearer ${process.env.ADMIN_TOKEN}`;

let should = chai.should();
const REQ_URL = '/api/v1/buses';
const Buses = model.Bus;
chai.use(chaiHttp);

describe('BUS (CRUD OPERATION) API TESTS',() => {

  describe('/POST bus', () => {
    it('it should create an bus', (done) => {
        let data = {
            prateNumber: "RAM123",
            routeId: "23456761234",
            busType: "volcano",
            createdAt: new Date().toISOString() 
          }
        chai.request(server)
            .post(REQ_URL)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send(data)
            .then((res) => {
                chai.expect(res).to.have.status(400);

                done();
            }).catch((err) => done(err));
    });
  });

  describe('/GET buses', () => {
    it('Unathorised user should not GET all the buses', (done) => {
      chai.request(server)
        .get('/api/v1/buses')
        .end((err, res) => {
            // console.log("---buses",res.error)
            chai.expect(res.statusCode).to.equal(401);
            // chai.expect(response.body).to.have.property('token');
          done();
        });
    });
  });


});
