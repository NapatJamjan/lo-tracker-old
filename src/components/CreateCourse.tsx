import React, { useState } from 'react';
import { Modal, ModalTitle, ModalBody, ModalFooter, Button } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
export default function CreateCourse(){
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(<div>
       <button className="floatbutton" onClick={handleShow} style={{position:"absolute",right:25,bottom:25}}>
           <i className="fa fa-plus-square"></i>Course
        </button>
  
    <Modal show={show} onHide={handleClose}>
      <ModalHeader closeButton>
        <ModalTitle>Create a new course</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form>
        <label>Course Name</label><br/>
        {/* <input type="text" id="username" style={{width:250}}/><br/> */}
        <input list="courselist" name="course"style={{width:250}}/><br/>
        <CourseDataList/>
        <label>Program</label><br/>
        <input type="text" id="username" style={{width:250}}/><br/>
        <div style={{display:"inline-block",marginRight:50}}>
        <label>Semester</label><br/>
        <select name="1" id="sort">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="Summer">Summer</option>
        </select><br/>
        </div>
        <div style={{display:"inline-block"}}>
        <label>Year</label><br/>
        <input type="number" id="username" placeholder="2021" style={{width:100}}/>
        </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={handleClose}>Confirm</Button>
      </ModalFooter>
    </Modal>
    </div>
    )
}

function CourseDataList(){
  //for course input with dropdown 
  return( 
    <datalist id="courselist">
        <option value="CSC100 Tutorial Course"/>
        <option value="CSC101 Advanced Tutorial Course"/>
        <option value="CSC102 Python Programming"/>
    </datalist>
  )
}
