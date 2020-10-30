// Import React
import React, { Component } from "react";

// Import components
// import ILOInformation from "./ILOInformation.js";
import Navbar from "./components/Navbar.js"
import CreateMachine from "./components/CreateMachine.js";


export default class Main extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <CreateMachine></CreateMachine>
      </div>
    );
  }
}


// Knapp for å lage server!!!!
// Forskjellige pakker
// Server IP 
// Passord til VNC