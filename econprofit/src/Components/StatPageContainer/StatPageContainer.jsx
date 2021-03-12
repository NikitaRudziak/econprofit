import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import route from '../../back_route';

import style from './StatPageContainer.module.css';

export const StatPageContainer = () => {
  const [test, setTest] = useState([]);

  useEffect(() => {
    fetch(`${route}/test`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        data['Content'].map(item => {
          let obj = {
            friendlyCode: item['ChargePoint']['FriendlyCode'].substr(-12),
            chargingFrom: item['ChargingFrom'],
            chargingTo: item['ChargingTo'],
            kWh: item['MeterActiveEnergyEnd'],
            totalCost: item['TotalCost'],
            email: item['Identification']['User']['Email'],
            connector: item['Connector']['Type']['Title']
          }
          console.log(obj)
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  return (
    <div className={style.statPageContainer}>
      <div className={style.statPageCardCont}>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div>Отпущено кВт</div>
            <div></div>
          </div>
          <div className={style.statPageCardRight}>
            <i class="las la-charging-station"></i>
          </div>
        </div>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div>Заработано руб.</div>
            <div></div>
          </div>
          <div className={style.statPageCardRight}>
            <i class="las la-coins"></i>
          </div>
        </div>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div>Кол-во сессий</div>
            <div></div>
          </div>
          <div className={style.statPageCardRight}>
            <i class="las la-user-clock"></i>
          </div>
        </div>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div>Успешные</div>
            <div></div>
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