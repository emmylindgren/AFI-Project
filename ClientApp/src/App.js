import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { LogIn } from './pages/LogIn';
import SignUp from './pages/SignUp';
import EventCard from './components/EventCard'
import Explore from './components/Explore'
import EventSD from './components/EventShortDetails'
import EventInformation from './pages/EventInformation';
import TemplatePage from './pages/TemplatePage';
import CreateEvent from './pages/CreateEvent';
import Schedule from './pages/Schedule';
import ProfilePage from './pages/ProfilePage';



import './custom.css'
import Audit from './pages/Audit';

export default function App(){
  return (
    <Layout>
      <Routes>
        <Route exact path='/' element={<LogIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/event-card' element={<EventCard/>} />
        <Route path='/schedule' element={<Schedule/>} />
        <Route path='/explore' element={<Explore/>} />
        <Route path='/event-information' element={<EventInformation/>} />

        <Route path='/create-event' element={<TemplatePage/>} />
        <Route path='/event-short-details' element={<EventSD/>} />
        <Route path='/audit' element={<Audit/>} />

        <Route path='/new-event' element={<CreateEvent/>} />
        <Route path='/profile' element={<ProfilePage/>} />
      </Routes>
    </Layout>
  );
}
