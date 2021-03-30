import React, { useEffect, useState }from 'react';
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
  const [byRegion, setByRegion] = useState();
  const [byConnector, setByConnector] = useState();
  const [lastDate, setLastDate] = useState();

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
    fetch(`${route}/summarybyregion`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setByRegion(data)
        console.log(data)
      })
      .catch(function (error) {
        console.log(error);
      });
      
    fetch(`${route}/byconnector`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setByConnector(data)
        console.log(data)
      })
      .catch(function (error) {
        console.log(error);
      });
    fetch(`${route}/lastdate`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setLastDate(data)
        console.log(data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  const shareData = () => {
    var d = new Date()
    var od = new Date(lastDate[0].chargingfrom),
    to = '',
    from = '';
    to = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()
    from = od.getFullYear() + '-' + (od.getMonth()+1) + '-' + (od.getDate()+1)
    fetch(`${route}/test/${from}/${to}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let cnt = 0;
        let arr = [];
        data['Content'].map(item => {
          let obj = {
            friendlyCode: Number(item['ChargePoint']['FriendlyCode'].substr(-12)),
            chargingFrom: item['ChargingFrom'].replace('T', ' ').slice(0, -1),
            chargingTo: item['ChargingTo'] ? item['ChargingTo'].replace('T', ' ').slice(0, -1) : null,
            kWh: item['MeterActiveEnergyEnd'],
            totalCost: item['TotalCost'] ? item['TotalCost'] : 0.0,
            email: item['Identification']['User']['Email'],
            connector: item['Connector']['Type']['Title']
          }
          console.log(cnt+=1)
          arr.push(obj);
        })
        setTest(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const sendNewDay = () => {
    test.map(item => {
      fetch(`${route}/newDay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })
        .then(response => {
          return response.text();
        })
        .then(data => {
        })
        .catch (function (error) {
          console.log(error);
        });
    })
  }

  const view = () => {
    console.log(test);
  }

  return (
    <div className={style.statPageContainer}>
      <div className={style.statPageCardCont}>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div>Целевой показатель по отпуску э/э на 2021</div>
            <div>{(2215153).toLocaleString('ru')} кВт*ч</div>
          </div>
          <div className={style.statPageCardRight}>
            <span className="material-icons greyground">star_rate</span>
          </div>
        </div>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div onClick={view}>Выполнение плана по отпуску э/э на 2021</div>
            <div>
              {sum ? ((parseInt((sum[0].sumkw / 2215153 * 100) * 100)) / 100).toLocaleString('ru') : null}%
            </div>
          </div>
          <div className={style.statPageCardRight}>
            <span className="material-icons greyground">battery_charging_full</span>
          </div>
        </div>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div onClick={view}>Отпущено э/э с 01.01.2021</div>
            <div>{sum ? ((parseInt(sum[0].sumkw * 100)) / 100).toLocaleString('ru') : null} кВт*ч</div>
          </div>
          <div className={style.statPageCardRight}>
            <span className="material-icons greyground">ev_station</span>
          </div>
        </div>
        <div className={style.statPageCard} onClick={shareData}>
          <div className={style.statPageCardLeft}>
            <div>Кол-во зарядных сессий с 01.01.2021</div>
            <div>{sum ? (Number(sum[0].sessioncount)).toLocaleString('ru') : null} ед.</div>
          </div>
          <div className={style.statPageCardRight}>
            <span className="material-icons greyground">account_box</span>
          </div>
        </div>
      </div>

      <div className={style.statPageCardCont}>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div>Целевой показатель по отпуску э/э для обеспечения окупаемости</div>
            <div>{(268056674).toLocaleString('ru')} кВт*ч</div>
          </div>
          <div className={style.statPageCardRight}>
            <span className="material-icons greyground">star_rate</span>
          </div>
        </div>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div onClick={view}>Общее выполнение плана по отпуску э/э</div>
            <div>{sum ? ((parseInt((sum[0].sumkw / 268056674 * 100) * 100)) / 100).toLocaleString('ru') : null}%</div>
          </div>
          <div className={style.statPageCardRight}>
            <span className="material-icons greyground">battery_charging_full</span>
          </div>
        </div>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div>Выручка с 01.01.2021</div>
            <div>{sum ? ((parseInt(sum[0].sumtotal * 100)) / 100).toLocaleString('ru') : null} руб.</div>
          </div>
          <div className={style.statPageCardRight}>
            <span className="material-icons greyground">monetization_on</span>
          </div>
        </div>
        
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div onClick={sendNewDay}>Успешные зарядные сессии</div>
            <div>
              {(failed && sum) ? 
                (failed[0].failedsessioncount && sum[0].sessioncount) ?
                ((parseInt((100 - (failed[0].failedsessioncount / sum[0].sessioncount * 100)) * 100)) / 100).toLocaleString('ru') 
                : '-'
                : null}%
            </div>
          </div>
          <div className={style.statPageCardRight}>
            <span className="material-icons greyground">done_outline</span>
          </div>
        </div>
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
            title: 'Отпущено по типу коннектора, кВт*ч',
            is3D: true,
            colors: ['rgb(164,203,158)', 'rgb(180,210,172)', 'rgb(245,228,50)','rgb(248,237,129)'],
            titleTextStyle: {
              fontSize: 14,
            },
            pieSliceTextStyle: {
              fontSize: 13,
              color: 'black'
            }
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
            title: 'Выручка по типу коннектора, руб.',
            is3D: true,
            colors: ['rgb(164,203,158)', 'rgb(180,210,172)', 'rgb(245,228,50)','rgb(248,237,129)'],
            titleTextStyle: {
              fontSize: 14
            },
            pieSliceTextStyle: {
              fontSize: 13,
              color: 'black'
            }
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
            title: 'Количество сессий по типу коннектора, ед.',
            is3D: true,
            colors: ['rgb(164,203,158)', 'rgb(180,210,172)', 'rgb(245,228,50)','rgb(248,237,129)'],
            titleTextStyle: {
              fontSize: 14
            },
            pieSliceTextStyle: {
              fontSize: 13,
              color: 'black'
            }
          }}
          rootProps={{ 'data-testid': '2' }}
        />
        {/* <Chart
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
        /> */}
        <Chart
          width={'400px'}
          height={'280px'}
          chartType="PieChart"
          loader={<div>Загрузка</div>}
          data={[
            ['Task', 'Hours per Day'],
            ['Пистолет CHAdeMO', (chademoKwh && byConnector) ? Number(byConnector[1].sumkwh) / Number(chademoKwh[0].sessioncount) : null],
            ['Пистолет CCS', (ccsKwh && byConnector) ? Number(byConnector[3].sumkwh) / Number(ccsKwh[0].sessioncount) : null],
            ['Вилка Type 2', (type2Kwh && byConnector) ? Number(byConnector[2].sumkwh) / Number(type2Kwh[0].sessioncount) : null],
            ['Розетка Type 2', (type2plugkwh && byConnector) ? Number(byConnector[0].sumkwh) / Number(type2plugkwh[0].sessioncount) : null],
          ]}
          options={{
            title: 'Среднее время зарядной сессии, мин.',
            is3D: true,
            colors: ['rgb(164,203,158)', 'rgb(180,210,172)', 'rgb(245,228,50)','rgb(248,237,129)'],
            titleTextStyle: {
              fontSize: 14
            },
            pieSliceTextStyle: {
              fontSize: 13,
              color: 'black'
            }
          }}
          rootProps={{ 'data-testid': '2' }}
        />
      </div>
      <div className={style.chartRegion}>
        <Chart
          width={'370px'}
          height={'280px'}
          chartType="PieChart"
          loader={<div>Загрузка</div>}
          data={[
            ['Task', 'Hours per Day'],
            [byRegion ? byRegion[0].company : null, byRegion ? Number(byRegion[0].sumkwh) : null],
            [byRegion ? byRegion[1].company : null, byRegion ? Number(byRegion[1].sumkwh) : null],
            [byRegion ? byRegion[2].company : null, byRegion ? Number(byRegion[2].sumkwh) : null],
            [byRegion ? byRegion[6].company : null, byRegion ? Number(byRegion[6].sumkwh) : null],
            [byRegion ? byRegion[4].company : null, byRegion ? Number(byRegion[4].sumkwh) : null],
            [byRegion ? byRegion[5].company : null, byRegion ? Number(byRegion[5].sumkwh) : null],
            [byRegion ? byRegion[3].company : null, byRegion ? Number(byRegion[3].sumkwh) : null],
          ]}
          options={{
            title: 'Отпущено по предприятиям и г.Минск, кВт*ч',
            is3D: true,
            colors: ['#B9E3C6', 'rgb(154, 155, 161)', '#D81E5B','#59C9A5', '#FFFD98', '#AFCBFF', '#004F2D'],
            titleTextStyle: {
              fontSize: 14
            },
            pieSliceTextStyle: {
              fontSize: 13
            }
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
            [byRegion ? byRegion[0].company : null, byRegion ? Number(byRegion[0].sumtotal) : null],
            [byRegion ? byRegion[1].company : null, byRegion ? Number(byRegion[1].sumtotal) : null],
            [byRegion ? byRegion[2].company : null, byRegion ? Number(byRegion[2].sumtotal) : null],
            [byRegion ? byRegion[6].company : null, byRegion ? Number(byRegion[6].sumtotal) : null],
            [byRegion ? byRegion[4].company : null, byRegion ? Number(byRegion[4].sumtotal) : null],
            [byRegion ? byRegion[5].company : null, byRegion ? Number(byRegion[5].sumtotal) : null],
            [byRegion ? byRegion[3].company : null, byRegion ? Number(byRegion[3].sumtotal) : null],
          ]}
          options={{
            title: 'Выручка по предприятиям и г.Минск, руб.',
            is3D: true,
            colors: ['#B9E3C6', 'rgb(154, 155, 161)', '#D81E5B','#59C9A5', '#FFFD98', '#AFCBFF', '#004F2D'],
            titleTextStyle: {
              fontSize: 14
            },
            pieSliceTextStyle: {
              fontSize: 13
            }
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
            [byRegion ? byRegion[0].company : null, byRegion ? Number(byRegion[0].count) : null],
            [byRegion ? byRegion[1].company : null, byRegion ? Number(byRegion[1].count) : null],
            [byRegion ? byRegion[2].company : null, byRegion ? Number(byRegion[2].count) : null],
            [byRegion ? byRegion[6].company : null, byRegion ? Number(byRegion[6].count) : null],
            [byRegion ? byRegion[4].company : null, byRegion ? Number(byRegion[4].count) : null],
            [byRegion ? byRegion[5].company : null, byRegion ? Number(byRegion[5].count) : null],
            [byRegion ? byRegion[3].company : null, byRegion ? Number(byRegion[3].count) : null],
          ]}
          options={{
            title: 'Количество сессий по предприятиям и г.Минск, ед.',
            is3D: true,
            colors: ['#B9E3C6', 'rgb(154, 155, 161)', '#D81E5B','#59C9A5', '#FFFD98', '#AFCBFF', '#004F2D'],
            titleTextStyle: {
              fontSize: 14
            },
            pieSliceTextStyle: {
              fontSize: 13
            }
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
            ['Успешные', (sum && failed) ? Number(sum[0].sessioncount) - Number(failed[0].failedsessioncount) : null],
            ['С ошибкой', failed ? Number(failed[0].failedsessioncount) : null],
          ]}
          options={{
            title: 'Зарядные сессии, ед.',
            is3D: true,
            colors: ['#C2F261', '#EF798A'],
            titleTextStyle: {
              fontSize: 14,
            },
            pieSliceTextStyle: {
              fontSize: 13,
              color: 'black'
            },
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