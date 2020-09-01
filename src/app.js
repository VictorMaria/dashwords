import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import {
    BrowserRouter as Router,
    Switch,
  } from 'react-router-dom';
import ClassicSprint from './components/views/gameModes/classicSprint/ClassicSprint';
import Ninja from './components/views/gameModes/ninja/Ninja';
import Wrapper from './components/hoc/Wrapper';
import './styles/styles.css';

const template = (<Provider store={store}>
                    <Router>
                      <Switch>
                        <Wrapper exact path='/classic-sprint' component={ClassicSprint} />
                        <Wrapper exact path='/ninja' component={Ninja} />
                      </Switch>
                    </Router>
                  </Provider>);

ReactDOM.render(template, document.getElementById('root'));