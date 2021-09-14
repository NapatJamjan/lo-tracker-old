import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Modal, ModalTitle, ModalBody, ModalFooter, Button } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { ClassroomContext, CourseDetail } from '../shared/classroom';

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
        </select>
      </div>
      <CourseCard/>
      <CreateNewProgram/>
      <CreateNewCourse/>
    </div>
  );
};

function CreateNewProgram() {
  const { addProgram } = useContext(ClassroomContext);
  const { register, handleSubmit, setValue } = useForm();
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    if (!show) setValue('program', '');
  }, [show]);
  return (
    <div>
      <button className="floatbutton" onClick={() => setShow(true)} style={{position:"absolute",right:25,bottom:25}}>
        <i className="fa fa-pencil-square"></i>
        <span>Program</span>
      </button>
      <Modal show={show} onHide={() => setShow(false)}>
        <form onSubmit={handleSubmit((data) => {addProgram(data.program); setShow(false);})}>
          <ModalHeader>
            <ModalTitle>
              <span>Create a new course</span>
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <span>Program name:</span><br/>
            <input type="text" {...register('program')}/>
          </ModalBody>
          <ModalFooter>
            <input type="submit" value="create"/>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}

function CreateNewCourse() {
  const { programs, addCourse } = useContext(ClassroomContext);
  const { register, handleSubmit, setValue } = useForm<{
    program: string;
    name: string;
    semester: number;
    year: number;
  }>();
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    if (!show) setValue('name', '');
  }, [show]);
  return (
    <div>
      <button className="floatbutton" onClick={() => setShow(true)} style={{position:"absolute",right:100,bottom:25}}>
        <i className="fa fa-plus-square"></i>Course
      </button>
      <Modal show={show} onHide={() => setShow(false)}>
        <form onSubmit={handleSubmit((data) => {addCourse(data); setShow(false);})}>
          <ModalHeader>
            <ModalTitle>
              <span>Create a new course</span>
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <span>Program:</span><br/>
            <select {...register('program')}>
              {
                programs.map((program) => (<option value={program} key={`program-${program}`}>{program}</option>))
              }
            </select><br/>

            <span>Course name:</span><br/>
            <input {...register('name')}/><br/>

            <span>Semester:</span><br/>
            <select {...register('semester')}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>S</option>
            </select><br/>

            <span>Year:</span><br/>
            <select {...register('year')}>
              {
                Array.from({length: 10}, (_, i) => 2021 - i).map((year) => (<option value={year} key={`year-${year}`}>{year}</option>))
              }
            </select><br/>
          </ModalBody>
          <ModalFooter>
            <input type="submit" value="create"/>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}

function CourseCard(){
  const { courses } = useContext(ClassroomContext);
  if (courses.length === 0) {
    return (<div>No courses available.</div>);
  }
  let courseGroups = new Map<string, Array<CourseDetail>>();
  for (let i = 0; i < courses.length; ++i) {
    courseGroups.set(`${courses[i].semester},${courses[i].year}`, [...(courseGroups.get(`${courses[i].semester},${courses[i].year}`) || []), {...courses[i]}]);
  }
  courses.sort((course1, course2) => {
    if (course1.year !== course2.year) return course2.year - course1.year;
    if (course1.semester !== course2.semester) return course2.semester - course1.semester;
    if (course1.program !== course2.program) return course1.program.localeCompare(course2.program);
    return course1.name.localeCompare(course2.name);
  });
  return (
    <CourseDiv>
      {
        Array.from(courseGroups).sort((group1, group2) => {
          let [sem1, year1] = group1[0].split(',').map(parseInt);
          let [sem2, year2] = group2[0].split(',').map(parseInt);
          if (year1 === year2) return sem2 - sem1;
          return year2 - year1;
        }).map((group, index) => {
          let [semester, year] = group[0].split(',').map(val => parseInt(val, 10));
          let courseList: Array<CourseDetail> = group[1];
          return (
            <div key={`group-${group[0]}`}>
              <h3 style={{textAlign:'left'}}>Semester {semester}/{year}</h3>
              <ul className="courselist">
                {
                  courseList.sort((course1, course2) => {
                    if (course1.year !== course2.year) return course2.year - course1.year;
                    if (course1.semester !== course2.semester) return course2.semester - course1.semester;
                    if (course1.program !== course2.program) return course1.program.localeCompare(course2.program);
                    return course1.name.localeCompare(course2.name);
                  }).map((course) => (
                    <Link to={`/course/${course.id}`}>
                      <Courseli>
                        <span>{course.program} - {course.name}</span>
                        <CourseSpan>updated 9/14/2021</CourseSpan>
                      </Courseli>
                    </Link>
                  ))
                }
              </ul>
            </div>
          );
        })
      }
    </CourseDiv>
  );
}

const CourseDiv = styled.div`
  width: 25%;
  margin: auto;
  padding-bottom: 20px;
`;

const Courseli = styled.li`
  border-bottom: 3px solid;
`;

const CourseSpan = styled.span`
  color: grey;
  font-size: 10px;
  float: right;
  margin-top:12px;
`;