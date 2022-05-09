import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import props from '../src/config/config';


const { expect } = chai;
chai.use(chaiHttp);
describe("DISPLAYING ROUTES!", () => {
 it("it should show list of routes.", (done) => {
chai
 .request(app)
.get("/api/v1/routelist")
.end((err, res) => {
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('array');
    expect(res.body).to.have.lengthOf(1);
 done();
});
});

});