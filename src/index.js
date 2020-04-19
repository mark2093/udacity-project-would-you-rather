import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
// import './css/bootstrap.min.css'
// import './css/flatly-theme.min.css'
import './index.css'
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(reducer, middleware)

ReactDOM.render(
  <Provider store={store}>
     <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
