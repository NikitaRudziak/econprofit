import React, { useEffect, useState }from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import ModalStation from '../ModalStation/ModalStation';
import route from '../../back_route';

import style from './GMap.module.css';

const AnyReactComponent = ({id, name, address, sum, count, lat, lng}) => {
  return (
  <div className={style.marker}>
    {(parseInt((Number(sum) / ( 5069 * Number(count))) * 100)) * 100 / 100}%
    {/* {Number(sum).toLocaleString('RU')} */}
    <div className={style.modal2}>
      <Link to={{pathname: `/maff/stationinfo/${id}`, lat: lat, lng: lng}}>
        <div className={style.modalContainer}>
          <div className={style.textContainer}>
            <div className={style.stationName}>
              {name}
            </div>
            <div className={style.stationAddress}>
              {address}
            </div>
          </div>
          {/* <div className={style.iconContainer}>
            <div>
              <i class="lar la-chart-bar"></i>
            </div>
          </div> */}
        </div>
      </Link>
    </div>
  </div>
  )
}

export const GMap = ({latitude, longitude, zoom2, setZoom2}) => {
  const [center, setCenter] = useState({lat: latitude, lng: longitude });
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
    console.log(zoom2)
  }, [])

  useEffect(() => {
    let arr = []
    if(locationList && percent) {
      locationList.map(item => {
        percent.map(item2 => {
          if (item.address === item2.address) {
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
      setZoom2(17)
      console.log(lat, lng)
    }
  }

  const clearInput = () => {
    document.getElementById("station").value = "";
    setCenter({lat: 53.9004368, lng: 27.5580622 });
    setZoom2(11);
  }

  const view = () => {
    console.log(locationList)
    console.log(percent)
    // setCenter({lat: 1, lng: 2})
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
              Очистить
            </span>
        </div>
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBoUSex8GgH0dsuHOCfz7yX4CvRCWzCKck" }}
        center={center}
        zoom={zoom2}
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
          // zoom={zoom2}
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

// const mapStateToProps = (state) => {
//   return{
//   // page: state.pageReducer.page,
//   // region: state.pageReducer.region,
//     // console.log(state)
//     latitude: state.pageReducer.lat,
//     longitude: state.pageReducer.lng,
//   }
// };

const mapStateToProps = state => {
  return {
    page1: state.pageReducer.page,
  }
}
    
// const mapDispatchToProps = {
// };
  
export default withRouter(connect(mapStateToProps, null)(GMap));