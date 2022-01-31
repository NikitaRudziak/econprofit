import React, { useEffect, useState }from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ModalStation from '../ModalStation/ModalStation';
import route from '../../back_route';

import style from './GMap.module.css';

let max = 0;

const AnyReactComponent = ({color, id, name, address, sum, count, lat, lng, perc}) => (
  <>
    <div className={style[color]}>
      <div>
        {(parseFloat((Number(sum) / ( 30422 * Number(count))) * 100).toFixed(1)) * 100 / 100}%
      </div>
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
          </div>
        </Link>
      </div>
    </div> 
  </>
)

export const GMap = ({latitude, longitude, zoom2, setZoom2}) => {
  const [center, setCenter] = useState({lat: latitude, lng: longitude });
  const [locationList, setLocationList] = useState([]);
  const [percent, setPercent] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [test, setTest] = useState([]);
  const [modalShow, setModalShow] = useState(false);

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
    let arr = [];
    if(locationList && percent) {
      locationList.map(item => {
        percent.map(item2 => {
          if (item.address === item2.address) {
            if((parseFloat((Number(item2.sum) / ( 30422 * Number(item.count))) * 100).toFixed(1)) * 100 / 100 > max) {
              max = (parseFloat((Number(item2.sum) / ( 30422 * Number(item.count))) * 100).toFixed(1)) * 100 / 100;
            }
            let obj = {
              id: item.id,
              name: item.name,
              address: item2.address,
              company: item2.company,
              nearplaces: item2.nearplaces_add ? (item2.nearplaces + ' ( ' + item2.nearplaces_add + ' )') : item2.nearplaces + ' ( Не областной центр )',
              latitude: item2.latitude,
              longitude: item2.longitude,
              sum: item2.sum,
              count: item.count,
              perc: (parseFloat((Number(item2.sum) / ( 30422 * Number(item.count))) * 100).toFixed(2)) * 100 / 100
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
      setCenter({lat: Number(lat), lng: Number(lng) });
      setZoom2(17);
    }
  }

  const clearInput = () => {
    document.getElementById("station").value = "";
    setCenter({lat: 53.9004368, lng: 27.5580622 });
    setZoom2(11);
  }

  const getMarkers = (test) => {
    return test.map(item => {
      const percent = (parseFloat((Number(item.sum) / ( 30422 * Number(item.count))) * 100).toFixed(1)) * 100 / 100;
      let now = new Date();
      let start = new Date(now.getFullYear(), 0, 0);
      let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
      let oneDay = 1000 * 60 * 60 * 24;
      let day = Math.floor(diff / oneDay);
      if(percent <= day * 0.273 * 25 / 100 && percent >= 0.01) {
        return (
          <AnyReactComponent
            color = 'marker_red'
            id={item.id}
            lat={item.latitude}
            lng={item.longitude}
            name={item.name}
            address={item.address}
            sum={item.sum}
            count={item.count}
          />
        )
      }
      if(percent > day * 0.273 * 25 / 100 && percent <= day * 0.273 * 50 / 100) {
        return (
          <AnyReactComponent
            color = 'marker_orange'
            id={item.id}
            lat={item.latitude}
            lng={item.longitude}
            name={item.name}
            address={item.address}
            sum={item.sum}
            count={item.count}
          />
        )
      }
      if(percent > day * 0.273 * 50 / 100 && percent <= day * 0.273 * 75 / 100 ) {
        return <AnyReactComponent
          color= 'marker_yellow'
          id={item.id}
          lat={item.latitude}
          lng={item.longitude}
          name={item.name}
          address={item.address}
          sum={item.sum}
          count={item.count}
        />
      }
      if(percent > day * 0.273 * 75 / 100 && percent < day * 0.273) {
        return <AnyReactComponent
          color= 'marker'
          id={item.id}
          lat={item.latitude}
          lng={item.longitude}
          name={item.name}
          address={item.address}
          sum={item.sum}
          count={item.count}
        />
      }
      if(percent >= day * 0.273 || percent >= 100) {
        return <AnyReactComponent
          color= 'marker_green'
          id={item.id}
          lat={item.latitude}
          lng={item.longitude}
          name={item.name}
          address={item.address}
          sum={item.sum}
          count={item.count}
        />
      }
    })
  }

  const openModal = () => {
    setModalShow(!modalShow);
  }

  const s2ab = (s) => {
    if(typeof ArrayBuffer !== 'undefined') {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    } else {
      var buf = new Array(s.length);
      for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
  }
  const export_table_to_excel = (id, type, fn) => {
    var wb = XLSX.utils.table_to_book(document.getElementById(id), {sheet:"Sheet JS"});
    var wbout = XLSX.write(wb, {bookType:type, bookSST:true, type: 'binary'});
    var fname = fn || 'Malanka_report.' + type;
    try {
      saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), fname);
    } catch(e) { if(typeof console != 'undefined') console.log(e, wbout); }
    return wbout;
  }

  const exportToXLS = () => {
    var type = "xlsx";
    return export_table_to_excel('Malanka_report', type || 'xlsx');
  }

  const goToMark = (lat, lng) => {
    setCenter({lat: Number(lat), lng: Number(lng) });
    setZoom2(17);
    openModal();
  }

  const generateRow = () => {
    test.sort(function (a, b) {
      if (a.perc < b.perc) {
        return 1;
      }
      if (a.perc > b.perc) {
        return -1;
      }
      return 0;
    })
    return (
      test ? test.map(item => (
        <tr className={style.modalRow} onClick={() => goToMark(item.latitude, item.longitude)}>
          <td>{item.name}</td>
          <td>{item.address}</td>
          <td>{item.company}</td>
          <td>{item.nearplaces}</td>
          <td>{item.perc}</td>
        </tr>
      )) : null
    )
  }
  
  return (
    <>
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
              Очистить
            </span>
        </div>
        <div className={style.downloadButton} onClick={openModal}>
          Выполнение плана
        </div>
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBoUSex8GgH0dsuHOCfz7yX4CvRCWzCKck" }}
        center={center}
        zoom={zoom2}
      >
        {getMarkers(test)}
      </GoogleMapReact>
      {isVisible ? 
        <div>
          <ModalStation />
        </div> 
        : null}
    </div>
    {modalShow 
      ? <div id="myModal" className={style.modalOpen}> 
          <div className={style.modalContent}>
            <div className={style.modalButton}>
              <div className={style.downloadButton} onClick={exportToXLS}>Скачать</div>
              <div className={style.close} onClick={openModal}>&times;</div>
            </div>
            <table id='Malanka_report'>
              <tr>
                <th>Локация</th>
                <th>Адрес</th>
                <th>Предприятие</th>
                <th>Места рядом</th>
                <th>Процент окупаемости</th>
              </tr>
              {generateRow()}
            </table>
          </div>
        </div>
      : <div id="myModal" className={style.modal}>
          <div className={style.modalContent}>
            <span className={style.close}>&times;</span>
            <p>Некоторый текст в модальном..</p>
          </div>
        </div>
    }
    </>
  )
}

const mapStateToProps = state => {
  return {
    page1: state.pageReducer.page,
  }
}
  
export default withRouter(connect(mapStateToProps, null)(GMap));
