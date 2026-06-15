const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User.model')
const app = express();
const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env"),
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected"))
    .catch(err => console.error(err));

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    try {
        // console.log(req.body);
        const newUser = await User.create(req.body);
        // console.log("saved:", newUser);

        res.json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
app.post("/login", async (req, res) => {
    try { const { email, password } = req.body; 
    const user = await User.findOne({ email }); 
    if (!user) {
         return res.json("No such user found"); 
    } if (user.password === password) { 
        return res.json("Success"); 

    } else { return res.json("Incorrect Password"); } } 
    catch (err) { console.log(err);
         res.json("Something went wrong"); }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})