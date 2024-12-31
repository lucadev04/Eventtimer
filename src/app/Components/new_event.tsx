import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';



const event = function Event() {
    const [show, setShow] = useState(false);
    const [Eventname, setText] = useState('');
    const [Date1, setDate1] = useState('');
    const [Time, setTime] = useState('');
    var today = new Date();
    var date = new Date(Date1+'T'+Time+':00');
    var difference = '';
  
  
    function new_event() {
      function handleEvent() {
        difference = differenceInDays(date, today)+' Tage '+differenceInHours(date, today)+':'+differenceInMinutes(date, today)+':'+differenceInSeconds(date, today)
        localStorage.setItem("eventDate", Date1);
        localStorage.setItem("eventTime", Time);
        localStorage.setItem("eventName", Eventname);
      }
      return (
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>New Event</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Eventname">
              <Form.Label>Eventname</Form.Label>
              <Form.Control type="text" placeholder="Eventname" onChange={e => setText(e.target.value)}/>
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="Date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" placeholder="Date" onChange={e => setDate1(e.target.value)} />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="Time">
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" placeholder="Time" onChange={e => setTime(e.target.value)}/>
            </Form.Group>
  
            <Button variant="primary" type="submit" onClick={handleEvent}>
              Add
            </Button>
          </Form>
          </Modal.Body>
        </Modal>
      );
    }
  
    return (
      <>
        <Button variant="dark" onClick={() => setShow(true)}>New Event</Button>
        {show && new_event()}
      </>
    );
  }

  export default event;