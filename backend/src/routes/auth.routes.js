const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const userAuth = require('./controllers/auth.controller');
const app = express();

app.get('/login',userAuth.login );
app.post('/signUp',userAuth.signUp );