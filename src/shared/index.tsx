import React, { cloneElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth';
import { ClassroomProvider } from './classroom';
import { LOProvider } from './lo';
import { QuizProvider } from './quiz';

const ProviderComposer: React.FC<{
    contexts: Array<any>
  }> = ({contexts, children}) => {
  return contexts.reduce((kids, parent) => cloneElement(parent, {children: kids}), children);
};

export const ContextProvider: React.FC = ({children}) => {
  
  return (<ProviderComposer contexts={[<ClassroomProvider/>, <AuthProvider/>,<QuizProvider/>,<LOProvider/>,
   <BrowserRouter/>]}>
    {children}</ProviderComposer>);
};
