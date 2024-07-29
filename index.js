const express = require('express');
const app = express();
const http = require('http');

let port = process.env.PORT;

app.use(express.static(__dirname + 'public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/resize', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


if (port == null || port == "") {
  port = 8000;
}
app.listen(port);