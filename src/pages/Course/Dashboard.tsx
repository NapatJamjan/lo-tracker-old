import React, { useState } from 'react';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';
import {ExamScore} from './Dashboard/ExamScore';
import {OutcomeScore} from './Dashboard/OutcomeScore';
import { student } from './Student';

export const DashboardScreen: React.FC = () => {
  const students:Array<student> = [{id:0,mail:"mail@mail.com",name:"Student Studying"},
    {id:1,mail:"mail@moremail.com",name:"Student2 Studying2"},{id:2,mail:"std@student.mail",name:"std A"},
    {id:3,mail:"mail@mail.com",name:"Student Studying"}]
  const [state,setState] = useState("Exam");
  return (
    <DashboardDiv>
      <h2 style={{textAlign:"center"}}>Summary</h2>
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