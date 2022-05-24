import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';

chai.should();
chai.use(chaiHttp);
describe('TESTING UPDATE PROFILE OF USERS', () => {
  describe('POST /api/v1/profile/update', () => {
    it('profile successfully created', (done) => {
      chai
        .request(server)
        .post('/api/v1/profile/update/1')
        .send({
          firstname: 'Kevin',
          lastname: 'Kalimba',
          phone: '0790020325',
          email: 'kevin.kalimba54@gmail.com',
          role: 'driver',
          province: 'Kigali',
          district: 'Kicukiro',
          sector: 'Mareba',
          cell: 'Kagomasi',
          profilePic:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fuser%2Bprofile&psig=AOvVaw1rS4UezJmHZM-GnwhBoT-t&ust=1652112296179000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNiegIik0PcCFQAAAAAdAAAAABAD',
          village: 'Kagarama',
          bio: 'MY BIOGRAPHY',
          category: 'B',
          gender: 'male',
          nationalId: '67836468736757878999999999',
        })
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(201);
        });
      done();
    });
  });

  describe('DELETE /api/v1/profile/:id', () => {
    it('User deleted', (done) => {
      chai
        .request(server)
        .delete('/api/v1/profile/8')
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(200);
        });
      done();
    });
  });



  describe('DELETE /api/v1/profile/:id', () => {
    it('User deleted', (done) => {
      chai
        .request(server)
        .delete('/api/v1/profile/10')
        .end((err, response) => {
       
          chai.expect(response.statusCode).to.equal(200);
           });
      done();
    });
  })
  
  describe('GET /api/v1/profile/', () => {
    it('Users retreived', (done) => {
      chai
        .request(server)
        .get('/api/v1/profile/')
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(200);
        });
      done();
    });
  });
  describe('GET /api/v1/profile/:id', () => {
    it('User retreived', (done) => {
      chai
        .request(server)
        .get('/api/v1/profile/1')
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(200);
        });
      done();
    });
  });

  describe('DELETE /api/v1/profile/:id', () => {
    it('no user to deleted', (done) => {
      chai
        .request(server)
        .delete('/api/v1/profile/12')
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(404);
        });
      done();
    });
  });

  describe('PUT /api/v1/profile/4', () => {
    it('The user with id does not exist', (done) => {
      chai
        .request(server)
        .put('/api/v1/profile/4')
        .send({
          firstname: 'Kevin',
          lastname: 'Kalimba',
          phone: '0790020325',
          email: 'kevin.kalimba54@gmail.com',
          role: 'driver',
          province: 'Kigali',
          district: 'Kicukiro',
          sector: 'Mareba',
          cell: 'Kagomasi',
          profilePic:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fuser%2Bprofile&psig=AOvVaw1rS4UezJmHZM-GnwhBoT-t&ust=1652112296179000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNiegIik0PcCFQAAAAAdAAAAABAD',
          village: 'Kagarama',
          bio: 'MY BIOGRAPHY',
          category: 'B',
          gender: 'male',
          nationalId: '67836468736757878999999999',
        })
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(404);
        });
      done();
    });
  });

  describe('GET /api/v1/profile/:id', () => {
    it('User with Id does not exist', (done) => {
      chai
        .request(server)
        .get('/api/v1/profile/100')
        .end((err, response) => {
          chai.expect(response.statusCode).to.equal(400);
        });
      done();
    });
  });

  describe('Getting error messages', () => {
    it('email exists', (done) => {
      chai
        .request(server)
        .post('/api/v1/profile/update/1')
        .send({
          firstname: '',
          lastname: '',
          phone: '',
          email: '',
          role: '',
          province: '',
          district: '',
          sector: '',
          cell: '',
          profilePic: '',
          village: '',
          bio: '',
          category: '',
          gender: '',
          nationalId: '',
        })
        .end((error, response) => {
          chai.expect(response.statusCode).to.equal(500);
        });
      done();
    });
  });

  describe('Getting error messages', () => {
    it('email exists', (done) => {
      chai
        .request(server)
        .post('/api/v1/profile/update/1')
        .send({
          firstname: 'Kevin',
          lastname: 'Kalimba',
          phone: '0790020325',
          email: 'kevin.kalimba54@gmail.com',
          role: 'driver',
          province: 'Kigali',
          district: 'Kicukiro',
          sector: 'Mareba',
          cell: 'Kagomasi',
          profilePic:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fuser%2Bprofile&psig=AOvVaw1rS4UezJmHZM-GnwhBoT-t&ust=1652112296179000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNiegIik0PcCFQAAAAAdAAAAABAD',
          village: 'Kagarama',
          bio: 'MY BIOGRAPHY',
          category: 'B',
          gender: 'male',
          nationalId: '67836468736757878999999999',
        })
        .end((error, response) => {
          chai.expect(response.statusCode).to.equal(400);
        });
      done();
    });
  });
});
