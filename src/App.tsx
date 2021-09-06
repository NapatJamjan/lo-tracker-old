import React, { useState, useReducer, useEffect } from 'react';
import './App.css';
import CourseMain from './view/CourseMain';
import {Switch,Route, Link, Redirect} from 'react-router-dom';
import styled from 'styled-components';
//npm install

//Home Page and login
function App() {
  return (
    <div className="App">
      {/* <Nav/> */}
      <div>
      </div>
      <body>
      <Switch>
        <Route exact path="/">
          <Body />
        </Route>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <Route path="/course/:id">
          <CourseMain/>
        </Route>
      </Switch>
    </body>
    </div>
  );
}

function Body(){
  return (
  <div className="App">
    <ActionButtons/>
    {/*button for going to see login screen, same one as in course topbar*/}
      <Link to="/login"><button style={{float:"right",position:"absolute",right:10,top:10}}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" width="30"></img>
      </button></Link>
    <h1 style={{fontSize:60,paddingTop:20}}>LO Tracker</h1>
    <div style={{display:"inline-block"}}>
      <input type="text" id="search" placeholder="Search here" style={{height:25}}></input>🔎
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
        <a href="/course/1/"><li>CSC100 Tutorial Course</li></a>
        <a href="/course/2/"><li>CSC101 Advanced Tutorial Course</li></a>
        <a href="/course/3/"><li>CSC102 Python Programming</li></a>
      </ul> 

    </div>
  )
}

function ActionButtons(){
  return(
    <div className="floatbuttonArea">
      <button>H1</button>
      <button>H2</button>
    </div>
  )
}

//Login

function LoginScreen(){
  return(
    <div className="formbox">
      <h1 style={{fontSize:60,paddingTop:20}}>LO Tracker</h1>
      <h2>Login</h2>
        <form action="./">
          <label>Username</label><br/>
          <input type="text" id="username" style={{width:250}}/><br/>
          <label>Password</label><br/>
          <input type="text" id="password" style={{width:250}}/><br/><br/>
          <Link to="/" replace style={{paddingRight:"80px"}}>
            <input type="submit" value="Register" style={{width:100,background:"lightgrey"}}/>
          </Link>
          <Link to="/" replace>
            <input type="submit" value="Login" style={{width:100,background:"lightgreen"}}/>
          </Link>
          
        </form>
    </div>
  )
}

export default App;

