import React, { useEffect, useState } from 'react';
import { Collapse, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { useForm } from 'react-hook-form';
import XLSX from 'xlsx';

interface Quiz {
  name: string,
  question: Array<string>
}

let quizzes: Array<Quiz> = [{
  name: 'Quiz 1 Basic Programming',
  question: ['Question 1: Thing to know', 'Question 2: Hello World', 'Question 3: What is Java','Question 4: Java Application']
}, {
  name: 'Quiz 2 Intermediate Programming',
  question: ['Question 1: Hard Question', 'Question 2: Hello World 2', 'Question 3: What is Java 2']
}, {
  name: 'Quiz 3 Advanced Programming',
  question: ['Question 1: How to', 'Question 2: Hello World 3', 'Question 3: What is coding']
}];

export const QuizScreen: React.FC = () => {
  const [ open, _setOpen ] = useState<Array<Array<boolean>>>(quizzes.map(quiz => { 
    return Array.from({length: quiz.question.length + 1}, () => false);
  }));
  function toggle(row: number, col: number) {
    open[row][col] = !open[row][col];
    _setOpen(open.slice());
  }
  return (
    <div style={{marginLeft:10}}>
      <h3>Quiz List</h3>
      {
        quizzes.map((quiz, row) => (
          <div className="quizcard" key={`row-${row}`} >
            <h5 className="edit"><i className="fa fa-pencil"></i></h5>
            <h4 onClick={() => toggle(row, 0)} className="quizlist">
              {quiz.name}
            </h4>
            <Collapse in={open[row][0]}>
              {
                <div style={{marginLeft:30}}>
                  {quiz.question.map((question, col) => (
                    <div key={`row-${row}-col-${col}`}>
                      <h5 className="edit"><i className="fa fa-pencil"></i></h5>
                      <h4 onClick={() => toggle(row, col + 1)} className="quizlist">
                        {question}
                      </h4>
                      <Collapse in={open[row][col + 1]}>
                        <div className="question" style={{marginLeft:30}}>
                          <p>Max Score 5</p>
                          <p style={{fontWeight:"bolder"}}>Linked LO: LO1(1) LO2(2,3) LO3(1)</p>
                        </div>
                      </Collapse>
                    </div>
                  ))}
                </div>
              }
            </Collapse>
          </div>
        ))
      }

      <ImportExcelToCourse name="CSC100 Tutorial Course"/>
    </div>
  );
}

function ImportExcelToCourse(props:any){
  const [show, setShow] = useState(false);
  const { register, handleSubmit, setValue } = useForm<{name:string}>();
  useEffect(() => {
    if (!show) setValue('name', '');
  }, [show]);
  return(
    <div>
      <button className="floatbutton" onClick={() => setShow(true)} style={{position:"absolute",right:25,bottom:25}}>
        <i className="fa fa-download"></i>Import
      </button>
      <Modal show={show} onHide={() => setShow(false)}>
      <form onSubmit={handleSubmit((data) => {addQuiz(data.name); setShow(false);})}>
        <ModalHeader closeButton>
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
      <label>Choose file to import</label><br/>
      <input type="file" id="fileUpload" onChange={Upload}/>
    </div>
  );   
}

function addQuiz(nameval:string){
  quizzes.push({
    name:nameval,question:QuestionArray
  });
  QuestionArray = [];
}

function Upload() {
  const fileUpload = (document.getElementById('fileUpload') as HTMLInputElement);
  const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
    // let fileName = fileUpload.files![0].name; 
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

interface ExcelData{
  Question:string;
}

let QuestionArray:Array<string> = []

function processExcel(data:any) {
  const workbook = XLSX.read(data, {type: 'binary'});
  const firstSheet = workbook.SheetNames[0];
  const excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
  for (let i = 0; i < excelRows.length; i++) {
    QuestionArray.push((excelRows[i] as ExcelData).Question);
  }
  QuestionArray = QuestionArray.filter((x, i, a) => a.indexOf(x) === i)//filter dupe
  for (let i = 0; i < QuestionArray.length; i++) { // add question no.
    QuestionArray[i] = ("Question "+(i+1)+": "+QuestionArray[i])
  }
  console.log(QuestionArray);
}