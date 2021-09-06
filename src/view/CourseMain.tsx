import React, { useState } from 'react';
import { Button, Collapse, Navbar } from 'react-bootstrap';
import { Route, Link, Switch,useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import './CourseMain.css';
import CourseOutcome from './CourseOutcome';
import CourseStudent from './CourseStudent';
import CourseSummary from './CourseSummary';
//Exam/Quiz is in here
function CourseMain(){
    const {path} = useRouteMatch();
    return (<div> 
        <TopBar/>
        <body className="course">
            <h4>CSC100 Tutorial Course</h4>
            <NavBar/>
            <Switch>
                <Route exact path={`${path}/`}>
                    <CourseExam/>
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
            {/* <li><Link to="./">Exam</Link></li> */}
            <li><Link to={`${path}/`}>Exam</Link></li>
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


//Exam List
function CourseExam(props:any){
    
    return(<div>
        <h3>Exam List</h3>
        <ExamCard name="Exam 1 Basic Programming"/>
        <ExamCard name="Exam 2 Intermediate Programming"/>
        <ExamCard name="Exam 3 Advanced Programming"/>
    </div>)
}

function ExamCard(props:any){
    const [open, setOpen] = useState(false);
    return(<div className="examcard">
        <h4 onClick={() => setOpen(!open)} className="examlist">
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