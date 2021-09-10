import React, { useState } from 'react';
import { Collapse, Modal, ModalBody, ModalFooter, ModalTitle, Button } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import XLSX from 'xlsx';

interface Quiz {
  title: string,
  questions: Array<string>
}

export const QuizScreen: React.FC = () => {
  const quizes: Array<Quiz> = [{
    title: 'Quiz 1 Basic Programming',
    questions: ['Question 1: Thing to know', 'Question 2: Hello World', 'Question 3: What is Java']
  }, {
    title: 'Quiz 2 Intermediate Programming',
    questions: ['Question 1: Hard Question', 'Question 2: Hello World 2', 'Question 3: What is Java 2']
  }, {
    title: 'Quiz 3 Advanced Programming',
    questions: ['Question 1: How to', 'Question 2: Hello World 3', 'Question 3: What is coding']
  }];
  const [ open, _setOPen ] = useState<Array<Array<boolean>>>(quizes.map(quiz => { 
    return Array.from({length: quiz.questions.length + 1}, () => false);
  }));
  function toggle(row: number, col: number) {
    open[row][col] = !open[row][col];
    _setOPen(open.slice());
  }

  return (
    <div style={{marginLeft:10}}>
      <h3>Quiz List</h3>

      {
        quizes.map((quiz, row) => (
          <div className="quizcard" key={`row-${row}`} >
            <h5 className="edit"><i className="fa fa-pencil"></i></h5>
            <h4 onClick={() => toggle(row, 0)} className="quizlist">
              {quiz.title}
            </h4>
            <Collapse in={open[row][0]}>
              {
                <div style={{marginLeft:30}}>
                  {quiz.questions.map((question, col) => (
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

      <div className="floatbuttonArea">
        <ImportExcelToCourse name="CSC100 Tutorial Course"/>
      </div>
    </div>
  );
}

function ImportExcelToCourse(props:any){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return(
    <div>
      <button className="floatbutton" onClick={handleShow}><i className="fa fa-download"></i>Import</button>
      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Import quiz result</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <form>
            <label>Course</label><br/>
            <input list="courselist" name="course" value={props.name} style={{width:250}}/><br/>
            <CourseDataList/>
            <ImportExcel/>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleClose}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function CourseDataList() {
  //for course input with dropdown 
  return ( 
    <datalist id="courselist">
      <option value="CSC100 Tutorial Course"/>
      <option value="CSC101 Advanced Tutorial Course"/>
      <option value="CSC102 Python Programming"/>
    </datalist>
  );
}

function ImportExcel(props: any) {
  return (
    <div>
      <input type="file" id="fileUpload" onChange={Upload}/>
    </div>
  );   
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
    } else {
      console.log("This browser does not support HTML5.");
    }
  } else {
    console.log("Please upload a valid Excel file.");
  }
}

function processExcel(data:any) {
  const workbook = XLSX.read(data, {type: 'binary'});
  const firstSheet = workbook.SheetNames[0];
  const excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
  console.log(excelRows);
}
