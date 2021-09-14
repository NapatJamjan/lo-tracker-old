import React from 'react';
import { Table } from 'react-bootstrap';

export const StudentScreen: React.FC = () => {
  return (
    <div>
      <h2>Course Student</h2>
      <Table striped bordered className="table" responsive="sm">
        <thead>
          <tr style={{whiteSpace:"nowrap"}}>
            <th>Email <i className="fa fa-sort tableSort"></i></th>
            <th>Name  <i className="fa fa-sort tableSort"></i></th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <Student mail="mail@mail.com" name="Student A"/>
          <Student mail="moremail@mail.com" name="Student Studying"/>
          <Student mail="moremail@mail.com" name="Student Studying"/>
          <Student mail="moremail@mail.com" name="Student Studying"/>
        </tbody>
      </Table>
    </div>
  );
}

function Student(props:any){
  return (
    <tr>
      <td>{props.mail}{/*<span style={{padding:30}}></span>*/}</td>
      <td>{props.name}</td>
      <td><button style={{marginRight:25}}>Score</button><button>PLO</button></td>
    </tr>
  );
}
