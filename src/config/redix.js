import { createClient } from 'redis';
import {config} from 'dotenv'
config()


export const redisClient = createClient();       
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client connected'));
(async () =>{
  await redisClient.connect();
})()

export const setToken = async(key, value) => await redisClient.set(key, value);
export const deleteToken = async(key) => await(redisClient.del(key));

export default redisClient

