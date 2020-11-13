// Import React
import React, { Component } from "react";

// Import components
// import ILOInformation from "./ILOInformation.js";
import Navbar from "./components/Navbar.js";
import CreateMachine from "./components/CreateMachine.js";

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      bian: false,
    };

    this.xgenicClick = this.xgenicClick.bind(this)
  }

  xgenicClick(){
    this.setState({bian:true})
  }

  render() {
    return (
      <div>
        <Navbar onClick={this.xgenicClick}></Navbar>
        <CreateMachine></CreateMachine>
        {this.state.bian && (
          <img src="https://innsidawls.itea.ntnu.no/user-profile-service/rest/files/7a40556e-0e93-3919-ad6b-4619c4673407" />
        )}
      </div>
    );
  }
}

// Knapp for å lage server!!!!
// Forskjellige pakker
// Server IP
// Passord til VNC
