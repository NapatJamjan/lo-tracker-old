import React from 'react';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { student, students } from '../Student';
import {Chart} from './Chart';

export interface quizscore{
  id:number,
  score:string,
  detail:string;
}

export interface PLOscore{
  id:number,
  score:string,
  detail:string;
}

interface quizinfo{
  shortname:string, // first 6 letter of quiz name (Quiz n)
  maxscore:number
}

const Quizinfo:Array<quizinfo> = [{shortname:'Quiz 1',maxscore:5},{shortname:'Quiz 2',maxscore:10},{shortname:'Quiz 3',maxscore:10}]

export function ScoreTable (props:{score:Array<any>,tablehead:Array<string>,isIndividual:boolean}) {
    return(
      <div>
        <Chart/>
        <Table striped bordered hover className="table" style={{margin:0,width:"55%"}}>
          <thead>
            <tr>
              {props.tablehead.map(thdata => (<th>{thdata}</th>))}
            </tr>
          </thead>
          <tbody>
            {props.isIndividual === false &&  students.map(std => (
              <tr>
                <td><Linkedcol to={`dashboard/${std.id}`}>{std.mail}</Linkedcol></td>
                <td><Linkedcol to={`dashboard/${std.id}`}>{std.name}</Linkedcol></td>
                {props.score.map(scores =>(
                  <Overlay score={scores.score} detail={[scores.detail]}/>
                ))}
              </tr>)) || Quizinfo.map(qi => (
                <tr>
                  <td>{qi.shortname}</td>
                  <td>{qi.maxscore}</td>
                  <td>{qi.maxscore}</td>
                  {props.score.map(scores =>(
                  <Overlay score={scores.score} detail={[scores.detail]}/>
                ))}
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
  color:black;
`;
