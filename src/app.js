import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Dashwords from './components/dashwords/Dashwords';
import Alert from './components/alert/Alert';
import Footer from './components/footer/Footer';
import './styles/styles.css';

const template = (<Provider store={store}>
                    <Alert/>
                    <div id="topmost">DASHWORDS</div>
                    <div>
                        <Dashwords />
                    </div>
                    <Footer/>
                </Provider>);

ReactDOM.render(template, document.getElementById('root'));