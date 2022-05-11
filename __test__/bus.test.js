import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';
chai.use(chaiHttp);

const token = `Bearer ${process.env.ADMIN_TOKEN}`;
const REQ_URL = '/api/v1/buses/';
let ROUTE_ID;
let EXISTING_BUS;


describe('TESTING BUSES API', () => {

    it('should create bus', (done) => {
        const data = {
            origin: 'Kagugu',
            destination: 'Kamonyi',
            code: (Math.random() * 10000).toString(),
            distance: (Math.random() * 10).toString(),
            latitude: 8.99,
            longitude: 98.99
        }
        chai.request(server)
            .post(REQ_URL)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send(data)
            .then((res) => {
                chai.expect(res).to.have.status(200);

                done();
            }).catch((err) => done(err));
    });

    it('should fetch all buses', (done) => {
        chai
            .request(server)
            .get(REQ_URL)
            .set('Authorization', token)
            .then((res) => {
                chai.expect(res.status).to.equal(200);
                const ROUTE = res.body.stack[0];
                ROUTE_ID = ROUTE.routeSlug;
                EXISTING_ROUTE = {
                    origin: ROUTE.origin,
                    destination: ROUTE.destination,
                    distance: ROUTE.distance,
                    code: ROUTE.code
                }
                done();
            }).catch((err) => done(err))
    });

    it('Bad request, bus already exist', (done) => {
        chai.request(server)
            .post(REQ_URL)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send(EXISTING_ROUTE)
            .then((res) => {
                chai.expect(res).to.have.status(400);

                done();
            }).catch((err) => done(err));
    });

    it('Bad request, missing params', (done) => {
        const data = {
            origin: 'Kamonyi',
            destination: 'Kinyinya'
        }
        chai.request(server)
            .post(REQ_URL)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send(data)
            .then((res) => {
                chai.expect(res).have.status(400);
                done();
            }).catch((err) => done(err));
    });

    it('should fetch individual bus', (done) => {
        chai.request(server)
            .get(`${REQ_URL}/${ROUTE_ID}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .then((res) => {
                chai.expect(res.status).to.equal(200);
                done();
            }).catch((err) => done(err));
    });

    it('Bad request, invalid bus Id', (done) => {
        chai.request(server)
            .get(`${REQ_URL}/InvalidId`)
            .set('Authorization', token)
            .then((res) => {
                chai.expect(res.status).to.equal(404);
                done();
            }).catch((err) => done(err));
    });

    it('should update bus', (done) => {
        const data = {
            distance: (Math.random() * 100).toString()
        }
        chai.request(server)
            .put(`${REQ_URL}/${ROUTE_ID}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send(data)
            .then((res) => {
                chai.expect(res.status).to.equal(200);
                done();
            }).catch((err) => done(err));
    });

    it('should not update bus with invalid ID', (done) => {
        const data = {
            status: "active"
        }
        chai.request(server)
            .put(`${REQ_URL}/InvalidId`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send(data)
            .then((res) => {
                chai.expect(res.status).to.equal(400);
                done();
            }).catch((err) => done(err));
    });

    it('should delete bus', (done) => {
        chai.request(server)
            .delete(`${REQ_URL}/${BUS_ID}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .then((res) => {
                chai.expect(res.status).to.equal(200);
                done();
            }).catch((err) => done(err));
    });

    it('should not delete bus with invalid id', (done) => {
        chai.request(server)
            .delete(`${REQ_URL}/InvalidId`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .then((res) => {
                chai.expect(res.status).to.equal(400);
                done();
            }).catch((err) => done(err));
    });

    it('should delete all buses', (done) => {
        chai.request(server)
            .delete(REQ_URL)
            .set('Authorization', token)
            .then((res) => {
                chai.expect(res.status).to.equal(200);
                done();
            }).catch((err) => done(err));
    });

});

