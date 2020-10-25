import React from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

import Home from './Home';
import Search from './Search';
import FourOFour from './FourOFour';

import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <header class='header'>
          <Link to='/' >
            <img class='header__img no-select no-focus' width="300" alt="roi-heenok-api - free web archive for the bests things 'Roi Heenok' has ever said ..." src="/img/roi-heenok.png"/>
          </Link>
        </header>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/search/:quote' component={Search}></Route>
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
