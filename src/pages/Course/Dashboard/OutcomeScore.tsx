import React from 'react';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { student } from '../Student';
import {Chart} from './Chart';

export const OutcomeScore:React.FC = (props) => {
  const students:Array<student> = [{id:0,mail:"mail@mail.com",name:"Student Studying"},
    {id:1,mail:"mail@moremail.com",name:"Student2 Studying2"},{id:2,mail:"std@student.mail",name:"std A"},
    {id:3,mail:"mail@mail.com",name:"Student Studying"}]
    return(
      <div>
        <Chart/>
        <Table striped bordered hover className="table" style={{margin:0,width:"55%"}}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>PLO1</th>
              <th>PLO2</th>
              <th>PLO3</th>
            </tr>
          </thead>
          <tbody>
            {students.map(std => (
              <tr>
                <td><Linkedcol to={`dashboard/${std.id}`}>{std.mail}</Linkedcol></td>
                <td><Linkedcol to={`dashboard/${std.id}`}>{std.name}</Linkedcol></td>
                <Overlay score="100%" detail={"LO1 100% \n LO2 100% \n LO3 100%"}/>
                <Overlay score="80%" detail={"LO2 90% \n LO3 70%"}/>
                <Overlay score="-" detail={"No score"}/>
              </tr>
            ))}
          </tbody>
        </Table>
        
      </div>
    )
}

function Overlay(props:any){
  return(
    <td>
      <OverlayTrigger placement="auto-start" overlay={HoverText({detail:props.detail})} 
        delay={{show:50,hide:100}}>
        <p>{props.score}</p>
      </OverlayTrigger>
    </td>
  )
}

const HoverText = (props:any) =>(
    <Tooltip {...props}>
      <p style={{whiteSpace:"pre-line"}}>{props.detail}</p>
    </Tooltip>
);

const Linkedcol = styled(Link)`
  text-decoration:none;
`;