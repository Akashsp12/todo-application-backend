const express = require('express')
const app = express()
require('dotenv').config()

const mongoose = require('./config/mongodb')
var cors = require('cors')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const userRoute = require('./midddleWare/userRoute')
const taskRoute = require('./midddleWare/taskRoute')

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204, 
  };
  
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));


app.use('/arthiyak-v1', userRoute)
app.use('/arthiyak-v1', taskRoute)


app.listen(process.env.PORT, () => {
    console.log(`app is running ${process.env.PORT}`)
})