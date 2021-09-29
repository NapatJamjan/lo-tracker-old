import React, { useContext } from 'react';
import { useRouteMatch, Switch, Route, Link, Redirect, useParams } from 'react-router-dom';
import { QuizScreen } from './Quiz';
import { LOScreen } from './LO';
import { StudentScreen } from './Student';
import { DashboardScreen } from './Dashboard';
import NavigationBar from '../../components/Navbar';
import {IndividualScore} from './Dashboard/IndividualScore';
import { ClassroomContext } from '../../shared/classroom';

function SubNavBar() {
  const { url } = useRouteMatch();
  return (
    <ul style={{
      listStyleType: 'none',
      padding: '0',
      overflow: 'hidden',
      borderBottom: '1px black solid',
      justifyContent: 'start'
    }}>
      {[
        {path: '', title: 'Quiz'},
        {path: 'outcome', title: 'Outcome'},
        {path: 'student', title: 'Student'},
        {path: 'dashboard', title: 'Dashboard'}
      ].map((value) => {
        return (
          <li style={{fontSize: '18px', paddingRight: '5%', display: 'inline-block'}} key={value.title}>
            <Link to={`${url}/${value.path}`} style={{textAlign: 'center', textDecoration: 'none'}}>
              {value.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function CourseScreen() {
  const { path } = useRouteMatch();
  const params = useParams<{ id: string }>();
  const { courses } = useContext(ClassroomContext);
  return (
    <div>
      <NavigationBar/>
      <div className="course">
        <h4>{(courses.find(e => e.id == params.id))?.name}</h4>
        <SubNavBar/>
        <Switch>
          <Route exact path={path}>
            <QuizScreen/>
          </Route>
          <Route path={`${path}/outcome`}>
            <LOScreen/>
          </Route>
          <Route path={`${path}/student`}>
            <StudentScreen/>
          </Route>
          <Route exact path={`${path}/dashboard`}>
            <DashboardScreen/>
          </Route>
          <Route path={`${path}/dashboard/:id`}>
            <IndividualScore/>
          </Route>
          <Redirect from={`${path}//*`} to={`${path}/*`} />
        </Switch>
      </div>
    </div>
  );
};
