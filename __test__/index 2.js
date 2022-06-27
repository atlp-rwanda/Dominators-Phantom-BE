import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';
import dotenv from 'dotenv';
dotenv.config();
chai.use(chaiHttp);
chai.should();
export default { chai, server, dotenv };
