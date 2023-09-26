
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import reducers from './redux/reducer/reducer';
import './index.css';
// import './fonts/Montserrat-Regular.ttf';
import App from './module/App/App';
import PageMapContainer from './module/PageMapContainer/PageMapContainer';
import PageDBContainer from './module/PageDBContainer/PageDBContainer';
import StationContainer from './module/StationContainer/StationContainer';
import StatByRegion from './module/StatByRegion/StatByRegion';
import { createStore } from "redux";
import SettingsContainer from './Components/SettingsContainer/SettingsContainer';
import AboutStationContainer from './module/AboutStationContainer/AboutStationContainer';
import IndicatorContainer from './module/IndicatorsContainer/IndicatorContainer';
import IndicatorsPage from './module/IndicatorsPage/IndicatorsPage';
import MapPage from './module/MapPage/MapPage';
import StatPageContainer from './Components/StatPageContainer/StatPageContainer';
import StatisticPage from './module/StatisticPage/StatisticPage';
// import 

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/maff/locationabout" component={AboutStationContainer} />
      <Route exact path="/maff/statistic" component={StatisticPage} />
      <Route exact path="/maff/indicators" component={IndicatorsPage} />
      <Route exact path="/maff" component={MapPage} />
      <Route exact path="/maffmap" component={MapPage} />
      <Route exact path="/maff/main" component={App} /> 
      {/* app   StatPageContainer*/}
      {/* <Route exact path="/maff/" component={PageMapContainer} /> */}
      <Route exact path="/maff/map" component={PageMapContainer} />
      <Route exact path="/maff/db" component={PageDBContainer} />
      <Route exact path="/maff/stationinfo/:id" component={StationContainer} />
      <Route exact path="/maff/regioninfo" component={StatByRegion} />
      <Route exact path="/maff/settings" component={SettingsContainer} />
      
    </Router>
  </Provider>,
  document.getElementById('root')
);
