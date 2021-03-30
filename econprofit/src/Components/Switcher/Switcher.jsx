import React, { useEffect, useState }from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import route from '../../back_route';

import style from './Switcher.module.css';

export const Switcher = ({}) => {
  const [activeTable, setActiveTable] = useState('locations');
  const [locations, setLocations] = useState([]);
  const [stations, setStations] = useState([]);
  const [test, setTest] = useState([]);

  useEffect(() => {
    fetch(`${route}/location`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setLocations(data);
      });
    
    fetch(`${route}/station`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setStations(data);
      });
  }, [])

  const generateRow = () => {
    return (
      locations.map(item => (
        <tr>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.address}</td>
          <td>{item.region}</td>
          <td>{item.company}</td>
          <td>{item.latitude}</td>
          <td>{item.longitude}</td>
        </tr>
      ))
    )
  }

  const generateStationRow = () => {
    return (
      stations.map(item => (
        <tr>
          <td>{item.id}</td>
          <td>{item.locationid}</td>
          <td>{item.stationmode}</td>
          <td>{item.friendlycode}</td>
          <td>{item.serialnumber}</td>
          <td>{item.vendor}</td>
          <td>{item.power}</td>
          <td>{item.ip}</td>
        </tr>
      ))
    )
  }

  const changeToLoc = () => {
    setActiveTable('locations')
  }

  const changeToStations = () => {
    setActiveTable('stations')
  }


  return (
    <div className={style.switcherContainer}>
      <div className={style.switcherHeader}>
        <div className={style.switcherPoint} onClick={changeToLoc}>
          Локации
        </div>
        <div className={style.switcherPoint} onClick={changeToStations}>
          Станции
        </div>
        <div className={style.switcherPoint}>
          Сессии
        </div>
      </div>
      <div className={style.switcherMain}>
        {activeTable == 'locations' ? <table>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Адрес</th>
            <th>Область</th>
            <th>Предприятие</th>
            <th>Широта</th>
            <th>Долгота</th>
          </tr>
          {generateRow()}
        </table> : null }
        {activeTable == 'stations' ? <table>
          <tr>
            <th>ID</th>
            <th>Локация</th>
            <th>Тип</th>
            <th>Номер ВНЗ</th>
            <th>Серийный номер</th>
            <th>Производитель</th>
            <th>Мощность</th>
            <th>IP</th>
          </tr>
          {generateStationRow()}
        </table> : null }
        <div className={style.switcherActionNav}>
          <div className={style.switcherPoint}>
            Добавить
          </div>
          <div className={style.switcherPoint}>
            Изменить
          </div>
          <div className={style.switcherPoint}>
            Удалить
          </div>
        </div>
      </div>
    </div>
  )
}
  
const mapStateToProps = state => ({
  page: state.pageReducer.page,
  region: state.pageReducer.region,
});
    
const mapDispatchToProps = {
};
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Switcher));