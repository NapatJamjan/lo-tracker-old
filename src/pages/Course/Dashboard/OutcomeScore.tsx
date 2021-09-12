import React from 'react';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';

export default function OutcomeScore(){
    return(
      <Table hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>PLO1</th>
              <th>PLO2</th>
              <th>PLO3</th>
            </tr>
          </thead>
          <tbody>
            <Student mail="mail@mail.com" name="Student A"/>
            <Student mail="moremail@mail.com" name="Student Studying"/>
            <Student mail="moremail@mail.com" name="Student Studying"/>
            <Student mail="moremail@mail.com" name="Student Studying"/>
          </tbody>
        </Table>
    )
}

function Student(props:any){
    return (
      <tr onClick={()=>{alert("Individual summary here")}}>
        <td>{props.mail}</td>
        <td>{props.name}</td>
        <td>
            <OverlayTrigger placement="auto-start" overlay={HoverText({detail:"LO1 100% \n LO2 100% \n LO3 100%"})} 
                delay={{show:50,hide:100}}>
                <p>100%</p>
            </OverlayTrigger>
        </td>
        <td>
            <OverlayTrigger placement="auto-start" overlay={HoverText({detail:"LO2 90% \n LO3 70%"})} 
                delay={{show:50,hide:100}}>
                <p>80%</p>
            </OverlayTrigger>
        </td>
        <td>
            <OverlayTrigger placement="auto-start" overlay={HoverText({detail:"No LO linked to this PLO"})} 
                delay={{show:50,hide:100}}>
                <p>-</p>
            </OverlayTrigger>
        </td>
      </tr>
    );
}

const HoverText = (props:any) =>(
    <Tooltip {...props}>
      <p style={{whiteSpace:"pre-line"}}>{props.detail}</p>
    </Tooltip>
);
  