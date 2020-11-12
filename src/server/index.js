#!/usr/bin/env node

const express = require("express");
const os = require("os");
const { exec } = require("child_process");

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
    .then((APIres) => {
      res.send(APIres);
    })
    .catch((err) => {
      res.send(err);
    });
});

// File System handler
// const FSHandler = require("./API_Handlers/FSHandler.js");
// let FS = new FSHandler();

app.post("/api/WRITEFILE", (req, res) => {
  FS.writeFile(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/api/READFILE", (req, res) => {
  FS.readFile(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/api/test", (req, res) => {
  // Get manager IP address
  let managerIP = undefined;
  exec(
    "consul members | grep manager | awk '{print $2}' | cut -d ':' -f1",
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      managerIP = stdout;

      sshToManager();
    }
  );

  function sshToManager() {
    // SSH to manager and run controller script and wait for stdout
    let sshStatement =
      "ssh ubuntu@" + managerIP + " 'touch /home/ubuntu/test.txt'";

    console.log(sshStatement);

    exec(sshStatement, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      // Send received IP back to client interface
      res.send(stdout);
    });
  }

  // Or just get IP from STDOUT from the SSH command
});

app.post("/api/srvip", (req, res) => {
  // Proof of concept, legacy code
  console.log(req.body);
  res.send("roger roger");
});

app.listen(process.env.PORT || 80, () =>
  console.log(`Listening on port ${process.env.PORT || 80}!`)
);
