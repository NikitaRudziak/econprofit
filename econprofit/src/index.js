
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import reducers from './redux/reducer/reducer';
// import { createStore } from "redux";
// import { Provider } from "react-redux";
import './index.css';
import App from './module/App/App';
import PageMapContainer from './module/PageMapContainer/PageMapContainer';
import PageDBContainer from './module/PageDBContainer/PageDBContainer';
import { createStore } from "redux";

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/main" component={App} />
      <Route exact path="/map" component={PageMapContainer} />
      <Route exact path="/db" component={PageDBContainer} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
