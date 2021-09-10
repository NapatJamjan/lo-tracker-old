import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import CourseOutcome from '../../views/CourseOutcome';

type ID = string;
type LearningOutcomeMap = Map<ID, LearningOutcome>;

interface LearningOutcome {
  title: string,
  subLO: LearningOutcomeMap
}

export const PLOScreen: React.FC = () => {
  const PLOs: LearningOutcomeMap = new Map([
    ["ab201ksdn1", {
      title: "PLO1", 
      subLO: new Map([
        ["ab201ksdo1", {title: "LO1", subLO: new Map()}],
        ["ab201ksdp1", {title: "LO2", subLO: new Map([
          ["ab201ksep1", {title: "Level1", subLO: new Map()}],
          ["ab201ksfp1", {title: "Level2", subLO: new Map()}],
          ["ab201ksgp1", {title: "Level3", subLO: new Map()}],
        ])}],
        ["ab201ksdq1", {title: "LO3", subLO: new Map()}]
      ])}],
    ["ab201ksdn2", {title: "PLO2", subLO: new Map()}],
    ["ab201ksdn3", {title: "PLO3", subLO: new Map([
      ["ab201ksdo3", {title: "LO1", subLO: new Map()}]
    ])}],
  ]);
  return (
    <CourseOutcome></CourseOutcome>
    // <div>
    //   <h3>Learning Outcome</h3>
    //   <RecursiveCollapseList data={PLOs}></RecursiveCollapseList>
    // </div>
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
      {
        ids.map((id, index) => {
          return (
            <div key={id}>
              <h5 className="edit"><i className="fa fa-pencil"></i></h5>
              <h4 onClick={() => hasChildren(id) && toggle(index)} className="quizlist">
                {data.get(id)?.title}
              </h4>
              <Collapse in={open[index]} key={id}>
                <RecursiveCollapseList data={data.get(id)?.subLO ?? new Map()} key={id}></RecursiveCollapseList>
              </Collapse>
            </div>
          );
        })
      }
    </div>
  );
}
