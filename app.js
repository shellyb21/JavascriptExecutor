const express = require('express');
const app = express();
let ejs = require('ejs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const postsRoute = require('./routes/post');
const transformationRoute = require('./routes/tranformationRoutes');
const trasformData = require('./routes/transformedData');
require('dotenv/config');
app.use(express.json());
app.set('view engine', 'ejs');
//Middlewares
app.use('/userdata', postsRoute);
app.use('/transformrules',transformationRoute);
app.use('/transformdata', trasformData);
app.get('/',(req,res)=>{
res.render('app');
});

//connect to db
mongoose.connect("mongodb+srv://testuser:test@cluster0.bixbs.mongodb.net/employee?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true }, ()=>console.log('connected to db') );

// listen to server
app.listen(process.env.PORT || 3000);

