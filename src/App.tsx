import React from 'react';
import { Navbar } from 'react-bootstrap';
import './App.css';
import CourseMainBody from './view/CourseMain';
import {BrowserRouter as Router,Switch,Route, Link} from 'react-router-dom';
//npm install

//Home Page and basic
function App() {
  return (
    <div className="App">
      <Header/>
      <Nav/>
      <body>
        <TopBar/>


      </body>

    <Router>
    <li>
        <Link to="/">Home</Link>
    </li>
    <li>
        <Link to="/Course">Course</Link>
    </li>

    <Switch>
      <Route exact path="/">
        <Body />
      </Route>
      <Route path="/course">
        <CourseMainBody />
      </Route>
    </Switch>
    </Router>
    </div>
  );
}

function Body(){
  return (
  <div>
    <h3>Course</h3>
    <h4>Semester 1/2020</h4>
  </div>
  )
}

function TopBar(){
  return (
  <div className="page-header header">
    <h3 style={{float:"left",position:"absolute",left:10}}>Icon Here</h3>
    <button style={{float:"right",position:"absolute",right:10}}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" width="30"></img>
    </button>
    <h3 style={{textAlign:"center"}}>Example Page Header</h3>
    
  </div>
  )
}

function Nav(){
  return <Navbar className="col-md-12 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky"></div>
            
            </Navbar>
}

function Header(){
  return(
    <head>
      
    </head>
  )
}

export default App;
