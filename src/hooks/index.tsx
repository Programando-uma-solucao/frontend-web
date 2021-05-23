import React from 'react';
import { WithChildren } from '../common/interfaces/WithChildren';
import { AuthProvider } from './auth';

type AppProviderProps = WithChildren;

const AppProvider = ({ children }: AppProviderProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
