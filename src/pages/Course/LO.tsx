import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Collapse, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { courseResponse, loResponse, programResponse } from '../../shared/initialData';
import { LOContext, LODetail } from '../../shared/lo';
import { BorderlessInput } from '../Home';
import { CardDiv, EditIcon, LeftCheckbox, Quizlist } from './Quiz';
type ID = string;
type LearningOutcomeMap = Map<ID, LearningOutcome>;

interface LearningOutcome {
  title: string,
  subLO: LearningOutcomeMap,
  depth: number
}

export const LOScreen: React.FC = () => {
  const [los, _setLos] = useState<Array<loResponse>>([]);
  const [open, _setOpen] = useState<Array<boolean>>([]);
  useEffect(() => {
    const api = axios.create({baseURL: `http://localhost:8000/api`}); 
      ( async () => {
        let res1 = await api.get<programResponse[]>('/programs');
        let res2 = (await api.get<courseResponse[]>('/courses', {params: {programID: res1.data[0].programID}}));
        let res3 = await api.get<loResponse[]>('/los', {params: {courseID: res2.data[0].courseID} });
        _setLos(res3.data);
        _setOpen(Array.from({length:res3.data.length}, () => false))
      }) ()
  },[])
  console.log("h",los[0]?.levels.length)
  function toggle(i: number) {
    open[i] = !open[i];
    _setOpen(open.slice());
  }

  return (
    <div>
      <h3>Learning Outcome</h3>
      <div style={{width: 775, marginLeft: 10}}>
        {los.map((lo, row) => (
          <LOcard>
            <EditLO target={lo}/>
            <LOlist onClick={() => toggle(row)}>{lo.info}</LOlist>
            <Collapse in={(open[row]) || false}>{
              <div style={{ marginLeft: 28 }}>
                {lo.levels.map((lvl, col) => (
                  <div key={`row-${row}-col-${col}`}>
                    <div style={{ display: "flex" }}>
                      <LOlevel>Level {lvl.level} {lvl.info}</LOlevel>
                      <EditButton className="fa fa-pencil" style={{fontSize:18}}></EditButton>
                    </div>
                  </div>
                ))}
                <EditButton className="fa fa-plus" style={{fontSize:18}}></EditButton>
              </div>
            }</Collapse>
            <AddLO/>
          </LOcard>
        ))}
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
  function hasChildren(id: ID) { return (data.get(id)?.subLO?.size ?? 0) > 0; }
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
function AddLO(){
  const [show, setShow] = useState(false);
  const { los, updateLo } = useContext(LOContext)
  const [loDetail, _setDetail] = useState(los.slice())
  const { register, handleSubmit, setValue } = useForm<{info: string, lvlInfo: string}>();
  const [loDetail2, _setDetail2] = useState<Array<loResponse>>([]);
  useEffect(() => {
    const api = axios.create({baseURL: `http://localhost:8000/api`}); 
      ( async () => {
        let res1 = await api.get<programResponse[]>('/programs');
        let res2 = (await api.get<courseResponse[]>('/courses', {params: {programID: res1.data[0].programID}}));
        let res3 = await api.get<loResponse[]>('/los', {params: {courseID: res2.data[0].courseID} });
        _setDetail2(res3.data);
      }) ()
  },[])

  return(<div>
    <button className="floatbutton" onClick={() => setShow(true)} style={{position: "absolute", right: 25, bottom: 25}}>
      <b style={{fontSize: 14}}>LO</b> <span>Manage</span>
    </button>
    <Modal show={show} onHide={() => setShow(false)}>
    <form>
      <ModalHeader>
        <ModalTitle>Create a new Learning Outcome</ModalTitle>
      </ModalHeader>
        <ModalBody>
          <div>
            <label>LO Title</label><br/>
            <input type="text" {...register('info')} required /><br/>
            <label>Level 1 Title</label><br/>
            <input type="text" {...register('lvlInfo')} required /><br/>
            <p>(more level can be added later)</p>
          </div>
        </ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={() => {setShow(false); updateLo(loDetail)}}>Create</Button>
      </ModalFooter>
      </form>
    </Modal>
  </div>
  )
}

function EditLO(props:{target:loResponse}) {
  const [show, setShow] = useState(false);
  return(<div>
    <EditButton className="fa fa-pencil" onClick={() => setShow(true)}></EditButton>
        <Modal show={show} onHide={() => setShow(false)}>
        <form>
          <ModalHeader>
            <ModalTitle>Manage Learning Outcome</ModalTitle>
          </ModalHeader>
            <ModalBody>
              <div>
                <h4>Target : {props.target.info}</h4>
              </div>
            </ModalBody>
          <ModalFooter>
            <Button variant="primary" onClick={() => {setShow(false);}}>Save</Button>
          </ModalFooter>
          </form>
        </Modal>
  </div>)
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

const LOcard = styled.div`
  margin-bottom: 15px;
  padding-bottom: 15px;
  margin-left: 30px;
  border-bottom: grey 2px solid;
`;

const LOlist = styled.h4`
  list-style-type: none;
  text-align: left;
  margin: 0px;
  padding-left: 0px;
  margin-top: -2px;
`;

const LOlevel = styled.p`
  margin-bottom: 0px;
  font-size: 18px;
`;

const EditButton = styled.i`
  position: absolute;
  right: 50%;
  text-align: center;
  font-size: 20px;
`;

//MangeLO
const RightButton = styled.i`
  position: absolute;
  right: 19px;
  text-align: center;
  font-size: 24px;

`;

const LevelRightButton = styled.i`
  position: absolute;
  right: 19px;
  text-align: center;
  font-size: 16px;
`;
