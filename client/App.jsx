/**
 * ************************************
 *
 * @module  App.jsx
 * @author Joseph Michael Corrado
 * @date 11/26/19
 * @description main app
 *
 * ************************************
 */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="router">
        <main>
          <Switch>
            <Route 
              path='/'
              component={Home}
            />
          </Switch>
        </main>
      </div>
    )
  }
}