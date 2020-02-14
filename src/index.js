import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PublicRadarPage from './components/pages/PublicRadarPage';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './redux/store/index';

// optional cofiguration
const alertBoxConfig = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '100px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

export const stylesTheme = {
  default: {
    primaryColor: '#00517c', // 2B0B3D
    secondaryColor: '#09ACDC',
    backgroundColor: '#282c34',
    fontColor: 'black',
    lightColor: 'white',
    grayColor: '#ddd',
    opaqueWhite: 'rgba(255,255,255,0.3)',
    negativeColor: '#ff3e3e',
    secondaryNegativeColor: 'darkred',
  },
};
const reduxStore = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <ReduxProvider store={reduxStore}>
      <ThemeProvider theme={stylesTheme}>
        <AlertProvider template={AlertTemplate} {...alertBoxConfig}>
          <Switch>
            <Route path="/edit/" component={App} />
            <Route exact path="/:radarId?" component={PublicRadarPage} />
          </Switch>
        </AlertProvider>
      </ThemeProvider>
    </ReduxProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
