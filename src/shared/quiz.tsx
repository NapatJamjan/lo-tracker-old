import React, { createContext, useState } from 'react';

interface QuizDetail{
    id:string;
    name:string;
    question:Array<string>;
}

interface QuizContent{
    quizzes: Array<QuizDetail>;
    //addQuiz: (question:Array<string>) => void
    addQuiz:(quizDetail:Omit<QuizDetail,'id'>) => void;
}

export const QuizContext = createContext<QuizContent>({
    quizzes:[],
    addQuiz: () => {}
})

interface QuizState{
    quizzes: Array<QuizDetail>;
}

export const QuizProvider:React.FC = ({children}) =>{   
    const [quiz,setQuiz] = useState<QuizState>({quizzes:[{id:"0",name:"Quiz 0 : Default Quiz",
        question:['Question 1 What is Computer Science about?','Question 2 Test question']}]});
    const {quizzes} = quiz;
    //const addQuiz = (question:Array<string>) => setQuiz({...quiz})
    const addQuiz = ({name,question}: Omit<QuizDetail,'id'>) =>{
        setQuiz({
            ...quiz,
            quizzes:[...quiz.quizzes,{
                id: `${quiz.quizzes.length+1}`,
                name,
                question
            }]
        })
    };

    return(
        <QuizContext.Provider value={{quizzes,addQuiz}}>
            {children}
        </QuizContext.Provider>
    )
}