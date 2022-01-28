import React, { useEffect, useState }from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../Components/Navigation/Navigation';
import { GMap } from '../../Components/GMap/GMap';

import style from './PageMapContainer.module.css';
import { setCoordinates, setZoom } from '../../redux/actions';

export const PageMapContainer = ({latitude, longitude, zoom, setCenter, setZoom}) => {

  return (
    <div className={style.pageMapContainer}>
      <Navigation view='true'/>
      <GMap latitude={latitude} longitude={longitude} setCenter2={setCenter} setZoom2={setZoom} zoom2={zoom} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    latitude: state.pageReducer.lat,
    longitude: state.pageReducer.lng,
    zoom: state.pageReducer.zoom
  }
}
  
const mapDispatchToProps = {
  setCenter: setCoordinates,
  setZoom: setZoom
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageMapContainer));