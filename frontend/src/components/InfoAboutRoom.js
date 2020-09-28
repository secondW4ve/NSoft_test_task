import React from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const InfoAboutRoom = props => {

  return (
    <Container className = "info-record">
      <Row>
        <Col>
          <ListGroup className="list-group-flush">
            {props.data.map((corner) => 
              <ListGroupItem id = {corner.id}>
                <Container>
                  <Row>
                    <Col>
                      x: {corner.x}
                    </Col>
                    <Col>
                      y: {corner.y}
                    </Col>
                  </Row>
                </Container>
              </ListGroupItem>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default InfoAboutRoom;