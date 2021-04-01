import React, { useEffect, useState }from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import route from '../../back_route';
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import document from "./main.docx";

import style from './Switcher.module.css';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

export const Switcher = () => {
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

  const generateDocument = () => {
    loadFile(document, function(
      error,
      content
    ) {
      if (error) {
        throw error;
      }
      var zip = new PizZip(content);
      var doc = new Docxtemplater().loadZip(zip);
      doc.setData({
        FirstName: "Сусаренко",
        LastName: "Максим",
        position: "Начальник ОЭЗИ"
      });
      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render();
      } catch (error) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function(
              error,
              key
            ) {
              error[key] = value[key];
              return error;
            },
            {});
          }
          return value;
        }
        console.log(JSON.stringify({ error: error }, replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors
            .map(function(error) {
              return error.properties.explanation;
            })
            .join("\n");
          console.log("errorMessages", errorMessages);
          // errorMessages is a humanly readable message looking like this :
          // 'The tag beginning with "foobar" is unopened'
        }
        throw error;
      }
      var out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      }); //Output the document using Data-URI
      saveAs(out, "output.docx");
    });
  };



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
          <div className={style.switcherPoint} onClick={generateDocument}>
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