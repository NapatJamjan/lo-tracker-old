import React from 'react';
import { Table } from 'react-bootstrap';

export const StudentScreen: React.FC = () => {
  return (
    <div>
      <h2>Course Student</h2>
      <Table hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
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
      <td>{props.mail}</td>
      <td>{props.name}</td>
      <td><button>action</button></td>
    </tr>
  );
}
