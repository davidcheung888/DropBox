/**********************************************
 * Upload Files
 * ==================================
 * 0. [ x ] Look over documentation
 * 1. [ x ] Create the frontend
 *    [ ] javascript function
 *    [ x ] input (name = "upload" type="file")
 * 2. Create routes (and cache)
 *  2a) get route for pages
 *  2b) post route for the dropbox files
 *  2c) create get route for the file (to retrieve the data)
 * 3. Create the readfile and writefile function
 * 4. Put it together
 *
 * Being able to read, understand and utilize libraries is a key skill for any developer
 * Please read the documentation of express fileupload here:
 * https://www.npmjs.com/package/express-fileupload
 ***********************************************/

// keep all imports and important variables at the top of your file
const express = require("express");
const expressFileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
const port = 8080;
let fs = require("fs");
let http = require("http");
const app = express();

//
let cache = {};

const uploadDirectory = __dirname + "/uploaded";
// css, html, images
// middleware - functions that you implement into your application, and will be integrated for all your requests and responses

app.use(express.static(path.join(__dirname, "public")));
app.use(expressFileUpload());
// app.get("/", (request, response) => {
//   let path = path.join();
// grabs our path for us
// LectureExample/public/index.html
//   let newPath = path.join(
//     __dirname,
//     "public",
//     "index.html"
//   );
//   response.sendFile(newPath);
// response.json({product: product})
// });

// app.get("/", (request, response) => {
//   response.send("index.html");
// });

/**********************************************
 * 2 get routes
 * ==================================
 * First Route: / -> dropbox.html
 * Second Route: /planner -> planner.html
 ***********************************************/
// app.get("/planner", (request, response) => {
//   response.send('planner.html')
// })


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



_____________________
