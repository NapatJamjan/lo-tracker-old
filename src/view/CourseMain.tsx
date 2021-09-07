import React, { useState } from 'react';
import { Button, Collapse, Navbar } from 'react-bootstrap';
import { Route, Link, Switch,useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { ImportExcelToCourse } from '../App';
import './CourseMain.css';
import CourseOutcome from './CourseOutcome';
import CourseStudent from './CourseStudent';
import CourseSummary from './CourseSummary';
//Quiz and course nav
function CourseMain(){
    const {path} = useRouteMatch();
    return (<div> 
        <TopBar/>
        <body className="course">
            <h4>CSC100 Tutorial Course</h4>
            <NavBar/>
            <Switch>
                <Route exact path={`${path}/`}>
                    <CourseQuiz/>
                </Route>
                <Route path={`${path}/outcome`}>
                    <CourseOutcome/>
                </Route>
                <Route path={`${path}/student`}>
                    <CourseStudent/>
                </Route>
                <Route path={`${path}/summary`}>
                    <CourseSummary/>
                </Route>
            </Switch>
        </body>
    </div>)
}

function TopBar(){
    return (
    <div className="page-header header">
      <Link to="/"><h3 style={{float:"left",position:"absolute",left:10}}>Home🏠</h3></Link>
      <a href="/login"><button style={{float:"right",position:"absolute",right:10,top:10}}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" width="30"></img>
      </button></a>
      <h3 style={{textAlign:"center"}}>LO-Tracker</h3>
      
    </div>
    )
  }
  
function NavBar(){
    const {path} = useRouteMatch();
    return(
        <ul className="navbar">
            {/* <li><Link to="./">Quiz</Link></li> */}
            <li><Link to={`${path}/`}>Quiz</Link></li>
            <li><Link to={`${path}/outcome`}>Outcome</Link></li>
            <li><Link to={`${path}/student`}>Student</Link></li>
            <li><Link to={`${path}/summary`}>Summary</Link></li>
            {/* <li><a href="/main">Home</a></li> */}
        </ul>
    )
}

function Nav(){
    return <Navbar className="col-md-12 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky"></div>
           </Navbar>
}


//Quiz List
function CourseQuiz(props:any){
    
    return(<div>
        <h3>Quiz List</h3>
        <QuizCard name="Quiz 1 Basic Programming"/>
        <QuizCard name="Quiz 2 Intermediate Programming"/>
        <QuizCard name="Quiz 3 Advanced Programming"/>

        <div className="floatbuttonArea">
        {/* <button className="floatbutton">Import</button> */}
        <ImportExcelToCourse name="CSC100 Tutorial Course"/>
        </div>
    </div>)
}

function QuizCard(props:any){
    const [open, setOpen] = useState(false);
    return(<div className="quizcard">
        <h5 className="edit"><i className="fa fa-pencil"></i></h5>
        <h4 onClick={() => setOpen(!open)} className="quizlist">
            {props.name}
        </h4>
        
        <Collapse in={open}>
        <div>
            <Question name="Question 1 : Thing to know"></Question>
            <Question name="Question 2 : Hello World"></Question>
            <Question name="Question 3 : What is Java"></Question>
        </div>
        </Collapse>
        
    </div>)
}

function Question(props:any){
    const [open, setOpen] = useState(false);
    return(<div>
        <h6 onClick={() => setOpen(!open)} className="questionlist">{props.name}</h6>
        <Collapse in={open}>
            <div className="question">
                <p>Max Score 5</p>
                <p style={{fontWeight:"bolder"}}>Linked LO : LO1(1) LO2(2,3) LO3(1)</p>
            </div>
        </Collapse>

    </div>)

}

export default CourseMain;