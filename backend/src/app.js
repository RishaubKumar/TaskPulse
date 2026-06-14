const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User.model')
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/taskpulse")
app.use(express.json());
app.use(cors());
app.post('/login', (req,res)=>{
    const{email, password} = req.body;
    User.findOne({email:email})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.json("Success");
            }else{
                res.json("The password is incorrect.")
            }
        }else{
            res.json("No such user found");
        }
    })
})
app.post('/register', async (req, res) => {
    try {
        console.log(req.body);

        const newUser = await User.create(req.body);

        console.log("Saved:", newUser);

        res.json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})