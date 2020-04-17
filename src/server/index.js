const dotenv = require("dotenv");
dotenv.config();
var path = require("path");
const express = require("express");
const aylien = require("aylien_textapi");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static(path.join("dist")));

const textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(process.env.PORT || 4000, function() {
  console.log(
    `Example app listening on port ${
      process.env.PORT ? process.env.PORT : 4000
    }!`
  );
});

app.post("/nlp", function(req, res) {
  let result = "";
  req.on("data", function(chunk) {
    result += chunk;
  });
  req.on("end", function() {
    console.log("done with data");
    req.jsonBody = JSON.parse(result);
    let { type, text } = req.jsonBody;
    let data = {};
    type = type.toLowerCase();
    if (type !== "url" && type !== "text") type = "text";
    data[type.toLowerCase()] = text;
    textapi.classify(data, (error, response) => {
      if (error) {
        console.log({ error });
        return res
          .status(503)
          .send({ error: error.message || "An Error Occured" });
      }
      console.log({ response });
      return res.status(200).send({ response });
    });
  });
});
