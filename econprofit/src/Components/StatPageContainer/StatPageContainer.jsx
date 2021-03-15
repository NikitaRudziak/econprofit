import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import route from '../../back_route';

import style from './StatPageContainer.module.css';

export const StatPageContainer = () => {
  const [test, setTest] = useState([]);
  const [sum, setSum] = useState()
  const [failed, setFailed] = useState();

  useEffect(() => {
    fetch(`${route}/summaryValues`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setSum(data)
        console.log(data)
      })
      .catch(function (error) {
        console.log(error);
      });
    fetch(`${route}/summaryFailed`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setFailed(data)
        console.log(data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  const shareData = () => {
    fetch(`${route}/test`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let arr = [];
        data['Content'].map(item => {
          let obj = {
            friendlyCode: Number(item['ChargePoint']['FriendlyCode'].substr(-12)),
            chargingFrom: item['ChargingFrom'].replace('T', ' ').slice(0, -1),
            chargingTo: item['ChargingTo'] .replace('T', ' ').slice(0, -1),
            kWh: item['MeterActiveEnergyEnd'],
            totalCost: item['TotalCost'] ? item['TotalCost'] : 0.0,
            email: item['Identification']['User']['Email'],
            connector: item['Connector']['Type']['Title']
          }
          console.log(obj)
          arr.push(obj);
        })
        setTest(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // const sendNewDay = () => {
  //   test.map(item => {
  //     // console.log(item)
  //     fetch(`${route}/newDay`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(item),
  //     })
  //       .then(response => {
  //         return response.text();
  //       })
  //       .then(data => {
  //         // alert(data);
  //       })
  //       .catch (function (error) {
  //         console.log(error);
  //       });
  //   })
  // }

  return (
    <div className={style.statPageContainer}>
      <div className={style.statPageCardCont}>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div>Отпущено</div>
            <div>{sum ? sum[0].sumkw : null} кВт</div>
          </div>
          <div className={style.statPageCardRight}>
            <i class="las la-charging-station"></i>
          </div>
        </div>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div>Заработано</div>
            <div>{sum ? sum[0].sumtotal : null} руб.</div>
          </div>
          <div className={style.statPageCardRight}>
            <i class="las la-coins"></i>
          </div>
        </div>
        <div className={style.statPageCard} onClick={shareData}>
          <div className={style.statPageCardLeft}>
            <div>Кол-во сессий</div>
            <div>{sum ? sum[0].sessioncount : null}</div>
          </div>
          <div className={style.statPageCardRight}>
            <i class="las la-user-clock"></i>
          </div>
        </div>
        <div className={style.statPageCard} 
        // onClick={sendNewDay}
        >
          <div className={style.statPageCardLeft}>
            <div>Успешные</div>
            <div>{failed ? 100 - (failed[0].failedsessioncount / sum[0].sessioncount * 100) : null}%</div>
          </div>
          <div className={style.statPageCardRight}>
            <i class="las la-check-double"></i>
          </div>
        </div>
        {/* <div className={style.statPageCard}></div>
        <div className={style.statPageCard}></div>
        <div className={style.statPageCard}></div>
        <div className={style.statPageCard}></div> */}
        
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
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatPageContainer));