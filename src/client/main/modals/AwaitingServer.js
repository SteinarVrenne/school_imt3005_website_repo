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

    this.state = { clickedOutside: true };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    if (this.props.spinnerActive) {
      return true;
    }
    this.setState({ clickedOutside: !this.state.clickedOutside });
    return this.props.awaitingServerModal && this.state.clickedOutside;
  }

  componentWillUnmount() {
    this.setState({ clickedOutside: true });
  }

  render() {
    const spinnerStyle = {
      height: "60px",
      width: "60px",
      margin: "0px auto",
    };

    return (
      <div>
        <Modal
          isOpen={this.props.awaitingServerModal && this.state.clickedOutside}
          toggle={this.toggle}
        >
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
          <ModalFooter>{this.props.textData.modalFooter}</ModalFooter>
        </Modal>
      </div>
    );
  }
}
