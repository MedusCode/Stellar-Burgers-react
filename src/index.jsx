import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/app/app';
import { store } from './services/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />  
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

module.hot.accept();
