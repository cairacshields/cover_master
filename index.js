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
import picsartfordevelopers from '@api/picsartfordevelopers';


var ImageKit = require("imagekit");

var imagekit = new ImageKit(
  {
    publicKey:"public_CeXqnuFk23VHkwNzR4wKDCsiDqM=",
    privateKey: "private_2wXXd7p0CM******************",
    urlEndpoint:"https://ik.imagekit.io/mzeusi9wb"
  }
);

let port = process.env.PORT;


app.use(express.static(__dirname + 'public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/enhance', upload.any(), (req, res) => {
  try {
    const encoded = req.files[0].buffer.toString('base64');

    picsartfordevelopers.auth('eyJraWQiOiI5NzIxYmUzNi1iMjcwLTQ5ZDUtOTc1Ni05ZDU5N2M4NmIwNTEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhdXRoLXNlcnZpY2UtYmE0ZGM2NWMtNGFhZC00ZTMxLTg3YmEtZTQ0NDNkNjQ0OWVlIiwiYXVkIjoiNDYwMTUzNDkyMDAyMTAxIiwibmJmIjoxNzIyNDU3NTMwLCJzY29wZSI6WyJiMmItYXBpLmdlbl9haSIsImIyYi1hcGkuaW1hZ2VfYXBpIl0sImlzcyI6Imh0dHBzOi8vYXBpLnBpY3NhcnQuY29tL3Rva2VuLXNlcnZpY2UiLCJvd25lcklkIjoiNDYwMTUzNDkyMDAyMTAxIiwiaWF0IjoxNzIyNDU3NTMwLCJqdGkiOiJiZmY1ZWRhNi04OTI4LTRlYzktYmRmZC0yNzc4YzhhZjVmZWYifQ.HoLGtuO6hkwlYKjT0aLLPzGo-1OwDjmyAjuQQMZbL0pzCIqyZN-ujKuWGcVbWS2Chz2MymHmPpahbBPJYaWByRwCYI2juw3aqXj8AMkpX-uAve4dacXdYE9jVou1WjZStTm4-0BHajT4WcskBrzxKm_MauxoAf-iFtupxvMo8gETzkFET5HfdqlA8uxLrp6xSLl80gotKdvfPyAb5h3DZZioJJx6eFifFMQVZtDTVasO3gKEqx8X0rRGGFgAMw9-2N9p6vnqMD6s57FpDdW78Baox25ngD3-3PMQMJsvMY4cnxNeo29s2J0BJDoXzy7hh7Yyni3gmfwwSWAtTdwelg');
    picsartfordevelopers.postUpscaleEnhance({upscale_factor: '2', format: 'JPG'})
      .then(({ data }) => console.log(data))
      .catch(err => console.error(err));

    // (async () => {
    //   const response = await axios({
    //     method: 'POST',
    //     url: 'https://api.phosus.com/autofix/v1',
    //     headers: {
    //       'authorizationToken': jwtToken,
    //       'Content-Type': 'application/json'
    //     },
    //     data: JSON.stringify({
    //       image_b64: encoded
    //     })
    //   });
    //   //console.log(res.data); // {'ok': ..., 'result': ..., 'error': ...}
    //   if (response.data["ok"] == true) {
    //     console.log(`🌶️ Phosus autofix complete successfully.... ${response.data} \n`);
    //     if (response.data["result"]) {
    //       console.log(`✨ Phosus result is ${response.data["result"]} \n`);
    //       if (response.data["result"]["output"]) {
    //         console.log(`Phosus output base64 result is ${response.data["result"]["output"]}`);
    //         res.status(200);
    //         res.send(response.data["result"]["output"]);
    //       }
    //     }
    //   }
    // })();
    

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