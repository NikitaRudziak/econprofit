import React, {useEffect, useCallback} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../Components/Navigation/Navigation';
import { StationMain } from '../../Components/StationMain/StationMain';
import { setCoordinates, setZoom } from '../../redux/actions';

import style from './StationContainer.module.css';

export const StationContainer = (props) => {
  return (
  <div className={style.stationContainer}>
    <Navigation />
    <StationMain lat={props.location.lat} setCenter2={props.setCenter} setZoom2={props.setZoom} lng={props.location.lng} />
  </div>
)}

const mapStateToProps = state => ({
  page1: state.pageReducer.page,
  region: state.pageReducer.region,
});
    
const mapDispatchToProps = {
  setCenter: setCoordinates,
  setZoom: setZoom
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StationContainer));
