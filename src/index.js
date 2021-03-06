import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import * as serviceWorker from './serviceWorker';
import MainScreen from './components/MainScreen';
import MusicApp from './components/MusicApp';
/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "8Bit";
    src: url("/8bit.otf");
  }

  body {
    font-family: '8Bit';
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <MainScreen />
    <MusicApp />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
