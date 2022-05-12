import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';
chai.use(chaiHttp);

const token = `Bearer ${process.env.ADMIN_TOKEN}`;
const REQ_URL = '/api/v1/routes/';
let ROUTE_ID;
let EXISTING_ROUTE;


describe('TESTING ROUTES END POINTS', () => {

    it('MUST CREATE ROUTE', async function() {
        const data = {
            origin: 'Kagugu',
            destination: 'Kamonyi',
            code: (Math.random() * 10000).toString(),
            distance: (Math.random() * 10).toString()
        }
        chai.request(server)
            .post(REQ_URL)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send(data)
            .then((res) => {
                chai.expect(res).to.have.status(200);

            }).catch((err) => done(err));
    });

    it('MUST FETCH ROUTES', async function() {
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
            }).catch((err) => done(err))
    });

    it('BAD REQUEST, ROUTE ALREADY EXISTS', async function() {
        chai.request(server)
            .post(REQ_URL)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send(EXISTING_ROUTE)
            .then((res) => {
                chai.expect(res).to.have.status(400);

            }).catch((err) => done(err));
    });

    it('BAD REQUEST, MISSING PARAMS', async function() {
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
               
            }).catch((err) => done(err));
    });

    it('MUST FETCH SINGLE ROUTE', async function() {
        chai.request(server)
            .get(`${REQ_URL}/${ROUTE_ID}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .then((res) => {
                chai.expect(res.status).to.equal(200);
                
            }).catch((err) => done(err));
    });

    it('BAD REQUEST, INVALID ROUTE ID', async function() {
        chai.request(server)
            .get(`${REQ_URL}/InvalidId`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .then((res) => {
                chai.expect(res.status).to.equal(404);
              
            }).catch((err) => done(err));
    });

    it('MUST UPDATE ROUTE', async function() {
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
                
            }).catch((err) => done(err));
    });

    it('MUST NOT UPDATE, INVALID ID', async function() {
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
                
            }).catch((err) => done(err));
    });

    it('MUST DELETE ROUTE', async function() {
        chai.request(server)
            .delete(`${REQ_URL}/${ROUTE_ID}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .then((res) => {
                chai.expect(res.status).to.equal(200);
               
            }).catch((err) => done(err));
    });

    it('MUST NOT DELETE ROUTE, INVALID ID', async function() {
        chai.request(server)
            .delete(`${REQ_URL}/InvalidId`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .then((res) => {
                chai.expect(res.status).to.equal(400);
                
            }).catch((err) => done(err));
    });

    it('MUST DELETE ALL ROUTE', async function() {
        chai.request(server)
            .delete(REQ_URL)
            .set('Authorization', token)
            .then((res) => {
                chai.expect(res.status).to.equal(200);
               
            }).catch((err) => done(err));
    });

});
