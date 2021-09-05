import React, { useState, useReducer, useEffect, createContext, useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import './App.css';
import CourseMainBody from './view/CourseMain';
import {Switch, Route, Link, useParams, useRouteMatch, useHistory, Redirect } from 'react-router-dom';
//npm install

//Home Page and basic
//Router already defined in index
// this one for learning
function App() {
  const hist = useHistory();
  const goUser = () => hist.push("/user"); // func must be constant, like function a(){hist.push}
  return ( // provider should put in index
    <CounterProvider> 
    <div className="App">
      <Nav/>
      <body>
      <li>
          <Link to="/">Home</Link>
      </li>
      <li>
          <Link to="/user">User</Link>
      </li>
      <li>
          <Link to="/login">Login</Link>
      </li>
      <button onClick={goUser()}>Push User</button>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/user">
          <User/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
      </Switch>
    </body>
    </div>
    </CounterProvider>
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

function Nav(){
  return <Navbar className="col-md-12 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky"></div>
            
            </Navbar>
}

//learning stuff
//Global State
const CounterContext = createContext<CounterContent>({isSignedIn:()=>true,login:()=>{},logout:()=>{}});

interface CounterContent{
  isSignedIn:()=>boolean
  login:()=> void,
  logout:()=> void
}

interface CounterState{
  user:string|null
}

const CounterProvider: React.FC = ({children}) => { //({props}, will be {props.children})
  const [state,setState] = useState<CounterState>({user:null})
  const isSignedIn = () => state.user != null;
  const login = () => setState({user:'lol'});
  const logout = () => setState({user:null});
  return (
    <div>
      <CounterContext.Provider value={{isSignedIn,login,logout}}> {/* can use this 3 in provided*/}
        {children}
      </CounterContext.Provider>
    </div>
  )
}


function Home(){
  return(
    <div>
      Home
    </div>
  )
}

function User(){
  const {isSignedIn,logout} = useContext(CounterContext);
  const history = useHistory();
  useEffect(()=>{
    if(!isSignedIn()){
      history.push('login')
    }
  },[isSignedIn])
  return(
    <div>
      <button onClick={()=> logout()}>Logout Here</button>
    </div>
  )
}

function Login(){
  const {isSignedIn,login} = useContext(CounterContext);
  const history = useHistory();
  useEffect(()=>{
    if(isSignedIn()){
      history.push('user')
    }
  },[login])
  return(
    <div>
      Login
      <button onClick={()=> login()}>Login Here</button>
    </div>
  )
}

function AppTemp(){
  const{isSignedIn} = useContext(CounterContext);
  <Switch>
    <Route path='/user' render={()=> isSignedIn()?<User/>:<Redirect to="/login"/>}></Route>
  </Switch>
}

export default App;
