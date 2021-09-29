import './App.css';
import { Switch, Route } from 'react-router-dom';
import { HomeScreen, LoginScreen, CourseScreen } from './pages';
import { useEffect } from 'react';
import { initData } from './shared/initialData';

//Home Page and login
function App() {
  useEffect(() => {
    initData();
  }, [])
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
