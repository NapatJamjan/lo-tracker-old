import React, { useState } from 'react';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';
import {quizscore, PLOscore, ScoreTable} from './Dashboard/Table';
import { student } from './Student';

export const DashboardScreen: React.FC = () => {
  const [state,setState] = useState("Quiz");
  return (
    <DashboardDiv>
      <h2 style={{textAlign:"center"}}>Summary</h2>
      <ButtonTab>
        <button onClick={() => setState("Quiz")} style={{marginRight:5}}>Quiz Score</button>
        <button onClick={() => setState("Outcome")}>Outcome Score</button>
        {state === "Outcome" && <ExportOutcome/>}
      </ButtonTab>
      {state === "Quiz" && <QuizScore/>}
      {state === "Outcome" && <OutcomeScore/>}
      
    </DashboardDiv>
  );
};

function QuizScore(){
  const quizs:Array<quizscore> = [{id:0,score:"5/5",detail:"Part 1 : 2/2 \n Part 1 : 3/3"},
  {id:1,score:"10/10",detail:"Part 1 : 10/10"},{id:2,score:"1/10",detail:"Part 1 : 1/5 \n Part 2 : 0/5"}]
  const QuizHead:Array<string> =['Email','Name']
  for (let i = 0; i < quizs.length; i++) { //count unique quiz id
    QuizHead.push('Quiz'+(i+1));
  }
  return(
    <ScoreTable score={quizs} tablehead={QuizHead} isIndividual={false}/>
  )
}

function OutcomeScore(){
  const PLOs:Array<PLOscore> = [{id:0,score:"100%",detail:"LO1 100% \n LO2 100% \n LO3 100%"},
  {id:1,score:"80%",detail:"LO1 100% \n LO2 100% \n LO3 100%"},{id:2,score:"-",detail:"No score"}]
  const PLOHead:Array<string> =['Email','Name']
  for (let i = 0; i < PLOs.length; i++) { //count unique plo id
    PLOHead.push('PLO'+(i+1));
  }
  return(
    <ScoreTable score={PLOs} tablehead={PLOHead} isIndividual={false}/>
  )
}

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