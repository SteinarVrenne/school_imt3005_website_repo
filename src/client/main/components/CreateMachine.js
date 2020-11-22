import React, { Component } from "react";
import {
  Button,
  Container,
  UncontrolledTooltip,
  ButtonGroup,
  Row,
  Col,
  ModalFooter,
  ModalBody,
} from "reactstrap";

import AwaitingServer from "../modals/AwaitingServer.js";

export default class MainNavbar extends Component {
  constructor() {
    super();

    this.state = {
      packageNotSelected: true,
      spinnerActive: false,
      awaitingServerModal: false,
      modalTextData: {
        modalHeader: "Your machine is being created!",
        modalFooter: "The process will be over soon",
        modalBody: "",
        modalFooterButton: "",
      },
    };

    //Binds
    this.newMachineRequest = this.newMachineRequest.bind(this);
    this.packageSelected = this.packageSelected.bind(this);
  }

  newMachineRequest() {
    this.setState({ spinnerActive: true, awaitingServerModal: true });

    fetch("/api/post/container", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ package: this.state.activePackage }),
    })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((data) => {
        // console.log(data);

        // Change modal to display new data
        let modalTextData = {
          modalHeader: "Your machine has been created!",
          modalFooter: "Have fun!",
          modalBody: (
            <ModalBody>
              Your machine can be located at{" "}
              <a href={data.ipAndPort + "/vnc.html"}>
                {"http://" + data.ipAndPort + "/vnc.html"}
              </a>
              .
              <br />
              <br />
              Use password:{data.pwd} when prompted.
            </ModalBody>
          ),
          modalFooterButton: (
            <ModalFooter>
              <div
                style={{
                  margin: "0px auto",
                  paddingRight: "10%",
                  paddingLeft: "10%",
                }}
              >
                <Button
                  onClick={() => {
                    this.setState({ awaitingServerModal: false });
                  }}
                >
                  Close
                </Button>
              </div>
            </ModalFooter>
          ),
        };

        this.setState({ spinnerActive: false, modalTextData: modalTextData });
      });
  }

  packageSelected(name) {
    this.setState({ packageNotSelected: false, activePackage: name });
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
      "Steganography Package",
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
                    this.packageSelected("forensics");
                  }}
                  style={{ width: "33%" }}
                >
                  {buttonNames[0]}
                </Button>
                <Button
                  size="lg"
                  color="success"
                  onClick={() => {
                    this.packageSelected("pentest");
                  }}
                  style={{ width: "33%" }}
                >
                  {buttonNames[1]}
                </Button>
                <Button
                  size="lg"
                  color="danger"
                  onClick={() => {
                    this.packageSelected("stego");
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
          textData={this.state.modalTextData}
          awaitingServerModal={this.state.awaitingServerModal}
        ></AwaitingServer>
      </div>
    );
  }
}
