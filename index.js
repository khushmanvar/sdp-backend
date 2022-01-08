var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000
const { conductLogin } = require("./handlers/conductor")
const {search} = require("./handlers/searchBus")
const {signup} = require("./handlers/signup");
const {signin} = require("./handlers/signin");
const {userDetails} = require("./handlers/userDetails");

// express middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// admin routes
app.post('/admin/login', conductLogin);

// user routes
app.get('/search', search);
app.get('/user', userDetails);
app.post('/signup', signup);
app.post('/signin', signin);

app.get('/', (req, res) => {
  res.send('Welcome to the Easybus!')
})

app.listen(PORT, function () {
  console.log(`Easybus server is listening on port: ${PORT}!`); });