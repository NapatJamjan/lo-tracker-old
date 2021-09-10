import { Link } from 'react-router-dom';
import CreateCourse from '../components/CreateCourse';

export default function HomeScreen() {
  return (
    <div className="App">
      <Link to="/login">
        <button style={{float:"right",position:"absolute",right:10,top:10}}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" width="30" alt=""></img>
        </button>
      </Link>
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
      <CreateCourse/>
    </div>
  );
};

function CourseCard(){
  return (
    <div className="coursecard">
      <h3 style={{textAlign:'left'}}>Semester 1/2021</h3>
      <ul className="courselist">
        <Link to={`/course/0/`}>
          <li>
            CSC100 Tutorial Course
            <span className="lastupdate">updated 5/9/2021</span>
          </li>
        </Link>
        <Link to={`/course/1/`}>
          <li>
            CSC101 Advanced Tutorial Course
            <span className="lastupdate">updated 1/9/2021</span>
          </li>
        </Link>
        <Link to={`/course/2/`}>
          <li>
            CSC102 Python Programming
            <span className="lastupdate">updated 25/8/2021</span>
          </li>
        </Link>
      </ul> 
    </div>
  );
}

