import React, { useState } from 'react';
import Api from '../api/Api';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const InputForm = props => {

  return (
    <div className = "input-container">
      <div>
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
      <div className = "control-container">
        <div className = "button-container">
          <Button 
            variant = "primary" 
            disabled = {props.pendingApiCall}
            onClick={props.onClickAddNewPair}
          >
            Add new pair
          </Button>
          <Button 
            variant = "warning" 
            disabled = {props.pendingApiCall}
            onClick={props.onClickDeletePair}
          >
            Delete pair
          </Button>
          <Button 
            variant="success" 
            type = "submit" 
            disabled = {props.pendingApiCall}
            onClick = {props.onClickSaveAndDraw}
          >
            Save and draw
          </Button>
          <Button 
            onClick = {props.onClickCancel} 
            variant = "danger"
            disabled = {props.pendingApiCall}
          >
            Cancel
          </Button>
          </div>
        <div className = "error-block">
          {props.pendingApiCall && <Spinner animation = "border"></Spinner>}
          <div>
            {props.error !== undefined ?
              <div>{props.error}</div> :
              <div></div>
            }
          </div>
        </div> 
      </div>
    </div>
  )
}

export default InputForm;