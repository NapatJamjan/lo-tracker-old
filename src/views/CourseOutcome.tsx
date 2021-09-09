import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import './CourseOutcome.css';

function CourseOutcome(props:any){
    
    return(<div>
        <h3>Learning Outcome</h3>
        <QuizCard name="PLO1 : Programming Knowledge"/>
        <QuizCard name="PLO2 : Test Outcome"/>
        <QuizCard name="PLO3 : Test Outcome"/>

    </div>)
}

function QuizCard(props:any){
    const [open, setOpen] = useState(false);
    return(<div className="quizcard">
        <h5 className="edit"><i className="fa fa-pencil"></i></h5>
        <h4 onClick={() => setOpen(!open)} className="quizlist">
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
                <p>Level 1 : Understand Java</p>
                <p>Level 2 : Hello World</p>
                <p>Level 3 : Loop and Conditional</p>
            </div>
        </Collapse>

    </div>)

}

export default CourseOutcome;