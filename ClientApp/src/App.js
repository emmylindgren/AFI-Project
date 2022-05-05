import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { LogIn } from './components/LogIn';
import SignUp from './components/SignUp';
import EventCard from './components/EventCard'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={LogIn} />
        <Route path='/home' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/event-card' component={EventCard} />
      </Layout>
    );
  }
}
