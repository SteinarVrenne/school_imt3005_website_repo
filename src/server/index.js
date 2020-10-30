#!/usr/bin/env node

const express = require("express");
const os = require("os");

const app = express();

app.use(express.static("dist"));
app.use(express.static("public"));

// API CALLS
// const APIcalls = require("./API_Handlers/APIcalls.js");
// let API = new APIcalls();

// Parse incoming data as JSON
app.use(express.json());

app.post("/api/POST", (req, res) => {
  API[req.body.APIrequest](req.body)
    .then(APIres => {
      res.send(APIres);
    })
    .catch(err => {
      res.send(err);
    });
});

// File System handler
// const FSHandler = require("./API_Handlers/FSHandler.js");
// let FS = new FSHandler();

app.post("/api/WRITEFILE", (req, res) => {
  FS.writeFile(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
});

app.post("/api/READFILE", (req, res) => {
  FS.readFile(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
});

app.get("/api/test", (req, res) => {
  console.log("test", req);
  res.send("test")
})

app.listen(process.env.PORT || 80, () =>
  console.log(`Listening on port ${process.env.PORT || 80}!`)
);

