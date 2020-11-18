const express = require('express');

const apiRouter = require('./routes')

const fs = require('fs')

const https = require('https');
const { fstat } = require('fs');

const app = express();

app.use(express.json());



app.use('/', apiRouter)

// https.createServer({
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert')
// }, app)

.listen(process.env.PORT || '5000', () => {
    console.log(`Example app listening at port: ${process.env.PORT || '5000'}`);
  });