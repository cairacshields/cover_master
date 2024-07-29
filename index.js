const express = require('express');
const app = express();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const http = require('http');

let port = process.env.PORT;

app.use(express.static(__dirname + 'public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/enhance', upload.single('example'), (req, res) => {
  const encoded = req.file.buffer.toString('base64')
  console.log(`🔥 We encoded the users album art!! ${encoded}`)
});


if (port == null || port == "") {
  port = 8000;
}
app.listen(port);