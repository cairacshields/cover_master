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
const request = require('request');



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
    let formData = new FormData();
    formData.append('image', encoded);

    (async () => {
      const response = await axios({
        method: 'POST',
        url: 'https://app.imggen.ai/v1/upscale-image',
        headers: {
          'X-IMGGEN-KEY': '4d229bd9-8691-4a8a-a279-fb61e8284d82',
          'Content-Type': 'application/json'
        },
        data: {
          "image": req.files[0]
        }
      });
      console.log(`🪻 Response Recieved --> ${response}`);
      // if (response.data["ok"] == true) {
      //   console.log(`🌶️ Phosus autofix complete successfully.... ${response.data} \n`);
      //   if (response.data["result"]) {
      //     console.log(`✨ Phosus result is ${response.data["result"]} \n`);
      //     if (response.data["result"]["output"]) {
      //       console.log(`Phosus output base64 result is ${response.data["result"]["output"]}`);
      //       res.status(200);
      //       res.send(response.data["result"]["output"]);
      //     }
      //   }
      // }
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