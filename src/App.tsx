import './App.css';
import { Switch, Route } from 'react-router-dom';
import { HomeScreen, LoginScreen, CourseScreen } from './pages';

//Home Page and login
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <HomeScreen/>
        </Route>
        <Route path="/login">
          <LoginScreen/>
        </Route>
        <Route path="/course/:id">
          <CourseScreen/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
