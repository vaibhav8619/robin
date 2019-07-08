var express = require("express");
var app = express();
const mongoose = require('mongoose');
var User = require('./usermodel');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/uuserdb', { useNewUrlParser: true });


app.post('/insertuser', (req, res) => {

    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
})

app.get('/getuserlist', (req, res) => {

    User.find({}).then(function (users) {
        res.send(users);
        const username = users.username;
        const password = users.password;
    });
})

app.listen(3000, () => {
    console.log("Server is running ")
})