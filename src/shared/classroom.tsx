import React, { createContext, useState } from 'react';

export interface CourseDetail {
  id: string;
  program: string;
  name: string;
  semester: number;
  year: number;
};

interface ClassroomContent {
  programs: Array<string>;
  courses: Array<CourseDetail>;
  addProgram: (program: string) => void;
  addCourse: (courseDetail: Omit<CourseDetail, 'id'>) => void
}

export const ClassroomContext = createContext<ClassroomContent>({
  programs: [],
  courses: [],
  addProgram: () => {},
  addCourse: () => {}
});

interface ClassroomState {
  programs: Array<string>;
  courses: Array<CourseDetail>;
};

export const ClassroomProvider: React.FC = ({children}) => {
  const [classroom, setClassroom] = useState<ClassroomState>({programs: ['Test Program'], courses: [
    {id: '0', program: 'Test Program', name: "Test Course", semester: 1, year: 2021}
  ]});
  const { programs, courses } = classroom;
  const addProgram = (program: string) => setClassroom({...classroom, programs: [...classroom.programs, program]});
  const addCourse = ({program, name, semester, year }: Omit<CourseDetail, 'id'>) => {
    setClassroom({
      ...classroom,
      courses: [...classroom.courses, {
        id: `${classroom.courses.length + 1}`,
        program,
        name,
        semester,
        year
      }]
    })
  };
  return (
    <ClassroomContext.Provider value={{programs, courses, addProgram, addCourse}}>
      {children}
    </ClassroomContext.Provider>
  );
};
