import React, { Component } from "react";
import { Button, ButtonGroup, Container, Row, Col } from "reactstrap";

export default class MainNavbar extends Component {
  constructor() {
    super();

    //Binds
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <ButtonGroup>
                <Button size="lg" color="primary">Forensics package</Button>
                <Button size="lg" color="success">Penetration package</Button>
                <Button size="lg" color="danger">Incident Response package</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
