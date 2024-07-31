const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const multer  = require('multer')
const upload = multer({ })
const http = require('http');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const FormData = require('form-data');


var ImageKit = require("imagekit");

var imagekit = new ImageKit(
  {
    publicKey:"public_CeXqnuFk23VHkwNzR4wKDCsiDqM=",
    privateKey: "private_2wXXd7p0CM******************",
    urlEndpoint:"https://ik.imagekit.io/mzeusi9wb"
  }
);

let port = process.env.PORT;

/*
  Region - PHOSUS
*/
// replace with your API key here
const apiKey = '14320c068537b6b9e94f9076ecdb61ca';
// replace with your key ID here
const ackeyId = 690;

// create JWT with payload
const jwtToken = jwt.sign(
  {
    account_key_id: ackeyId,
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiry
    iat: Math.floor(Date.now() / 1000)
  },
  apiKey,
  { algorithm: 'HS256' }
);

// end region

app.use(express.static(__dirname + 'public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/enhance', upload.any(), (req, res) => {
  try {
    const encoded = req.files[0].buffer.toString('base64');

    (async () => {
      const response = await axios({
        method: 'POST',
        url: 'https://api.phosus.com/autofix/v1',
        headers: {
          'authorizationToken': jwtToken,
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          image_b64: encoded
        })
      });
      //console.log(res.data); // {'ok': ..., 'result': ..., 'error': ...}
      if (response.data["ok"] == true) {
        console.log(`🌶️ Phosus autofix complete successfully! ${response.data} \n`);
        if (response.data["result"]) {
          console.log(`✨ Phosus result is ${response.data["result"]} \n`);
          if (response.data["result"]["output"]) {
            console.log(`Phosus output base64 result is ${response.data["result"]["output"]}`);
            res.status(200);
            res.send(response.data["result"]["output"]);
          }
        }
      }
    })();
    

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