import axios from "axios";

export interface programResponse {
    programID: string;
    userID: string;
    programName: string;
    description: string;
}
export interface programRequest {
    name: string;
}

interface courseParams {
    programID: string;
}
export interface courseResponse {
    courseID: string;
    courseName: string;
    semester: number;
    year: number;
}
export interface courseRequest {
    programID: string;
    name: string;
    semester: number;
    year: number;
}

interface studentParams {
    courseID: string;
}
export interface studentResponse {
    studentID: string;
    studentName: string;
}
export interface studentRequest {
    courseID: string;
    students: {
      studentID: string;
      studentName: string;
    }
}

interface ploParams {
    programID: string;
}
export interface ploResponse {
    ploID: string;
    info: string;
    version: number;
}
export interface ploRequest {
    programID: string;
    info: string
}

interface loParams {
    courseID: string;
}
export interface loResponse {
    loID: string;
    info: string;
    levels: Array<{
      level: number;
      info: string;
    }>
}
export interface loRequest {
    courseID: string;
    info: string;
}
export interface loLevelRequest {
    loID: string;
    level: number;
    info: string;
}

//http://localhost:8000/api/programs
export async function initData(){ // called on App.tsx
    const api = axios.create({baseURL: `http://localhost:8000/api`}); 
    let res1 = await api.get<programResponse[]>('/programs');
    try {
        if(res1.data.length === 0){
            await api.post<programRequest[]>('/program', {name: "Test Program"})
            let res1 = await api.get<programResponse[]>('/programs');
            console.log(res1);
            //course
            await api.post<courseRequest[]>('/course', {programID: res1.data[0].programID, 
                name: "Test Course", semester: 1, year: 2021});
            await api.post<courseRequest[]>('/course', {programID: res1.data[0].programID, 
                name: "Test Course 2", semester: 1, year: 2021});
            await api.post<courseRequest[]>('/course', {programID: res1.data[0].programID, 
                name: "Test Course 3", semester: 1, year: 2020});
            let res2 = await api.get<courseResponse[]>('/courses', {params: {programID: res1.data[0].programID} });
            console.log(res2);
            //student
            await api.post<studentRequest[]>('/students', {courseID: res2.data[0].courseID, students: 
                [{studentID: "123", studentName: "student A"},{studentID: "124", studentName: "student B"},
                {studentID: "1211", studentName: "student C Studying"}]});
            let res3 = await api.get<studentResponse[]>('/students', {params: {courseID: res2.data[0].courseID} });
            console.log(res3);
            //plo
            await api.post<ploRequest[]>('/plo', {programID: res1.data[0].programID, info: "PLO1 Test PLO"});
            await api.post<ploRequest[]>('/plo', {programID: res1.data[0].programID, info: "PLO2 Test 2 "});
            let res4 = await api.get<ploResponse[]>('/plos', {params: {programID: res1.data[0].programID} });
            console.log(res4);
            //lo and lo level
            await api.post<loRequest[]>('/lo', {courseID: res2.data[0].courseID, info: "LO1 Test Outcome"});
            await api.post<loRequest[]>('/lo', {courseID: res2.data[0].courseID, info: "LO2 Basic Programming"});
            let res5 = await api.get<loResponse[]>('/los', {params: {courseID: res2.data[0].courseID} });
            await api.post<loLevelRequest>('/lolevel', {loID: res5.data[0].loID, level: 1, info: "Test Level" });
            await api.post<loLevelRequest>('/lolevel', {loID: res5.data[0].loID, level: 2, info: "Test Level2"});
            await api.post<loLevelRequest>('/lolevel', {loID: res5.data[1].loID, level: 1, info: "Tutorial"});
            await api.post<loLevelRequest>('/lolevel', {loID: res5.data[1].loID, level: 2, info: "Hello World"});
            await api.post<loLevelRequest>('/lolevel', {loID: res5.data[1].loID, level: 3, info: "Advanced Programming"});
            res5 = await api.get<loResponse[]>('/los', {params: {courseID: res2.data[0].courseID} });
            console.log(res5)

            //quiz
        }      
        
    } catch(error) {
      console.log(error)
    }
}