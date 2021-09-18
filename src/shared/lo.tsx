import React, { createContext, useState } from 'react';

interface LODetail{
    id:string;
    name:string;
    level:Array<string>;
};


interface LOContent{
    los:Array<LODetail>;
    addLo:(loDetail:Omit<LODetail,'id'>) => void;
    deleteLo:() => void;
    updateLo:() => void;
};

export const LOContext = createContext<LOContent>({
    los:[],
    addLo:()=>{},
    deleteLo:()=>{},
    updateLo:()=>{}
});

interface LOState{
    los:Array<LODetail>;
};

export const LOProvider:React.FC = ({children}) =>{
    const [lo,setLo] = useState<LOState>({
        los:[{id:"0",name:"LO 1 Basic Java",level:['Level 1 Hello World','Level 2 Conditional']},
        {id:"1",name:"LO 2 C#",level:['Level 1 Hello World','Level 2 If else','Level 3 Loop']}
        ]
    });
    const {los} = lo;
    const addLo = ({name,level}: Omit<LODetail,'id'>) =>{
        setLo({
            ...lo,
            los:[...lo.los,{
                id: `${lo.los.length+1}`,
                name,
                level
            }]
        })
    }
    const deleteLo = () => {};
    const updateLo = () => {};
    return(
        <LOContext.Provider value={{los,addLo,deleteLo,updateLo}}>
            {children}
        </LOContext.Provider>
    )

}