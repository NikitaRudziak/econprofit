import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import ModalStation from '../ModalStation/ModalStation';
import route from '../../back_route';

import style from './GMap.module.css';

const AnyReactComponent = ({id, name, address, sum, count}) => 
  <div className={style.marker} >
    {/* <div className={style.percent}> */}
      {(parseInt((Number(sum) / ( 9311 * Number(count))) * 100)) * 100 / 100}%
    {/* </div> */}
    {/* <div className={style.modal}>
      <div className={style.modalContainer}> */}
        {/* {sum} {count} */}
        
        {}
        {/* <div className={style.textContainer}>
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
        </div> */}
      {/* </div>
    </div> */}
    <div className={style.modal2}>
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
        <Link to={{pathname: `/maff/stationinfo/${id}`}}>
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
  const [percent, setPercent] = useState([]);
  const [isVisible, setIsVisible] = useState(false)
  const [test, setTest] = useState([])
  const [dot, setDot] = useState();

  useEffect(() => {
    fetch(`${route}/countinfo`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setLocationList(data);
      });
    fetch(`${route}/percentinfo`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setPercent(data);
      });
  }, [])

  useEffect(() => {
    let arr = []
    // console.log('l')
    if(locationList && percent) {
      locationList.map(item => {
        percent.map(item2 => {
          if (item.name == item2.name) {
            let obj = {
              id: item.id,
              name: item.name,
              address: item2.address,
              latitude: item2.latitude,
              longitude: item2.longitude,
              sum: item2.sum,
              count: item.count
            }
            arr.push(obj);
          }
        })
      })
    }
    // console.log(arr)
    setTest(arr);
  }, [locationList, percent])

  const generateLocationDatalist = () => {
    return (
      percent.map(item => (
        <>
          <option key={item} value={item.name}>{item.region}</option>
        </>
      ))
    )
  }

  const changeDot = (arg) => {
    let lat = 0;
    let lng = 0;
    percent.map(item => {
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
    setCenter({lat: 53.9004368, lng: 27.5580622 });
    setZoom(11);
  }

  const view = () => {
    // let arr = [];
    // locationList.map(item => {
    //   percent.map(item2 => {
    //     let count = 0
    //     if(item.name == item2.name) {
    //       count++
    //     }
    //     arr.push(count)
    //     count = 0;
    //   })
    // }) 
    console.log(percent)
  }

  return (
    <div className={style.gmapContainer}>
      <div className={style.gmapFilters}>
        <div className={style.addressField}>
          <div onClick={view}>
            Адрес станции: 
          </div>
          <input placeholder="Поиск..." id="station" className={style.input} type="text" list="stationList" onChange={(e) => changeDot(e.target.value)}/>
            <datalist id="stationList" >
              {generateLocationDatalist()}
            </datalist>
            <span onClick={clearInput}>
              <i class="las la-times"></i>
              {/* <i class="las la-skull-crossbones"></i> */}
            </span>
        </div>
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBoUSex8GgH0dsuHOCfz7yX4CvRCWzCKck" }}
        center={center}
        zoom={zoom}
        // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
      
      {test.map(item => (
        <AnyReactComponent
          id={item.id}
          lat={item.latitude}
          lng={item.longitude}
          name={item.name}
          address={item.address}
          sum={item.sum}
          count={item.count}
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