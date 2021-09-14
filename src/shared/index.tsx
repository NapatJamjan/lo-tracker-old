import React, { cloneElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth';
import { ClassroomProvider } from './classroom';

const ProviderComposer: React.FC<{
    contexts: Array<any>
  }> = ({contexts, children}) => {
  return contexts.reduce((kids, parent) => cloneElement(parent, {children: kids}), children);
};

export const ContextProvider: React.FC = ({children}) => {
  return (<ProviderComposer contexts={[<ClassroomProvider/>, <AuthProvider/>, <BrowserRouter/>]}>{children}</ProviderComposer>);
};
