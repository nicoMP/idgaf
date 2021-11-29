const express = require('express');
const path = require('path');
const app = express();
const apiRouter = require('./index.js');
app.use(express.json());
app.use(express.static(path.join(__dirname, '../static')));
app.use('/', apiRouter);
app.listen(80, ()=>{
    console.log('listening at port 80');
});//server express app