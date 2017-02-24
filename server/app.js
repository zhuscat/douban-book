import Koa from 'koa';
import mongoose from 'mongoose';
import config from './config';

const dbConfig = config.db;

mongoose.connect(`${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`);

const app = new Koa();

export default app;
