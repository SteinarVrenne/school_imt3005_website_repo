// Import React
import React, { Component } from "react";
import {
  Button,
  Container,
  UncontrolledTooltip,
  ButtonGroup,
  Row,
  Col,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Modal,
  Spinner,
} from "reactstrap";

export default class AwaitingServer extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const spinnerStyle = {
      height: "60px",
      width: "60px",
      margin:"0px auto"
    };

    return (
      <div>
        <Modal isOpen={this.props.spinnerActive}>
          <ModalHeader>Your machine is being created!</ModalHeader>
          <ModalBody>
            <Container style={spinnerStyle}>
              <Row>
                <Spinner
                  style={spinnerStyle}
                  size="lg"
                  color="success"
                ></Spinner>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>The process will be over soon</ModalFooter>
        </Modal>
      </div>
    );
  }
}
