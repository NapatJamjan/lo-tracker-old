import React, { cloneElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth';

const ProviderComposer: React.FC<{
    contexts: Array<any>
  }> = ({contexts, children}) => {
  return contexts.reduce((kids, parent) => cloneElement(parent, {children: kids}), children);
};

export const ContextProvider: React.FC = ({children}) => {
  return (<ProviderComposer contexts={[<AuthProvider/>, <BrowserRouter/>]}>{children}</ProviderComposer>);
};
