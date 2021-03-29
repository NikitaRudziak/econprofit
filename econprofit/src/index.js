
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import reducers from './redux/reducer/reducer';
import './index.css';
import App from './module/App/App';
import PageMapContainer from './module/PageMapContainer/PageMapContainer';
import PageDBContainer from './module/PageDBContainer/PageDBContainer';
import StationContainer from './module/StationContainer/StationContainer';
import StatByRegion from './module/StatByRegion/StatByRegion'
import { createStore } from "redux";

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/maff/main" component={App} />
      <Route exact path="/maff/" component={PageMapContainer} />
      <Route exact path="/maff/map" component={PageMapContainer} />
      <Route exact path="/maff/db" component={PageDBContainer} />
      <Route exact path="/maff/stationinfo/:id" component={StationContainer} />
      <Route exact path="/maff/regioninfo" component={StatByRegion} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
