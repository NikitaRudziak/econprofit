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
            <i class="lar la-chart-bar"></i>
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
  const [dot, setDot] = useState();

  useEffect(() => {
    fetch(`${route}/location`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setLocationList(data);
      });
  }, [])

  const generateLocationDatalist = () => {
    return (
      locationList.map(item => (
        <>
          <option key={item} fortest={item.id} value={item.name}>{item.region}</option>
        </>
      ))
    )
  }

  const changeDot = (arg) => {
    let lat = 0;
    let lng = 0;
    locationList.map(item => {
      if(item.name == arg) {
        lat = item.latitude;
        lng = item.longitude;
      }
    })
    if (lat != 0) {
      setCenter({lat: Number(lat), lng: Number(lng) })
      setZoom(17)
      console.log(lat, lng)
    }
  }

  const clearInput = () => {
    document.getElementById("station").value = "";
  }

  return (
    <div className={style.gmapContainer}>
      <div className={style.gmapFilters}>
        <div className={style.addressField}>
          <div>
            Адрес станции: 
          </div>
          <input placeholder="Поиск..." id="station" className={style.input} type="text" list="stationList" onChange={(e) => changeDot(e.target.value)}/>
            <datalist id="stationList" >
              {generateLocationDatalist()}
            </datalist>
            <span onClick={clearInput}>
              <i class="las la-skull-crossbones"></i>
            </span>
        </div>
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBoUSex8GgH0dsuHOCfz7yX4CvRCWzCKck" }}
        center={center}
        zoom={zoom}
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