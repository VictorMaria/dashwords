import React from 'react';
import { Route } from 'react-router-dom';
import Alert from '../alert/Alert';
import Footer from '../footer/Footer';
import './wrapper.css';

const Wrapper = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <>
        <Alert/>
        <div id="topmost">DASHWORDS</div>
        <div>
          <Component {...props} />
        </div>
        <Footer/>
      </>
    )}
  />
);


export default Wrapper;