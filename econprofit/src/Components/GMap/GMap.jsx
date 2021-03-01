import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';

import style from './GMap.module.css';

const AnyReactComponent = ({text}) => <div className={style.marker}></div>

export const GMap = () => {
  const [center, setCenter] = useState({lat: 53.9004368, lng: 27.5580622 });
  const [zoom, setZoom] = useState(11);

  return (
    <div className={style.gmapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBoUSex8GgH0dsuHOCfz7yX4CvRCWzCKck" }}
        defaultCenter={center}
        defaultZoom={zoom}
        // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <AnyReactComponent
          lat={54.9004368}
          lng={26.5580622}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  )
}

const mapStateToProps = state => ({
    page: state.pageReducer.page,
    region: state.pageReducer.region,
  });
    
  const mapDispatchToProps = {
  };
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GMap));