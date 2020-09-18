import React, { useState } from 'react';
import Api from '../api/Api';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const InputForm = props => {

  return (
    <Container>
      <Row className="justify-content-md-center">
          <div style = {{marginBottom: 10}}>
            {props.corners.map((corner, index) => (
              <div>
                <input
                    type="text"
                    placeholder = "X"
                    value = {corner.x === null ? '' : corner.x}
                    onChange={({ target: { value } }) =>
                      props.setCorners([
                        ...props.corners.slice(0, index),
                        { x: value, y: props.corners[index].y },
                        ...props.corners.slice(index + 1, props.corners.length),
                      ])
                    }
                  />
                  <input
                    type="text"
                    placeholder = "Y"
                    value = {corner.y === null ? '' : corner.y}
                    onChange={({ target: { value } }) =>
                      props.setCorners([
                        ...props.corners.slice(0, index),
                        { x: props.corners[index].x, y: value },
                        ...props.corners.slice(index + 1, props.corners.length),
                      ])
                    }
                  />
              </div>  
            ))}
          </div>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs md = "auto">
          <Button 
            variant = "primary" 
            disabled = {props.pendingApiCall}
            onClick={props.onClickAddNewPair}
          >
            Add new pair
          </Button>
        </Col>
        <Col xs md = "auto">
          <Button 
            variant = "warning" 
            disabled = {props.pendingApiCall}
            onClick={props.onClickDeletePair}
          >
            Delete pair
          </Button>
        </Col> 
        <Col xs md = "auto">
          <Button 
            variant="success" 
            type = "submit" 
            disabled = {props.pendingApiCall}
            onClick = {props.onClickSaveAndDraw}
          >
            Save and draw
          </Button>
        </Col>
        <Col xs md = "auto">
          <Button 
            onClick = {props.onClickCancel} 
            variant = "danger"
            disabled = {props.pendingApiCall}
          >
            Cancel
          </Button>
        </Col>   
      </Row>
      <Row>
        <div style = {{margin: "auto"}}>
          {props.pendingApiCall && <Spinner animation = "border"></Spinner>}
          <div style = {{color: "red"}}>
            {props.error !== undefined ?
              <div>{props.error}</div> :
              null
            }
          </div>
          
        </div>
          
      </Row>
    </Container>
  )
}

export default InputForm;