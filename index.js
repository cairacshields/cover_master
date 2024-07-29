const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const multer  = require('multer')
const upload = multer({ })
const http = require('http');

let port = process.env.PORT;

app.use(express.static(__dirname + 'public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/enhance', upload.any(), (req, res) => {
  try {
    const encoded = req.files[0].buffer.toString('base64');
    
    console.log(`🔥 We encoded the users album art!! ${encoded}`);
    res.status(200);
    res.send("Success from CoverMaster...");

  } catch (e) {
    console.error(e);
    res.status(400);
    res.send(`ERR from CoverMaster ${e}`);
  }

});


if (port == null || port == "") {
  port = 8000;
}
app.listen(port);