import React, { useContext, useEffect, useState } from 'react';
import { Button, Collapse, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import styled from 'styled-components';
import { LOContext } from '../../shared/lo';
import { EditIcon, Quizlist } from './Quiz';
type ID = string;
type LearningOutcomeMap = Map<ID, LearningOutcome>;

interface LearningOutcome {
  title: string,
  subLO: LearningOutcomeMap
  depth:number
}

export const PLOScreen: React.FC = () => {
  const PLOs: LearningOutcomeMap = new Map([
    ["ab201ksdn1", {
      title: "PLO1 Programming Knowledge", 
      subLO: new Map([
        ["ab201ksdo1", {title: "LO1 : Basic Java", subLO: new Map([
          ["ab201ksep1", {title: "Level1 Hello World", subLO: new Map(),depth:2}],
          ["ab201ksfp1", {title: "Level2 Conditional and Loop", subLO: new Map(),depth:2}],
        ]),depth:1}],
        ["ab201ksdp1", {title: "LO2 : C#", subLO: new Map([
          ["ab201ksep1", {title: "Level1", subLO: new Map()}],
          ["ab201ksfp1", {title: "Level2", subLO: new Map()}],
          ["ab201ksgp1", {title: "Level3", subLO: new Map()}],
        ]),depth:1}],
        ["ab201ksdq1", {title: "LO3 : Python Programming", subLO: new Map(),depth:1}]
      ]),depth:0}],
    ["ab201ksdn2", {title: "PLO2", subLO: new Map(),depth:0}],
    ["ab201ksdn3", {title: "PLO3", subLO: new Map([
      ["ab201ksdo3", {title: "LO1", subLO: new Map(),depth:1}]
    ]),depth:0}],
  ]);
  return (
    <div >
      <h3>Learning Outcome</h3>
      <div style={{width:775,marginLeft:10}}>
      <RecursiveCollapseList data={PLOs} ></RecursiveCollapseList>
      <EditIcon><i className="fa fa-plus-circle" style={{fontSize:28,marginTop:10}}></i></EditIcon>
      <ManageLO/>
      </div>
    </div>
  );
};

const RecursiveCollapseList: React.FC<{data: LearningOutcomeMap}> = ({ data }) => {
  const ids: Array<ID> = Array.from(data.keys());
  const [open, setOpen] = useState<Array<boolean>>(Array.from({length: ids.length}, () => false));
  function toggle(index: number) {
    if (!hasChildren(ids[index])) return;
    open[index] = !open[index];
    setOpen(open.slice());
  }
  function hasChildren(id: ID) {
    return (data.get(id)?.subLO?.size ?? 0) > 0;
  }
  return (
    <div>
      {ids.map((id, index) => {
          return (
            <div key={id} >
              <EditIcon><i className="fa fa-pencil"></i></EditIcon>
              <Quizlist onClick={() => toggle(index)}>
                {data.get(id)?.title}
              </Quizlist>
              <Collapse in={open[index]}>
                <div style={{marginLeft:30}}>
                  <RecursiveCollapseList data={data.get(id)?.subLO ?? new Map()}></RecursiveCollapseList>
                </div>
              </Collapse>
            </div>
          );
        })}
    </div>
  );
}

//Manage LO
function ManageLO(){
  const [show,setShow] = useState(false);
  return(<div>
    <button className="floatbutton" onClick={()=>{setShow(true)}} style={{position:"absolute",right:25,bottom:25}}>
      <b style={{fontSize:14}}>LO</b> <span>Manage</span>
    </button>
  <Modal show={show} onHide={()=>{setShow(false)}}>
    <ModalHeader >
      <ModalTitle>Manage Learning Outcome</ModalTitle>
    </ModalHeader>
    <ModalBody>
      <form>
        <LOCard/>
        <p style={{marginBottom:25}}><RightButton className="fa fa-plus-circle"></RightButton></p>
      </form>
    </ModalBody>
    <ModalFooter>
      <Button variant="primary" onClick={()=>{setShow(false)}}>Save</Button>
    </ModalFooter>
  </Modal>
  </div>
  )
}

function LOCard(props:any){
  const {los} = useContext(LOContext)
  const [ open, _setOpen ] = useState<Array<Array<boolean>>>(los.map(lo => { 
    return Array.from({length: lo.level.length + 1}, () => false);}));
  useEffect(() => {
    open.push(Array.from({length:los[los.length-1].level.length+1}, () => false))
  }, [los]);
  function toggle(row: number, col: number) {
    open[row][col] = !open[row][col];
    _setOpen(open.slice());
  }
  return (
    <div>
      {los.map((lo, row) => (
          <CardDiv key={`row-${row}`}>
            <div style={{display:"flex"}}>
            <i className="fa fa-angle-down" onClick={() => toggle(row, 0)} style={{fontSize:28}}></i>
            <h5 style={{marginBottom:3,paddingRight:5}} contentEditable="true">
              {lo.name}
            </h5>
            <RightButton className="fa fa-window-close-o"></RightButton>
            </div>
            <Collapse in={open[row][0]}>{
              <div style={{marginLeft:28}}>
                {lo.level.map((lvl, col) => (
                  <div key={`row-${row}-col-${col}`}>
                    <div style={{display:"flex"}}>
                    <p onClick={() => toggle(row, col + 1)} style={{marginBottom:-3,paddingRight:5}} contentEditable="true">
                      {lvl}
                    </p>   
                    <LevelRightButton className="fa fa-window-close-o" ></LevelRightButton>
                    </div>
                  </div>
                ))}
              <p><LevelRightButton className="fa fa-plus-circle"></LevelRightButton></p>
              </div>
            }</Collapse>
          </CardDiv>
        ))}
    </div>
)}

//MangeLO
const CardDiv = styled.div`
  border-bottom: grey 0.5px solid;
  margin-bottom: 10px;
  overflow: hidden;
`;

const RightButton = styled.i`
  position:absolute;
  right:15px;
  text-align:center;
  font-size: 24px;
`;

const LevelRightButton = styled.i`
  position:absolute;
  right:19px;
  text-align:center;
  font-size: 16px;
`;
