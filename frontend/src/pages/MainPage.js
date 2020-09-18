import React, {useState, useEffect} from 'react';
import Canvas from '../components/Canvas';
import { Container, Row, Col, Button, Card, ListGroup, ListGroupItem, Spinner} from 'react-bootstrap';
import Api from '../api/Api';
import InfoAboutRoom from '../components/InfoAboutRoom';
import InputForm from '../components/InputForm';
import 'bootstrap/dist/css/bootstrap.min.css';


const MainPage = props => {

  const [savedRooms, setSavedRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(undefined);
  const [corners, setCorners] = useState([{ x: null, y: null }, { x: null, y: null }, { x: null, y: null }, { x: null, y: null }]);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateRecordIndex, setUpdateRecordIndex] = useState(-1);
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [pendingGetAllCall, setPendingGetAllCall] = useState(true);
  const [errorPost, setErrorPost] = useState(undefined);
  const [cornersForDraw, setCornersForDraw] = useState([]);

  useEffect(() => {
    Api.get('/rooms').then((response) => {
      setSavedRooms(response.data);
      setPendingGetAllCall(false);
    })
    .catch(error => {
      setError(error);
    })
  }, []);

  useEffect(() => {
    setErrorPost(undefined);
  }, [corners])

  const onClickAddNewRoom = () => {
    setShowForm(true);
    setErrorPost(undefined);
  }

  const onClickCancel = () => {
    setShowForm(false);
    setErrorPost(undefined);
    setCorners([{ x: null, y: null }, { x: null, y: null }, { x: null, y: null }, { x: null, y: null }])
    setUpdateMode(false);
  }

  const onClickAddNewPair = () => {
    setCorners([...corners, { x: null, y: null }])
    setErrorPost(undefined);
  }

  const onClickSaveAndDraw = () => {
    setError(undefined);
    setErrorPost(undefined);
    setPendingApiCall(true);
    if (!updateMode){
      Api.post('/rooms', {
        room: corners,
      }).then(response => {
        setPendingApiCall(false);
        let roomWithCorners = {};
        roomWithCorners.roomName = response.data.roomName;
        roomWithCorners.corners = response.data.room;
        setSavedRooms([...savedRooms, roomWithCorners]);
        setCornersForDraw([...corners]);
        setCorners([{ x: null, y: null }, { x: null, y: null }, { x: null, y: null }, { x: null, y: null }]);
        setShowForm(false);
      }).catch(error => {
        console.log(error.response);
        setPendingApiCall(false);
        setErrorPost(error.response.data.error);
      });
    } else {
      Api.put(`/rooms/${savedRooms[updateRecordIndex].roomName}`,{
        room: corners,
      }).then(response => {
        setPendingApiCall(false);
        let roomsForDisplay = [...savedRooms];
        let updatedRoom = savedRooms[updateRecordIndex];
        updatedRoom.corners = [...corners];
        roomsForDisplay.splice(updateRecordIndex, 1, updatedRoom);
        setSavedRooms(roomsForDisplay);
        setCornersForDraw([...corners]);
        setCorners([{ x: null, y: null }, { x: null, y: null }, { x: null, y: null }, { x: null, y: null }]);
        setUpdateMode(false);
        setShowForm(false);
      }).catch(error => {
        setPendingApiCall(false);
        setErrorPost(error.response.data.error);
      });
    }
  }

  const onClickDeletePair = () => {
    let newArrayOfCorners = [...corners];
    newArrayOfCorners.pop();
    setCorners([...newArrayOfCorners]);
    setErrorPost(undefined);
  }

  const onDeleteClick = (index) => {
    setPendingApiCall(true);
    setError(undefined);
    Api.delete(`/rooms/${savedRooms[index].roomName}`).then(response => {
      setPendingApiCall(false);
      let roomsForDisplay = [...savedRooms];
      roomsForDisplay.splice(index, 1);
      setSavedRooms(roomsForDisplay);
    }).catch(error => {
      setPendingApiCall(false);
      setError(error.response.data);
    });
    
  }

  const onEditClick = (index) => {
    const cornersOfChosenRoom = [...savedRooms[index].corners];
    setCorners(cornersOfChosenRoom);
    setUpdateMode(true);
    setUpdateRecordIndex(index);
    setShowForm(true);
    setErrorPost(undefined);
  }

  const onClickDraw = (index) => {
    const roomToDraw = savedRooms[index];
    setCornersForDraw([...roomToDraw.corners]);
  }

  return (
    <Container fluid>
      <Row>
        <div style = {{margin: "auto"}}>
          <h1 >Room builder</h1>
        </div>
      </Row>
      <Row>
        <Col>
          <Card style = {{height: '400px', overflow: 'hidden', overflowY: 'scroll'}}>
            <Card.Header>Saved Rooms</Card.Header>
            {pendingGetAllCall === true ? <Spinner style = {{margin: "auto"}} animation = "border"/> : (
              <ListGroup className="list-group-flush">
              {savedRooms.map((room, index)=> 
                <ListGroupItem id = {room.id}>
                  <Container>
                    <Row>
                      <Col xs = {6}>
                        <InfoAboutRoom data = {[...room.corners]}/>
                      </Col>
                      <Col xs = {2}>
                        <Button 
                          variant = "primary"
                          onClick = {() => onClickDraw(index)}  
                        >
                          Draw
                        </Button>
                      </Col>
                      <Col xs = {2}>
                        <Button 
                          variant = "warning"
                          disabled = {pendingApiCall}
                          onClick = {() => { onEditClick(index) }}
                        >
                          Edit
                        </Button>
                      </Col>
                      <Col xs = {2}>
                        <Button 
                          variant = "danger"
                          onClick = {() => { onDeleteClick(index)}}
                          disabled = {pendingApiCall}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      {error !== undefined ? (
                        {error}
                      ) : (null)}
                    </Row>
                  </Container>
                </ListGroupItem>)}
            </ListGroup>
            )}
          </Card>
        </Col>
        <Col >
          <div style = {{textAlign: "center"}}>
            <Canvas 
              cornersForDraw = {cornersForDraw}
              height = "400" 
              width = "400"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div style = {{textAlign: "center", margin: 20}}>
            <Button 
                variant = "success" 
                size = "lg"
                disabled = {showForm}
                onClick = {onClickAddNewRoom} 
              >
                Add new room
              </Button>
          </div>
        </Col>
      </Row>
      {showForm && (
        <Row>
          <Col xs = {3}></Col>
          <Col xs = {6}>
            <div style = {{margin: 20}}>
              <InputForm 
                onClickSaveAndDraw = {onClickSaveAndDraw}
                onClickAddNewPair = {onClickAddNewPair}
                setCorners = {setCorners}
                corners = {corners}
                onClickCancel = {onClickCancel}
                error = {errorPost} 
                onClickDeletePair = {onClickDeletePair}
              ></InputForm>
            </div>
          </Col>
          <Col xs = {3}></Col>
        </Row>
      )}
    </Container>
  );
}

export default MainPage;