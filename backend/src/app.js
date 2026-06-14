const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const user = require('./models/User.model')
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/taskpusle")
app.use(cors());
app.post('/register',(req,res)=>{
    user.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})