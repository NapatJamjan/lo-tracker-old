import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import styled from 'styled-components';
import { quizscore, PLOscore, ScoreTable } from './Dashboard/Table';
import { students } from './Student';

export const DashboardScreen: React.FC = () => {
  const [state, setState] = useState("Quiz");
  return (
    <DashboardDiv>
      <h2 style={{textAlign: "center"}}>Summary</h2>
      <ButtonTab>
        <button onClick={() => setState("Quiz")} style={{marginRight: 5}}>Quiz Score</button>
        <button onClick={() => setState("Outcome")}>Outcome Score</button>
        {state === "Outcome" && <ExportOutcome/>}
      </ButtonTab>
      {state === "Quiz" && <QuizScore/>}
      {state === "Outcome" && <OutcomeScore/>}
    </DashboardDiv>
  );
};

function QuizScore(){
  const quizs: Array<quizscore> = [{id: 1, score: "5/5", detail: "Part 1 : 2/2 \n Part 1 : 3/3"},
  {id: 2, score: "10/10", detail: "Part 1 : 10/10"}, {id: 3, score: "1/10", detail: "Part 1 : 1/5 \n Part 2 : 0/5"}]
  const QuizHead: Array<string> = ['Email', 'Name']
  for (let i = 0; i < quizs.length; i++) { //count unique quiz id
    QuizHead.push('Quiz'+(i+1));
  }
  return(
    <ScoreTable score={quizs} tablehead={QuizHead} isIndividual={false} dataType="quiz"/>
  )
}

function OutcomeScore(){
  const PLOs: Array<PLOscore> = [{id: 1, score: "100%", detail: "LO1 100% \n LO2 100% \n LO3 100%"},
  {id: 2, score: "80%", detail: "LO1 100% \n LO2 100% \n LO3 100%"}, {id: 3, score: "-", detail: "No score"},
  {id: 4, score: "-", detail: "No score"}]
  const PLOHead: Array<string> = ['Email','Name']
  for (let i = 0; i < PLOs.length; i++) { //count unique plo id
    PLOHead.push('PLO'+(i+1));
  }
  return(
    <ScoreTable score={PLOs} tablehead={PLOHead} isIndividual={false} dataType="plo"/>
  )
}

function ExportOutcome(){
  const [show,setShow] = useState(false);
  const [ check, _setCheck ] = useState<Array<boolean>>(
    Array.from({length: students.length+1}, () => false)
  );
  function handleCheck(id:number){
    check[id] = !check[id];
    _setCheck(check.slice());
  }
  function handleCheckAll(){
    check[check.length-1] = !check[check.length-1];
    for (let i = 0; i < check.length; i++) {
      if (check[i] != check[check.length-1]) {check[i] = !check[i]};
    }
    _setCheck(check.slice());
  }
  return(
    <div style={{display: "inline", position: "absolute", right: 50}}>
      <button onClick={() => setShow(true)}>Export Outcome</button>
      <Modal show={show} onHide={() => setShow(false)}>
          <ModalHeader >
            <ModalTitle>Export Outcome</ModalTitle>
          </ModalHeader>
          <ModalBody>
          <form onSubmit={() => setShow(false)}>
            <p style={{marginBottom:0}}>Select student to export outcome data</p>
            <OptionDiv>
            <input type="checkbox" checked={check[check.length-1]} onClick={() => handleCheckAll()}/>
            <label>Select All</label>
            <select name="type" style={{float:"right"}}>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
            </select>
            <p style={{float:"right",paddingRight:10}}>File Type</p>
            </OptionDiv>
            {students.map((std) => (
              <CheckBoxDiv>
                <input type="checkbox" name={"std"+std.id.toString()} value={check[std.id].toString()}
                checked={check[std.id]} onClick={() => handleCheck(std.id)} readOnly/>
                <label>{std.name}</label><br/>
              </CheckBoxDiv>
            ))} </form>
          </ModalBody>
          <ModalFooter>
            {/* <input type="submit" value="Export"/> */}
            <button onClick={() => setShow(false)}>Export</button>
          </ModalFooter>
      </Modal>
    </div>)
}

const DashboardDiv = styled.div`
  text-align: left;
  margin-left : 1%;
  margin-right: 1%;
`;

const ButtonTab = styled.div`
  display: inline-block;
`;

const OptionDiv = styled.div`
  border-bottom: lightgrey 0.5px solid;
  padding-bottom:5px;
  margin-bottom:10px;
  input{
    transform: scale(1.25);
    margin-right: 10px;
  }
`;

const CheckBoxDiv = styled.div`
  font-size: 18px;
  input{
    transform: scale(1.5);
    margin-right: 10px;
  }
`;
