import React, { useContext, useEffect, useState } from 'react';
import { Collapse, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import XLSX from 'xlsx';
import { QuizContext } from '../../shared/quiz';

export const QuizScreen: React.FC = () => {
  const {quizzes} = useContext(QuizContext)
  const [ open, _setOpen ] = useState<Array<Array<boolean>>>(quizzes.map(quiz => { 
    return Array.from({length: quiz.question.length + 1}, () => false);
  }));
  useEffect(() => {
    open.push(Array.from({length:quizzes[quizzes.length-1].question.length+1}, () => false))
  }, [quizzes]);
  function toggle(row: number, col: number) {
    open[row][col] = !open[row][col];
    _setOpen(open.slice());
  }
  return (
    <div style={{marginLeft:10}}>
      <h3>Quiz List</h3>
      {
        quizzes.map((quiz, row) => (
          <Quizcard key={`row-${row}`} >
            <EditIcon><i className="fa fa-pencil"></i></EditIcon>
            <Quizlist onClick={() => toggle(row, 0)}>
              {quiz.name}
            </Quizlist>
            <Collapse in={open[row][0]}>
              {
                <div style={{marginLeft:30}}>
                  {quiz.question.map((question, col) => (
                    <div key={`row-${row}-col-${col}`}>
                      <EditIcon><i className="fa fa-pencil"></i></EditIcon>
                      <Quizlist onClick={() => toggle(row, col + 1)}>
                        {question}
                      </Quizlist>
                      <Collapse in={open[row][col + 1]}>
                        <Question style={{marginLeft:30}}>
                          <p>Max Score 5</p>
                          <p style={{fontWeight:"bolder"}}>Linked LO: LO1(1) LO2(2,3) LO3(1)</p>
                        </Question>
                      </Collapse>
                    </div>
                  ))}
                </div>
              }
            </Collapse>
          </Quizcard>
        ))
      }

      <ImportExcelToCourse name="CSC100 Tutorial Course"/>
    </div>
  );
}

function ImportExcelToCourse(props:any){
  const {addQuiz} = useContext(QuizContext)
  const [show, setShow] = useState(false);
  const { register, handleSubmit, setValue } = useForm<{name:string,question:Array<string>}>();
  useEffect(() => {
    if (!show) setValue('name', '');
  }, [show]);
  return(
    <div>
      <button className="floatbutton" onClick={() => setShow(true)} style={{position:"absolute",right:25,bottom:25}}>
        <i className="fa fa-download"></i>Import
      </button>
      <Modal show={show} onHide={() => setShow(false)}>
      <form onSubmit={handleSubmit((data) => {
        data.question=QuestionArray ; addQuiz(data); setShow(false);QuestionArray=[];
        })}>
        <ModalHeader>
          <ModalTitle>Import quiz result</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p style={{margin:0}}>Please import an excel file of the quiz result (.xlsx)</p>
          <label><b>Course</b></label><br/>
          <input list="courselist" name="course" value={props.name} readOnly/><br/>
          <label>Quiz Name</label><br/>
          <input type="text" {...register('name')} required/><br/>
          <ImportExcel/>
        </ModalBody>
        <ModalFooter>
          <input type="submit" value="Import"/>
        </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}

function ImportExcel(props: any) {
  return (
    <div>
      <label>Choose a file to import</label><br/>
      <input type="file" id="fileUpload" onChange={Upload}/>
    </div>
  );   
}

function Upload() {
  const fileUpload = (document.getElementById('fileUpload') as HTMLInputElement);
  const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      if (reader.readAsBinaryString) {
        reader.onload = (e) => {
            processExcel(reader.result);
        };
        reader.readAsBinaryString(fileUpload.files![0]);
      }
    } else {console.log("This browser does not support HTML5.");}
  } else {alert("Please upload a valid Excel file.");}
}

interface ExcelColumn{
  Question:string;
  MaxScore:number;
}

let QuestionArray:Array<string> = []

function processExcel(data:any) {
  const workbook = XLSX.read(data, {type: 'binary'});
  const firstSheet = workbook.SheetNames[0];
  const excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
  for (let i = 0; i < excelRows.length; i++) {
    QuestionArray.push((excelRows[i] as ExcelColumn).Question);
  }
  QuestionArray = QuestionArray.filter((x, i, a) => a.indexOf(x) === i)//filter dupe
  for (let i = 0; i < QuestionArray.length; i++) { // add question no.
    QuestionArray[i] = ("Question "+(i+1)+": "+QuestionArray[i])
  }
  console.log(QuestionArray);
}

export const Quizcard = styled.div`
  width: 50%;
  padding-bottom: 20px;
`;

export const Quizlist = styled.h4`
  list-style-type: none;
  text-align: left;
  margin: 0px;
  padding-left: 0px;
  border: #282c34 solid;
  margin-top: -2px;
`;

export const EditIcon = styled.h5`
  right:45%;
  position: absolute;
`;

export const Question = styled.div`
  list-style-type: none;
  text-align: left;
  margin-left: 50px;
  padding-left: 0px;
  border-left: #282c34 3px solid;
  border-right: #282c34 3px solid;
  &:last-child{
    border-bottom: #282c34 3px solid;
  }
  p{
    margin-bottom: 0px;
  }
`;