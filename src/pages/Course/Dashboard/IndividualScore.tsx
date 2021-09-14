import { AnyRecord } from 'dns';
import React from 'react';
import { useParams } from 'react-router-dom';

export const IndividualScore:React.FC = (props:any) =>{
    const params = useParams<{id: string}>();
    return(<div>
       <h6>Course ID:{params.id}</h6>
       <h6>Name : Student Studying</h6>
       <h6>Email : mail@mail.com</h6>
    </div>)
}