const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.static("./"));

app.get("/", (req, res) => {
  fs.readFile("./serviceWorker.html", (err, data) => {
    if (err) {
      console.log(err.toString());
    } else {
      res.write(data);
    }
  });
});

app.listen(8080);
console.log("http://localhost:8080/");
