import React from 'react';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { student, students, TableSort } from '../Student';
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

interface tablehead{
  shortname:string,
  maxscore:number
}

const Quizinfo:Array<tablehead> = [{shortname:'Quiz 1',maxscore:5},{shortname:'Quiz 2',maxscore:10},{shortname:'Quiz 3',maxscore:10}]
const PLOinfo:Array<tablehead> = [{shortname:'PLO 1',maxscore:100},{shortname:'PLO 2',maxscore:100},{shortname:'PLO 3',maxscore:100}]

export function ScoreTable (props:{score:Array<any>,tablehead:Array<string>,isIndividual:boolean,chartType:string}) {
  let TableheadInfo = []
  if(props.tablehead[0] =='PLO'){TableheadInfo = PLOinfo}
  else{TableheadInfo = Quizinfo}
    return(
      <div>
        <Chart/>
        <Table striped bordered hover className="table" style={{margin:0,width:"55%"}}>
          <thead>
            <tr>
              {props.tablehead.map(thdata => (<th>{thdata}<TableSort/></th>))}
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
              </tr>)) ||  TableheadInfo.map(qi => ( //individual page
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
