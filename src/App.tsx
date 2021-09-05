import React, { useState, useReducer, useEffect } from 'react';
import { Navbar } from 'react-bootstrap';
import './App.css';
import CourseMainBody from './view/CourseMain';
import {Switch,Route, Link} from 'react-router-dom';
//npm install

//Home Page and basic
function App() {
  return (
    <div className="App">
      <Nav/>
      <body>
        {/* <TopBar/> */}
      <Switch>
        <Route exact path="/"> {/*change back later*/}
          <LoginScreen />
        </Route>
        <Route exact path="/home">
          <Body />
        </Route>
        <Route path="/course">
          <CourseMainBody />
        </Route>
      </Switch>
    </body>
    </div>
  );
}

function Body(){
  return (
  <div className="App">
    <h1 style={{fontSize:60}}>LO Tracker</h1>
    <div style={{display:"inline-block"}}>
      <input type="text" id="search" style={{height:25}}></input>🔎
      
      <select name="Date" id="sort" style={{margin:30}}>
        <option value="Date">Date</option>
        <option value="Name">Name</option>
        <option value="Newest">Newest</option>
      </select>
    </div>
    <CourseCard/>
    <CourseCard/>
  </div>
  )
}

function CourseCard(){
  return(
    <div className="coursecard">
      <h3 style={{textAlign:'left'}}>Semester 1/2021</h3>
      <ul className="courselist">
        <a href="/course/:id"><li>CSC100 Tutorial Course</li></a>
        <a href="/course/:id"><li>CSC101 Advanced Tutorial Course</li></a>
        <a href="/course/:id"><li>CSC102 Python Programming</li></a>
      </ul> 

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

function LoginScreen(){
  return(
    <div className="formbox">
      <h1 style={{fontSize:60,textAlign:"center"}}>LO Tracker</h1>
      <h2>Login</h2>
        <form action="/home" >
          <label className="label">Username</label><br/>
          <input type="text" id="fname" name="fname"/><br/>
          <label className="label">Password</label><br/>
          <input type="text" id="fname" name="fname"/><br/><br/>
          
          <input type="submit" value="Enter" style={{width:100}}/>
        </form>
    </div>
  )
}


export default App;
