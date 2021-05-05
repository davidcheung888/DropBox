//Require Modules
const fs = require("fs");
const express = require("express");
const fileUpload = require("express-fileUpload");
const port = 3000;

//Setup Modules
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/upload"));
app.use(
  fileUpload({
    limits: { filesize: 50 * 1024 * 1024 },
  })
);

app.get("/", (req, res) => {
  res.sendFile("index.html");
});
console.log(__dirname);

// app.get("/upload/:name", (req, res) => {
//   const directory = __dirname + "/upload/" + req.params.name; //upload and grab pic or image
//   // res.send(`<a href="http://localhost:${port}/${req.params.names}" download="${req.params.name}" >DOWNLOAD</a>`)   //this works, but not the best way
// });

app.get("/upload/:files", (req, res) => {
  const file = __dirname + "/upload/" + req.params.files;
  res.download(file);
});

app.post("/", (req, res) => {
  console.log(req.files);
  const fileName = req.files.dropboxFile.name;
  const fileData = req.files.dropboxFile.data;
  console.log(fileName);
  console.log(fileData);
  const directory = __dirname + "/upload/"; //going into the upload file, pic or image
  fs.writeFile(directory + fileName, fileData, (err) => {
    if (err) {
      console.log("Error: " + err);
    }
  });
  res.redirect("/upload/" + fileName);
});

app.listen(3000, function () {
  console.log(`listen to port ${port}`);
});
