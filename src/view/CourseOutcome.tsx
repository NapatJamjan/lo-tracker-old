import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { ImportExcelToCourse } from '../App';
import './CourseOutcome.css';
function CourseOutcomeOld(){
    return(<div>
        <h2>Course Outcome</h2>
    </div>)
}

function CourseOutcome(props:any){
    
    return(<div>
        <h3>Exam List</h3>
        <ExamCard name="PLO1 : Programming Knowledge"/>
        <ExamCard name="PLO2 : Test"/>
        <ExamCard name="PLO3 : Test"/>

        <div className="floatbuttonArea">
        {/* <button className="floatbutton">Import</button> */}
        <ImportExcelToCourse name="CSC100 Tutorial Course"/>
        </div>
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
            <Level name="LO1 : Basic Java"></Level>
            <Level name="LO2 : Advanced Java"></Level>
            <Level name="LO3 : Python Programming"></Level>
        </div>
        </Collapse>
        
    </div>)
}

function Level(props:any){
    const [open, setOpen] = useState(false);
    return(<div>
        <h6 onClick={() => setOpen(!open)} className="questionlist">{props.name}</h6>
        <Collapse in={open}>
            <div className="question">
                <p>Level 1 : Can Understand Java</p>
                <p>Level 2 : Hello World</p>
                <p>Level 3 : Loop and Conditional</p>
            </div>
        </Collapse>

    </div>)

}

export default CourseOutcome;