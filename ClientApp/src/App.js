import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { LogIn } from './components/LogIn';
import SignUp from './pages/SignUp';
import EventCard from './components/EventCard'
import Explore from './components/Explore'
import EventSD from './components/EventShortDetails'
import TemplatePage from './pages/TemplatePage';


import './custom.css'
import Schedule from './components/Schedule';

export default function App(){
  return (
    <Layout>
      <Routes>
        <Route exact path='/' element={<LogIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/event-card' element={<EventCard/>} />
        <Route path='/schedule' element={<Schedule/>} />
        <Route path='/explore' element={<Explore/>} />
        <Route path='/create-event' element={<TemplatePage/>} />
        <Route path='/event-short-details' element={<EventSD/>} />
      </Routes>
    </Layout>
  );
}
