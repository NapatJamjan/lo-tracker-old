import React, { useState } from 'react';
import { Modal, ModalTitle, ModalBody, ModalFooter, Button, Collapse } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import styled from 'styled-components';

interface outcome{
    title:string,
    level: Array<string>
}

export default function ManageProgram(){
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const LOs:Array<outcome> = [{
        title:"Computer Science",level:['PLO1 : Programming Knowledge','PLO2 : Use Computer Science to ','PLO3 : a']
      },{
        title:"I.T.",level:['PLO1 : Technologies Knowledge','PLO2 : Internet Adaption','PLO3 : ']
      },
    ]

    return(<div>
        <button className="floatbutton" onClick={handleShow} style={{position:"absolute",right:100,bottom:25}}>
            <i className="fa fa-pencil-square"></i>
            Program
        </button>
        <Modal show={show} onHide={handleClose}>
      <ModalHeader closeButton>
        <ModalTitle>Manage Programs</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form>
          {
            LOs.map((lo,i) =>(
              <LOCard name={lo.title} level={lo.level}/>
           ))
          }
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

function LOCard(props:{name:string,level:Array<string>}){
  const [open, setOpen] = useState(false);
  return (
    <CardDiv>
      <h5 style={{marginBottom:0}} onClick={() => setOpen(!open)}>{props.name}
        <RightButton className="fa fa-window-close-o"></RightButton>
      </h5>
      <Collapse in={open}>
        <div>
          {props.level.map((lvl,i)=>(
            <LOLevel name={lvl}/>
          ))}
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
