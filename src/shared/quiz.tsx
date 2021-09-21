import React, { createContext, useState } from 'react';

interface QuizDetail {
    id: string;
    name: string;
    question: Array<string>;
}

interface QuizContent{
    quizzes: Array<QuizDetail>;
    addQuiz: (quizDetail: Omit<QuizDetail, 'id'>) => void;
}

export const QuizContext = createContext<QuizContent>({
    quizzes:[],
    addQuiz: () => {}
})

interface QuizState{
    quizzes: Array<QuizDetail>;
}

export const QuizProvider:React.FC = ({children}) =>{   
    const [quiz,setQuiz] = useState<QuizState>({quizzes:[
        {id: "0", name:"Quiz 1 : Tutorial Quiz",
        question: ['Question 1 Test question', 'Question 2 What is Computer Science about?', 'Question 3 How to ']},
        {id: "1", name: "Quiz 2 : Tutorial Quiz 2",
        question: ['Question 1 Test question 2', 'Question 2 What is a quiz', 'Question 3 How to ', 'Question 4 a']}]});
    const {quizzes} = quiz;
    const addQuiz = ({name, question}: Omit<QuizDetail, 'id'>) =>{
        setQuiz({
            ...quiz,
            quizzes:[...quiz.quizzes, {
                id: `${quiz.quizzes.length+1}`,
                name,
                question
            }]
        })
    };

    return(
        <QuizContext.Provider value={{quizzes, addQuiz}}>
            {children}
        </QuizContext.Provider>
    )
}