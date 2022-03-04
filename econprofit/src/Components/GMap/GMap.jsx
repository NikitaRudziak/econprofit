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
  const [find, setFind] = useState([]);
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
    setFind(arr)
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

  const generateLocationDatalist2 = () => {
    return (
      find.map(item => (
        <>
          <option key={item} value={item.name}>{item.address}</option>
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
      if(percent <= day * 0.273 * 25 / 100 && percent >= 0) {
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
    // e.preventDefault();
    setModalShow(!modalShow);
  }

  const openModal2 = (e) => {
    e.stopPropagation()
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
    let i = 0;
    let now = new Date();
    let start = new Date(now.getFullYear(), 0, 0);
    let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);
    find.sort(function (a, b) {
      if (a.perc < b.perc) {
        return 1;
      }
      if (a.perc > b.perc) {
        return -1;
      }
      return 0;
    })
    return (
      find ? find.map(item => {
        
        if((item.nearplaces).includes('АЗC')) {
          i = i+1;
          let perce;
          if(item.perc <= day * 0.273 * 25 / 100 && item.perc >= 0.01) {
            perce = 'q'
          }
          if(item.perc > day * 0.273 * 25 / 100 && item.perc <= day * 0.273 * 50 / 100) {
            perce = 'w'
          }
          if(item.perc > day * 0.273 * 50 / 100 && item.perc <= day * 0.273 * 75 / 100 ) {
            perce = 'e'
          }
          if(item.perc > day * 0.273 * 75 / 100 && item.perc < day * 0.273) {
            perce = 'r'
          }
          if(item.perc >= day * 0.273 || item.perc >= 100) {
            perce = 't'
          }
          return (
            <tr className={style.modalRow} onClick={() => goToMark(item.latitude, item.longitude)}>
              <td className={style.green}>{i}</td>
              <td>{item.name}</td>
              <td>{item.company}</td>
              <td>{item.nearplaces}</td>
              
              <td className={style[perce]}>{item.perc}</td>
            </tr>
          )
        }
        if((item.nearplaces).includes('Офисы')) {
          i++;
          let perce;
          if(item.perc <= day * 0.273 * 25 / 100 && item.perc >= 0.01) {
            perce = 'q'
          }
          if(item.perc > day * 0.273 * 25 / 100 && item.perc <= day * 0.273 * 50 / 100) {
            perce = 'w'
          }
          if(item.perc > day * 0.273 * 50 / 100 && item.perc <= day * 0.273 * 75 / 100 ) {
            perce = 'e'
          }
          if(item.perc > day * 0.273 * 75 / 100 && item.perc < day * 0.273) {
            perce = 'r'
          }
          if(item.perc >= day * 0.273 || item.perc >= 100) {
            perce = 't'
          }
          return (
            <tr className={style.modalRow} onClick={() => goToMark(item.latitude, item.longitude)}>
              <td className={style.gray}>{i}</td>
              <td>{item.name}</td>
              <td>{item.company}</td>
              <td>{item.nearplaces}</td>
              <td className={style[perce]}>{item.perc}</td>
            </tr>
          )
        }
        if((item.nearplaces).includes('Торговый объект')) {
          i++
          let perce;
          if(item.perc <= day * 0.273 * 25 / 100 && item.perc >= 0.01) {
            perce = 'q'
          }
          if(item.perc > day * 0.273 * 25 / 100 && item.perc <= day * 0.273 * 50 / 100) {
            perce = 'w'
          }
          if(item.perc > day * 0.273 * 50 / 100 && item.perc <= day * 0.273 * 75 / 100 ) {
            perce = 'e'
          }
          if(item.perc > day * 0.273 * 75 / 100 && item.perc < day * 0.273) {
            perce = 'r'
          }
          if(item.perc >= day * 0.273 || item.perc >= 100) {
            perce = 't'
          }
          return (
            <tr className={style.modalRow} onClick={() => goToMark(item.latitude, item.longitude)}>
              <td className={style.yellow}>{i}</td>
              <td>{item.name}</td>
              <td>{item.company}</td>
              <td>{item.nearplaces}</td>
              <td className={style[perce]}>{item.perc}</td>
            </tr>
          )
        }
        if((item.nearplaces).includes('Спортивный объект')) {
          i++
          let perce;
          if(item.perc <= day * 0.273 * 25 / 100 && item.perc >= 0.01) {
            perce = 'q'
          }
          if(item.perc > day * 0.273 * 25 / 100 && item.perc <= day * 0.273 * 50 / 100) {
            perce = 'w'
          }
          if(item.perc > day * 0.273 * 50 / 100 && item.perc <= day * 0.273 * 75 / 100 ) {
            perce = 'e'
          }
          if(item.perc > day * 0.273 * 75 / 100 && item.perc < day * 0.273) {
            perce = 'r'
          }
          if(item.perc >= day * 0.273 || item.perc >= 100) {
            perce = 't'
          }
          return (
            <tr className={style.modalRow} onClick={() => goToMark(item.latitude, item.longitude)}>
              <td className={style.blue}>{i}</td>
              <td>{item.name}</td>
              <td>{item.company}</td>
              <td>{item.nearplaces}</td>
              <td className={style[perce]}>{item.perc}</td>
            </tr>
          )
        }
        if((item.nearplaces).includes('Гостиница')) {
          i++
          let perce;
          if(item.perc <= day * 0.273 * 25 / 100 && item.perc >= 0.01) {
            perce = 'q'
          }
          if(item.perc > day * 0.273 * 25 / 100 && item.perc <= day * 0.273 * 50 / 100) {
            perce = 'w'
          }
          if(item.perc > day * 0.273 * 50 / 100 && item.perc <= day * 0.273 * 75 / 100 ) {
            perce = 'e'
          }
          if(item.perc > day * 0.273 * 75 / 100 && item.perc < day * 0.273) {
            perce = 'r'
          }
          if(item.perc >= day * 0.273 || item.perc >= 100) {
            perce = 't'
          }
          return (
            <tr className={style.modalRow} onClick={() => goToMark(item.latitude, item.longitude)}>
              <td className={style.red}>{i}</td>
              <td>{item.name}</td>
              <td>{item.company}</td>
              <td>{item.nearplaces}</td>
              <td className={style[perce]}>{item.perc}</td>
            </tr>
          )
        }
        if((item.nearplaces).includes('Объект инфраструктуры')) {
          i++
          let perce;
          if(item.perc <= day * 0.273 * 25 / 100 && item.perc >= 0.01) {
            perce = 'q'
          }
          if(item.perc > day * 0.273 * 25 / 100 && item.perc <= day * 0.273 * 50 / 100) {
            perce = 'w'
          }
          if(item.perc > day * 0.273 * 50 / 100 && item.perc <= day * 0.273 * 75 / 100 ) {
            perce = 'e'
          }
          if(item.perc > day * 0.273 * 75 / 100 && item.perc < day * 0.273) {
            perce = 'r'
          }
          if(item.perc >= day * 0.273 || item.perc >= 100) {
            perce = 't'
          }
          return (
            <tr className={style.modalRow} onClick={() => goToMark(item.latitude, item.longitude)}>
              <td className={style.mint}>{i}</td>
              <td>{item.name}</td>
              <td>{item.company}</td>
              <td>{item.nearplaces}</td>
              <td className={style[perce]}>{item.perc}</td>
            </tr>
          )
        }
        if((item.nearplaces).includes('Зона отдыха')) {
          i++
          let perce;
          if(item.perc <= day * 0.273 * 25 / 100 && item.perc >= 0.01) {
            perce = 'q'
          }
          if(item.perc > day * 0.273 * 25 / 100 && item.perc <= day * 0.273 * 50 / 100) {
            perce = 'w'
          }
          if(item.perc > day * 0.273 * 50 / 100 && item.perc <= day * 0.273 * 75 / 100 ) {
            perce = 'e'
          }
          if(item.perc > day * 0.273 * 75 / 100 && item.perc < day * 0.273) {
            perce = 'r'
          }
          if(item.perc >= day * 0.273 || item.perc >= 100) {
            perce = 't'
          }
          return (
            <tr className={style.modalRow} onClick={() => goToMark(item.latitude, item.longitude)}>
              <td className={style.pint}>{i}</td>
              <td>{item.name}</td>
              <td>{item.company}</td>
              <td>{item.nearplaces}</td>
              <td className={style[perce]}>{item.perc}</td>
            </tr>
          )
        }
        if((item.nearplaces).includes('Зона каршеринга')) {
          i++
          let perce;
          if(item.perc <= day * 0.273 * 25 / 100 && item.perc >= 0) {
            perce = 'q'
          }
          if(item.perc > day * 0.273 * 25 / 100 && item.perc <= day * 0.273 * 50 / 100) {
            perce = 'w'
          }
          if(item.perc > day * 0.273 * 50 / 100 && item.perc <= day * 0.273 * 75 / 100 ) {
            perce = 'e'
          }
          if(item.perc > day * 0.273 * 75 / 100 && item.perc < day * 0.273) {
            perce = 'r'
          }
          if(item.perc >= day * 0.273 || item.perc >= 100) {
            perce = 't'
          }
          return (
            <tr className={style.modalRow} onClick={() => goToMark(item.latitude, item.longitude)}>
              <td className={style.b}>{i}</td>
              <td>{item.name}</td>
              <td>{item.company}</td>
              <td>{item.nearplaces}</td>
              <td className={style[perce]}>{item.perc}</td>
            </tr>
          )
        }
      }) : null
    )
  }

  const chooseLoc = (arg) => (
    arg == '' ? setFind(test) : setFind(test.filter(item => item.name.toUpperCase().includes(arg.toUpperCase())))
  )
  
  const onKeyDown = () => {
    if (modalShow) {
      setModalShow(!modalShow);
    }
  }

  return (
    <>
    <div className={style.gmapContainer} tabIndex="0" onKeyDown={onKeyDown}>
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
          <div className={style.modalContent} >
            <div className={style.modalButton}>
              <div className={style.downloadButton} onClick={exportToXLS}>Скачать</div>
              <input placeholder="Поиск..." id="station" className={style.modalInput} type="text" list="stationList2" onChange={(e) => chooseLoc(e.target.value)}/>
              <datalist id="stationList2" >
                {generateLocationDatalist2()}
              </datalist>
              <div className={style.modalLegend}>
                <div className={`${style.green} ${style.pos}`}>АЗС</div>
                <div className={`${style.gray} ${style.pos}`}>Офисы</div>
                <div className={`${style.yellow} ${style.pos}`}>Торговый объект</div>
                <div className={`${style.blue} ${style.pos}`}>Спортиивный объект</div>
                <div className={`${style.red} ${style.pos}`}>Гостиница</div>
                <div className={`${style.mint} ${style.pos}`}>Объект инфраструктуры</div>
                <div className={`${style.pint} ${style.pos}`}>Зона отдыха</div>
                <div className={`${style.b} ${style.pos}`}>Зона каршеринга</div>
              </div>
              
              <div className={style.close} onClick={openModal}>&times;</div>
            </div>
            <table className={style.table_percent} id='Malanka_report'>
              <tr>
                <th>№</th>
                <th>Локация</th>
                <th>Предприятие</th>
                <th>Места рядом</th>
                <th>Процент окупаемости</th>
              </tr>
              {generateRow()}
            </table>
          </div>
        </div>
      : <div id="myModal" className={style.modal} >
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
