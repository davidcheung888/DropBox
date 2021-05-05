const express = require("express");
const expressFileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
const port = 8080;
let fs = require("fs");
let http = require("http");
const app = express();

let cache = {};

const uploadDirectory = __dirname + "/uploaded";
// css, html, images

app.use(express.static(path.join(__dirname, "public")));
app.use(expressFileUpload());

function readFile(file) {
  // return the contents of that file
  return new Promise((resolve, reject) => {
    fs.readFile(uploadDirectory + path.sep + file, (err, data) => {
      if (err) {
        console.log("Error", err);
        reject(err);
      } else {
        console.log("Data", data);
        resolve(data);
      }
    });
  });
}

function writeFile(name, data) {
  // write the contents of that file into our uploaded directory
  return new Promise((resolve, reject) => {
    fs.writeFile(uploadDirectory + path.sep + name, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

app.get("/uploaded/:name", (request, response) => {
  let name = request.params.name;
  readFile(name).then((data) => {
    response.send(data);
  });
  // readFile(name) -> return that file;
  // grab that file and then return it (the image itself, or an ability to download that image)
});
app.get("/", (req, res) => {
  res.status(200).sendFile("index.html");
});

//
app.get("/planner", (req, res) => {
  res.status(200).sendFile(__dirname + path.sep + "public/planner.html");
});

app.post("/files", (request, response) => {
  console.log("Object:", request.files.upload);
  let name = request.files.upload.name;
  let data = request.files.upload.data;
  console.log("Name: ", name);
  console.log("Data: ", data);
  writeFile(name, data).then(() => {
    response.send("done");
  });
  // trying to create a function that, given name and data, would save that data into my directory uplooaded
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
