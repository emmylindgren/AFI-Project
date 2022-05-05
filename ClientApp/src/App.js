import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
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
        <Route path='/sign-up' component={SignUp} />
        <Route path='/event-card' component={EventCard} />
      </Layout>
    );
  }
}
