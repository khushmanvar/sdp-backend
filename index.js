var express = require('express');
var app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000
const { conductLogin, getConductorDetails, getBusDetails } = require("./handlers/conductor")
const {search} = require("./handlers/searchBus")
const {signup} = require("./handlers/signup");
const {signin} = require("./handlers/signin");
const {userDetails} = require("./handlers/userDetails");
const { liveBook } = require('./handlers/liveBook');

// express middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// admin routes
app.get('/admin/:cid', getConductorDetails);
app.get('/admin/:cid/buses',getBusDetails);
app.post('/admin/login', conductLogin);

// user routes
app.get('/search', search);
app.get('/user', userDetails);
app.post('/signup', signup);
app.post('/signin', signin);
app.post('/livebook', liveBook);

app.get('/p/:pid', function(req, res) {
  res.send("query param is: " + req.param("pid"));
})

app.get('/', (req, res) => {
  res.send('Welcome to the Easybus!')
})

app.listen(PORT, function () {
  console.log(`Easybus server is listening on port: ${PORT}!`); });