import React, { useState } from 'react';
import { Modal, ModalTitle, ModalBody, ModalFooter, Button, Collapse } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import styled from 'styled-components';
export default function ManageLO(){
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(<div>
      <button className="floatbutton" onClick={handleShow} style={{position:"absolute",right:25,bottom:25}}>
        LO <span style={{fontSize:10}}>Manage</span>
      </button>
  
    <Modal show={show} onHide={handleClose}>
      <ModalHeader closeButton>
        <ModalTitle>Manage Learning Outcome</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form>
          <LOCard name="LO1 Basic Java"/>
          <LOCard name="LO2 C#"/>
          <p style={{marginBottom:25}}><RightButton className="fa fa-plus-circle"></RightButton></p>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={handleClose}>Save</Button>
      </ModalFooter>
    </Modal>
    </div>
    )
}

function LOCard(props:any){
  const [open, setOpen] = useState(false);
  return (
    <CardDiv>
      <h5 style={{marginBottom:0}} onClick={() => setOpen(!open)}>{props.name}
        <RightButton className="fa fa-window-close-o"></RightButton>
      </h5>
      <Collapse in={open}>
        <div>
        <LOLevel name="Level 1 Hello World"/>
        <LOLevel name="Level 2 Conditional and Loop"/>
        <LOLevel name="Level 3 Function"/>
        <p><LevelRightButton className="fa fa-plus-circle"></LevelRightButton></p>
        </div>
      </Collapse>

    </CardDiv>
  )
}

function LOLevel(props:any){
  return(
    <LevelDiv>
      <p style={{marginBottom:-3}}>{props.name}
      <LevelRightButton className="fa fa-window-close-o" ></LevelRightButton>
      </p>
    </LevelDiv>
  )
}

const CardDiv = styled.div`
  border-bottom: grey 0.5px solid;
  margin-bottom: 10px;
`;

const RightButton = styled.i`
  position:absolute;
  right:15px;
  text-align:center;
  font-size: 24px;
`;

const LevelRightButton = styled.i`
  position:absolute;
  right:19px;
  text-align:center;
  font-size: 16px;
`;

const LevelDiv = styled.div`
  margin-left: 20px;
`;
