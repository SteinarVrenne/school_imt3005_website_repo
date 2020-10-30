import React, { Component } from "react";
import { Button } from "reactstrap";

export default class MainNavbar extends Component {
  constructor() {
    super();

    //Binds
    this.newMachineRequest = this.newMachineRequest.bind(this);
  }

  newMachineRequest() {
    fetch("/api/test").then((data) =>
      console.log(data)
    );
  }

  render() {
    return (
      <div>
        <Button onClick={this.newMachineRequest}>Create new Machine</Button>
      </div>
    );
  }
}
