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
      margin: "0px auto",
    };

    return (
      <div>
        <Modal isOpen={this.props.awaitingServerModal}>
          <ModalHeader>{this.props.textData.modalHeader}</ModalHeader>
          <ModalBody>
            {this.props.textData.modalBody}
            {this.props.spinnerActive && (
              <Container style={spinnerStyle}>
                <Row>
                  <Spinner
                    style={spinnerStyle}
                    size="lg"
                    color="success"
                  ></Spinner>
                </Row>
              </Container>
            )}
          </ModalBody>
          <ModalFooter
            style={{
              display: "block",
            }}
          >
            {this.props.textData.modalFooter}
          </ModalFooter>
          {this.props.textData.modalFooterButton}
        </Modal>
      </div>
    );
  }
}
