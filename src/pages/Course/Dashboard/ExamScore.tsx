import React from 'react';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';

export default function ExamScore(){
    return(
      <Table hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Exam1</th>
              <th>Exam2</th>
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
        <td><OverlayTrigger placement="auto-start" overlay={HoverText({detail:"Part 1 2/2 \n Part 2 3/3"})} 
          delay={{show:50,hide:100}}>
          <p>5/5</p>
        </OverlayTrigger></td>
        <td><OverlayTrigger placement="auto-start" overlay={HoverText({detail:"Part 1 5/5 \n Part 2 5/5"})} 
          delay={{show:50,hide:100}}>
          <p>10/10</p>
        </OverlayTrigger></td>
      </tr>
    );
}

const HoverText = (props:any) =>(
    <Tooltip {...props}>
      <p style={{whiteSpace:"pre-line"}}>{props.detail}</p>
    </Tooltip>
);
  