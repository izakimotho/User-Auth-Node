import express from 'express';
import mysql from 'mysql';
import config from './config/config.json';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import env from 'dotenv';
import fs from 'fs-extra';
import path from 'path';
import cors from 'cors';
import * as middleware from './middleware/middleware';

import {Dao} from './dao/Dao';
import {NoAuthRoutes} from './router/NoAuthRoutes';
import {AuthRoutes} from './router/AuthRoutes';
import {error_404, error_500} from './404/404';

// Load .env
env.config();
const app = express();

const PORT = process.env.PORT || 2020;
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(morgan('dev', ));
app.use(morgan('combined', {stream: accessLogStream}));
app.use(cors())

// app.options('*', cors()) // Enable pre-flight

const con = mysql.createConnection({
   host: process.env.DB_HOST,
   user: config.db_user,
   password: process.env.DB_PASS,
   database: config.db_name,
});

const dao = new Dao(con);
con.connect((err) => {
   if (err) {
      console.log('Error connecting: ', err.stack);
      return;
   }

   console.log('Connected as id: ', con.threadId);
});

let authRoutes = new AuthRoutes(dao);
let noAuthRoutes = new NoAuthRoutes(dao);
//noAuthRoutes.init(dao);

app.use(function(req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(`/${process.env.API_VER}`, noAuthRoutes.router);
// app.use('/auth', middleware.checkToken, authRoutes.router);
// app.use(`/${process.env.API_VER}/`, middleware.checkToken, authRoutes.router);
// app.use(`/${process.env.API_VER}`, authRoutes.router);
app.use(`/${process.env.API_VER}`, middleware.checkToken, authRoutes.router);

app.use(error_404);
app.use(error_500);

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});

