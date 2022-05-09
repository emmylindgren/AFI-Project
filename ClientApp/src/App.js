import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { LogIn } from './components/LogIn';
import SignUp from './components/SignUp';
import EventCard from './components/EventCard'

import './custom.css'

export default function App(){
  return (
    <Layout>
      <Routes>
        <Route exact path='/' element={<LogIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/event-card' element={<EventCard/>} />
      </Routes>
    </Layout>
  );
}
