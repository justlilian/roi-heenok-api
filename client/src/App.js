import React from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import Home from './Home';
import FourOFour from './FourOFour';

import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/404' component={FourOFour}></Route>
          <Route exact path='*'>
            <Redirect to='/404'/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
