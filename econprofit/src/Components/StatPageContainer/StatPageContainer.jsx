import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import route from '../../back_route';
import { Chart } from "react-google-charts";

import style from './StatPageContainer.module.css';

export const StatPageContainer = () => {
  const [test, setTest] = useState([]);
  const [sum, setSum] = useState()
  const [failed, setFailed] = useState();
  const [chademoKwh, setChademoKwh] = useState();
  const [ccsKwh, setCCSKwh] = useState();
  const [type2Kwh, setType2Kwh] = useState();
  const [type2plugkwh, setType2plugkwh] = useState();

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
    fetch(`${route}/chademo`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setChademoKwh(data)
        console.log(data)
      })
      .catch(function (error) {
        console.log(error);
      });
    fetch(`${route}/ccs`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setCCSKwh(data)
        console.log(data)
      })
      .catch(function (error) {
        console.log(error);
      });
    fetch(`${route}/type2`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setType2Kwh(data)
        console.log(data)
      })
      .catch(function (error) {
        console.log(error);
      });
    fetch(`${route}/type2plug`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setType2plugkwh(data)
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
            <div>{sum ? (parseInt(sum[0].sumkw * 100)) / 100 : null} кВт*ч</div>
          </div>
          <div className={style.statPageCardRight}>
            <i class="las la-charging-station"></i>
          </div>
        </div>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div>Заработано</div>
            <div>{sum ? (parseInt(sum[0].sumtotal * 100)) / 100 : null} руб.</div>
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
            <div>
              {(failed && sum) ? (parseInt((100 - (failed[0].failedsessioncount / sum[0].sessioncount * 100)) * 100)) / 100 : null}%
              </div>
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
      <div className={style.chartRegion}>
        <Chart
          width={'370px'}
          height={'280px'}
          chartType="PieChart"
          loader={<div>Загрузка</div>}
          data={[
            ['Task', 'Hours per Day'],
            ['Пистолет Chademo', chademoKwh ? Number(chademoKwh[0].chademokwh) : null],
            ['Пистолет CCS', ccsKwh ? Number(ccsKwh[0].ccskwh) : null],
            ['Вилка Type2', type2Kwh ? Number(type2Kwh[0].type2kwh) : null],
            ['Розеткка Type2', type2plugkwh ? Number(type2plugkwh[0].type2plugkwh) : null],
          ]}
          options={{
            title: 'По типу коннектора',
            is3D: true,
          }}
          rootProps={{ 'data-testid': '2' }}
        />
        <Chart
          width={'370px'}
          height={'280px'}
          chartType="PieChart"
          loader={<div>Загрузка</div>}
          data={[
            ['Task', 'Hours per Day'],
            ['Пистолет Chademo', chademoKwh ? Number(chademoKwh[0].chademototal) : null],
            ['Пистолет CCS', ccsKwh ? Number(ccsKwh[0].ccstotal) : null],
            ['Вилка Type2', type2Kwh ? Number(type2Kwh[0].type2total) : null],
            ['Розеткка Type2', type2plugkwh ? Number(type2plugkwh[0].type2plugtotal) : null],
          ]}
          options={{
            title: 'По типу коннектора',
            is3D: true,
          }}
          
          rootProps={{ 'data-testid': '2' }}
        />
        <Chart
          width={'370px'}
          height={'280px'}
          chartType="PieChart"
          loader={<div>Загрузка</div>}
          data={[
            ['Task', 'Hours per Day'],
            ['Пистолет Chademo', chademoKwh ? Number(chademoKwh[0].sessioncount) : null],
            ['Пистолет CCS', ccsKwh ? Number(ccsKwh[0].sessioncount) : null],
            ['Вилка Type2', type2Kwh ? Number(type2Kwh[0].sessioncount) : null],
            ['Розеткка Type2', type2plugkwh ? Number(type2plugkwh[0].sessioncount) : null],
          ]}
          options={{
            title: 'По типу коннектора',
            is3D: true,
          }}
          rootProps={{ 'data-testid': '2' }}
        />
        <Chart
          width={'375px'}
          height={'280px'}
          chartType="PieChart"
          loader={<div>Загрузка</div>}
          data={[
            ['Task', 'Hours per Day'],
            ['Успешные', (failed && sum) ? sum[0].sessioncount - failed[0].failedsessioncount : null],
            ['Неуспешные', failed ? Number(failed[0].failedsessioncount) : null],
          ]}
          options={{
            title: 'Сессии',
            is3D: true,
          }}
          rootProps={{ 'data-testid': '2' }}
        />
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