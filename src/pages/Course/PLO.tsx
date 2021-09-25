import React, { useContext, useEffect, useState } from 'react';
import { Button, Collapse, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { LOContext, LODetail } from '../../shared/lo';
import { CardDiv, EditIcon, LeftCheckbox, Quizlist } from './Quiz';
type ID = string;
type LearningOutcomeMap = Map<ID, LearningOutcome>;

interface LearningOutcome {
  title: string,
  subLO: LearningOutcomeMap,
  depth: number
}

export const PLOScreen: React.FC = () => {
  const { los } = useContext(LOContext)
  const PLOs: LearningOutcomeMap = new Map([
    ["ab201ksdn1", {
      title: "PLO1 Programming Knowledge", 
      subLO: new Map([
        ["ab201ksdo1", {title: los[0].name, subLO: new Map([
          ["ab201ksep1", {title: los[0].level[0], subLO: new Map(), depth: 2}],
          ["ab201ksfp1", {title: los[0].level[1], subLO: new Map(), depth: 2}],
        ]), depth: 1}],
        ["ab201ksdp1", {title: "LO2 : C#", subLO: new Map([
          ["ab201ksep1", {title: "Level1", subLO: new Map()}],
          ["ab201ksfp1", {title: "Level2", subLO: new Map()}],
          ["ab201ksgp1", {title: "Level3", subLO: new Map()}],
        ]), depth: 1}],
        ["ab201ksdq1", {title: "LO3 : Python Programming", subLO: new Map(), depth: 1}]
      ]), depth: 0}],
    ["ab201ksdn2", {title: "PLO2", subLO: new Map(), depth: 0}],
    ["ab201ksdn3", {title: "PLO3", subLO: new Map([
      ["ab201ksdo3", {title: "LO1", subLO: new Map(), depth: 1}]
    ]), depth: 0}],
  ]);
  return (
    <div>
      <h3>Learning Outcome</h3>
      <div style={{width: 775, marginLeft: 10}}>
        <RecursiveCollapseList data={PLOs} ></RecursiveCollapseList>
        <EditIcon><i className="fa fa-plus-circle" style={{fontSize: 28, marginTop: 10}}></i></EditIcon>
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
              {data.get(id)?.depth === 0 && <LinkLOtoPLO plo={data.get(id)?.title}/>}
              <Quizlist onClick={() => toggle(index)}>
                {data.get(id)?.title}
              </Quizlist>
              <Collapse in={open[index]}>
                <div style={{marginLeft: 30}}>
                  <RecursiveCollapseList data={data.get(id)?.subLO ?? new Map()}></RecursiveCollapseList>
                </div>
              </Collapse>
            </div>
          );
        })}
    </div>
  );
}

//Manage LO, create update delete lo and its level
function ManageLO(){
  const [show, setShow] = useState(false);
  const { register, handleSubmit, setValue } = useForm<{loDetail: LODetail, fileType: string}>();
  const { los } = useContext(LOContext)
  const [open, _setOpen] = useState<Array<Array<boolean>>>(los.map(lo => { 
    return Array.from({length: lo.level.length + 1}, () => false);
  }));
  const [loDetail, _setDetail] = useState(los)

  useEffect(() => {
    open.push(Array.from({length: los[los.length-1].level.length + 1}, () => false))
  }, [los]);
  function toggle(row: number, col: number) {
    open[row][col] = !open[row][col];
    _setOpen(open.slice());
  }

  return(<div>
    <button className="floatbutton" onClick={() => setShow(true)} style={{position: "absolute", right: 25, bottom: 25}}>
      <b style={{fontSize: 14}}>LO</b> <span>Manage</span>
    </button>
    <Modal show={show} onHide={() => setShow(false)}>
    <form>
      <ModalHeader>
        <ModalTitle>Manage Learning Outcome</ModalTitle>
      </ModalHeader>
        <ModalBody>
          <div>
            {los.map((lo, row) => (
              <CardDiv key={`row-${row}`}>
                <div style={{display: "flex"}}>
                  <i className="fa fa-angle-down" onClick={() => toggle(row, 0)} style={{fontSize: 28}}></i>
                  <LOEdit style={{marginBottom: 3, paddingRight: 5}} defaultValue={lo.name} key={`lo` + lo.id}/>
                  <RightButton className="fa fa-window-close-o"></RightButton>
                </div>
                <Collapse in={open[row][0]}>{
                  <div style={{marginLeft: 28}}>
                    {lo.level.map((lvl, col) => (
                      <div key={`row-${row}-col-${col}`}>
                        <div style={{display: "flex"}}>
                          <LOEdit onClick={() => toggle(row, col + 1)} style={{marginBottom: -3, paddingRight: 5}}
                            defaultValue={lvl}/>
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

          <p style={{ marginBottom: 25 }}><RightButton className="fa fa-plus-circle"></RightButton></p>
        </ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={() => setShow(false)}>Save</Button>
      </ModalFooter>
      </form>
    </Modal>
  </div>
  )
}

function LinkLOtoPLO(props:any) {
  const [show, setShow] = useState(false);
  const { los } = useContext(LOContext)
  return(<div>
    <EditIcon><i className="fa fa-pencil" onClick={() => setShow(true)}></i></EditIcon>
    <Modal show={show} onHide={() => setShow(false)}>
    <form>
      <ModalHeader>
        <ModalTitle>Manage PLO</ModalTitle>
      </ModalHeader>
        <ModalBody>
          <div>
            <p style={{marginBottom: 0}}>Selected PLO (edit title here)</p>
            <input type="text" defaultValue={props.plo} style={{width: "75%", marginBottom: 10}}/>
            {los.map((lo) => (
              <CardDiv style={{border: 'none'}}>
                <div style={{display: "flex"}}>
                <LeftCheckbox />
                  <h6 style={{marginBottom: 3}}>
                    {lo.name}
                  </h6>
                </div>
              </CardDiv>
            ))}
          </div>
        </ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={() => setShow(false)}>Save</Button>
      </ModalFooter>
      </form>
    </Modal>
  </div>)
}

//MangeLO
const LOEdit = styled.input.attrs({
  type:'text'
})`
  border: none;
  background: transparent;
  width: 90%;
`;

const RightButton = styled.i`
  position: absolute;
  right: 15px;
  text-align: center;
  font-size: 24px;
`;

const LevelRightButton = styled.i`
  position: absolute;
  right: 19px;
  text-align: center;
  font-size: 16px;
`;