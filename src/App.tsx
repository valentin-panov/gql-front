import * as React from 'react';
import { Test } from 'src/screens/Test';
import Cookies from 'universal-cookie';
import { Client } from './client';

export const App: React.FC = () => {
  const cookies = new Cookies(null, { path: '/', domain: '.lvh.me' });
  // const cookies = new Cookies(null, { path: '/' });
  cookies.set('XSRF-TOKEN', 'token', { sameSite: 'strict' });
  return (
    <Client>
      <Test />
    </Client>
  );
};
