import React, { Component } from 'react';
import { Container } from 'reactstrap';
import '../custom.css'

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
     
        <Container>
          <div className='notch-bg'></div>
          {isRunningStandalone() ? <div style={{height: '50px'}}></div> : ''}
          {this.props.children}
        </Container>
      </div>
    );
  }
}

function isRunningStandalone() {
  return (window.matchMedia('(display-mode: standalone)').matches);
}
