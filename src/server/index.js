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

app.post("/api/post/container", (req, res) => {
  console.log(req.body);
  // Get manager IP address from Consul, remove data for only the IP address and remove linebreak after
  let managerIP = undefined;
  exec(
    "consul members | grep manager | awk '{print $2}' | cut -d ':' -f1 | tr -d '\n'",
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
    let pass = generatePassword();
    console.log("New password generated:" + pass);
    // SSH to manager and run controller script and wait for stdout
    let sshStatement =
      "ssh -oStrictHostKeyChecking=no -t -t ubuntu@" +
      managerIP +
      " 'echo '" +
      pass +
      "' >> /home/ubuntu/test.txt'";

    let sshRunStatement =
      "ssh -oStrictHostKeyChecking=no -t -t ubuntu@" +
      managerIP +
      " '/usr/bin/python /etc/puppetlabs/code/environments/production/scripts/kali/managerscript.py " +
      pass +
      " " +
      req.body.package +
      "'";
    // " pentest'";

    console.log(sshRunStatement);

    exec(sshRunStatement, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);

        // Only break if we did not get stdout
        if (stderr && !stdout) return;
      }
      console.log(`stdout: ${stdout}`);
      // Send received IP back to client interface

      let returnObject = { stdout: stdout, pwd: pass };
      res.send(returnObject);
    });
  }

  // Code taken from https://stackoverflow.com/questions/1497481/javascript-password-generator
  // Will only serve as a proof of concept random generator, but good enough for our use

  function generatePassword() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
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
