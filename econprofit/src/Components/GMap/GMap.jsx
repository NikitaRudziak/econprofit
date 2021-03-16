import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import ModalStation from '../ModalStation/ModalStation';
import route from '../../back_route';

import style from './GMap.module.css';

const AnyReactComponent = ({id, name, address}) => 
  <div className={style.marker} >
    <div className={style.modal}>
      <div className={style.modalContainer}>
        <div className={style.textContainer}>
          <div className={style.stationName}>
            {name}
          </div>
          <div className={style.stationAddress}>
            {address}
          </div>
        </div>
        <div className={style.iconContainer}>
        <Link to={{pathname: `/stationinfo/${id}`}}>
          <div>
            <i class="las la-chart-pie"></i>
          </div>
        </Link>
        </div>
      </div>
    </div>
  </div>

export const GMap = () => {
  const [center, setCenter] = useState({lat: 53.9004368, lng: 27.5580622 });
  const [zoom, setZoom] = useState(11);
  const [locationList, setLocationList] = useState([]);
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    fetch(`${route}/location`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setLocationList(data);
      });
  }, [])

  // const changeVisibility = () => {
  //   setIsVisible(true)
  // }

  return (
    <div className={style.gmapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBoUSex8GgH0dsuHOCfz7yX4CvRCWzCKck" }}
        defaultCenter={center}
        defaultZoom={zoom}
        // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
      {locationList.map(item => (
        <AnyReactComponent
          id={item.id}
          lat={item.latitude}
          lng={item.longitude}
          name={item.name}
          address={item.address}
        />
        )
      )}
      </GoogleMapReact>
      {isVisible ? 
        <div>
          <ModalStation />
        </div> 
        : null}
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