const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");
const { urlToHttpOptions } = require("url");
const { post } = require("request");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/lists/bf904264e6";

  const options = {
    method: "POST",
    auth: "ishan1:452a28ce2f95e885f304c3446ceae422-us8",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
      var statusCode = response.statusCode;

      if (statusCode == 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/faliure.html");
      }
    });
  });
  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server is running on port " + port);
});

// API Key
// 452a28ce2f95e885f304c3446ceae422-us8

// Unique Audience/List ID
// bf904264e6
// Web Link
// https://pacific-refuge-67361.herokuapp.com/
