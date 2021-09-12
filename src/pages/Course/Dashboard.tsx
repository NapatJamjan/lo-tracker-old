import React, { useState } from 'react';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';

export const DashboardScreen: React.FC = () => {
  const [state,setState] = useState("Exam");
  return (
    <DashboardDiv>
      <h2 style={{textAlign:"center"}}>Course Summary</h2>
      <ButtonTab>
        <button onClick={() => setState("Exam")}>Exam Score</button>
        <button onClick={() => setState("Outcome")}>Outcome Score</button>
        {state === "Outcome" && <ExportOutcome/>}
      </ButtonTab>
      {state === "Exam" && <ExamScore/>}
      {state === "Outcome" && <OutcomeScore/>}
      
    </DashboardDiv>
  );
};

function ExamScore(){
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

function OutcomeScore(){
  return(
    <Table hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>PLO1</th>
            <th>PLO2</th>
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

function ExportOutcome(){
  return(
    <button style={{position:"absolute",right:50}}>Export Outcome</button>
  )
}

const DashboardDiv = styled.div`
  text-align: left;
  margin-left : 1%;
  margin-right: 1%;
`;

const ButtonTab = styled.div`
  display: inline-block;
`;