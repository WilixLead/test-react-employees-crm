import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './containers/app';
import rootReducer from './reducers';
import { Router, Route, hashHistory } from 'react-router';
import Employee from './components/employee/employee';
import Department from './components/department/department';
import configureStore from './store/configure-store';

// const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/employees" component={Employee}/>
        <Route path="/departments" component={Department}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);



/*import React from 'react'
 import { render } from 'react-dom'
 import { Provider } from 'react-redux'
 import App from './containers/App'
 import configureStore from './store/configureStore'

 const store = configureStore(() => {

 }, {});

 render(
 <Provider store={store}>
 <App />
 </Provider>,
 document.getElementById('root')
 )*/




/*

 import React from 'react'
 import { render } from 'react-dom'
 import { createStore } from 'redux'
 import { Provider } from 'react-redux'
 import App from './containers/App'

 const store = createStore( () => {}, {}) //WAT ;)

 render(
 <Provider store={store}>
 <App />
 </Provider>,
 document.getElementById('root')
 )*/
