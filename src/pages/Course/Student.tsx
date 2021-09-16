import React from 'react';
import { Table } from 'react-bootstrap';
import { Link, } from 'react-router-dom';

export interface student{
  id:number,
  mail:string,
  name:string;
}

export const students:Array<student> = [{id:0,mail:"mail@mail.com",name:"Student Studying"},
{id:1,mail:"mail@moremail.com",name:"Student2 Studying2"},{id:2,mail:"std@student.mail",name:"std A"},
{id:3,mail:"mail@mail.com",name:"Student Studying"}]

export const StudentScreen: React.FC = () => {
  return (
    <div >
      <h2>Student</h2>
      <div style={{margin:"auto"}}>
      <Table striped bordered className="table" responsive="sm">
        <thead>
          <tr>
            {/* <th>ID <TableSort/></th> */}
            <th>Email <TableSort/></th>
            <th>Name <TableSort/></th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {students.map(std => (
            <tr>
              {/* <td>{std.id}</td> */}
              <td>{std.mail}</td>
              <td>{std.name}</td>
              <td>
                <Link to={`dashboard/${std.id}`}><button>Result</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
}

export function TableSort(props:any){
  return(
    <i className="fa fa-sort tableSort"></i>
  )
}
