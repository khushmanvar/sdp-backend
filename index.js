var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000
const { login } = require("./handlers/user")

// express middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// admin routes
app.post('/admin  /login', login);

app.get('/', (req, res) => {
  res.send('Welcome to the Easybus!')
})

app.listen(PORT, function () {
  console.log(`Easybus server is listening on port: ${PORT}!`); });