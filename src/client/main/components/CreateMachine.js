import React, { Component } from "react";
import {
  Button,
  Container,
  UncontrolledTooltip,
  ButtonGroup,
  Row,
  Col,
} from "reactstrap";

import AwaitingServer from "../modals/awaitingServer";

export default class MainNavbar extends Component {
  constructor() {
    super();

    this.state = {
      packageNotSelected: true,
      spinnerActive: false,
    };

    //Binds
    this.newMachineRequest = this.newMachineRequest.bind(this);
    this.packageSelected = this.packageSelected.bind(this);
  }

  newMachineRequest() {
    this.setState({ spinnerActive: true });
    fetch("/api/test").then((data) => {
      console.log(data);
      this.setState({ spinnerActive: false });
    });
  }

  packageSelected(test) {
    this.setState({ packageNotSelected: false });
    console.log(test);
  }

  render() {
    const containerCSS = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
    };

    let buttonNames = [
      "Forensics Package",
      "Penetration Testing Package",
      "Incident Response Package",
    ];

    return (
      <div>
        <Container style={containerCSS}>
          <Row>
            <Col>
              <ButtonGroup>
                <Button
                  size="lg"
                  color="primary"
                  onClick={() => {
                    this.packageSelected(buttonNames[0]);
                  }}
                  style={{ width: "33%" }}
                >
                  {buttonNames[0]}
                </Button>
                <Button
                  size="lg"
                  color="success"
                  onClick={() => {
                    this.packageSelected(buttonNames[1]);
                  }}
                  style={{ width: "33%" }}
                >
                  {buttonNames[1]}
                </Button>
                <Button
                  size="lg"
                  color="danger"
                  onClick={() => {
                    this.packageSelected(buttonNames[2]);
                  }}
                  style={{ width: "33%" }}
                >
                  {buttonNames[2]}
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>

        <Container fluid={true} style={containerCSS}>
          <div id="buttonHolder">
            <Button
              onClick={this.newMachineRequest}
              disabled={false}
              id="machineSelectButton"
              style={{
                pointerEvents: this.state.packageNotSelected ? "none" : "auto",
              }}
            >
              Create new Machine
            </Button>
          </div>
          {this.state.packageNotSelected && (
            <UncontrolledTooltip placement="bottom" target="buttonHolder">
              You must select a package first!
            </UncontrolledTooltip>
          )}
        </Container>

        <AwaitingServer
          spinnerActive={this.state.spinnerActive}
        ></AwaitingServer>
      </div>
    );
  }
}
