import { AnyRecord } from 'dns';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { examscore, PLOscore, ScoreTable } from './Table';

export const IndividualScore:React.FC = (props:any) =>{
    const params = useParams<{id: string}>();
    const history = useHistory();
    const [state,setState] = useState("Exam");
    return(<MainDiv>
        <BackButton onClick={history.goBack}>
        <i className="fa fa-arrow-left" aria-hidden="true"></i>Back
        </BackButton>
        <h6>Course ID:{params.id}</h6>
        <h6>Name : Student Studying</h6>
        <h6>Email : mail@mail.com</h6>  
        <DashboardDiv>
            <ButtonTab>
                <button onClick={() => setState("Exam")} style={{marginRight:5}}>Exam Score</button>
                <button onClick={() => setState("Outcome")}>Outcome Score</button>
                {state === "Outcome" && <ExportOutcome/>}
            </ButtonTab>
            {state === "Exam" && <ExamScore/>}
            {state === "Outcome" && <OutcomeScore/>}
        </DashboardDiv>
    </MainDiv>)
}

function ExamScore(){
    const exams:Array<examscore> = [{id:0,score:"5/5",detail:"Part 1 : 2/2 \n Part 1 : 3/3"},
    {id:1,score:"10/10",detail:"Part 1 : 10/10"},{id:2,score:"1/10",detail:"Part 1 : 1/5 \n Part 2 : 0/5"}]
    const ExamHead:Array<string> =['Email','Name']
    for (let i = 0; i < exams.length; i++) { //count unique exam id
      ExamHead.push('Exam'+(i+1));
    }
    return(
      <ScoreTable score={exams} tablehead={ExamHead} isIndividual={true} />
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
      <ScoreTable score={PLOs} tablehead={PLOHead} isIndividual={true}/>
    )
}
  
function ExportOutcome(){
    return(
      <button style={{position:"absolute",right:50}}>Export Outcome</button>
    )
}
  
const MainDiv = styled.div`
  margin: 1.5%;
  text-align: start;
`;

const BackButton = styled.button`
  float: left;
  margin-top: 20px;
  padding:5px;
  margin-right:15px;
`;

const DashboardDiv = styled.div`
    text-align: left;
    margin-left : 1%;
    margin-right: 1%;
`;
  
const ButtonTab = styled.div`
    display: inline-block;
`;