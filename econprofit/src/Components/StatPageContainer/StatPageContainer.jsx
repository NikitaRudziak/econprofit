import React, { useEffect, useState }from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import route from '../../back_route';
import { Chart } from "react-google-charts";

import style from './StatPageContainer.module.css';

export const StatPageContainer = ({page}) => {
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
    console.log(page);
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
      <div className={style.tableRegion}>
      <table>
        <tr>
          <th>Год</th>
          <th>Загрузка, доля часы</th>
          <th>Постоянные затраты</th>
          <th>Отпущено кВт*ч с учетом потерь 10%</th>
          <th>Стоимость электроэнергии Белэнергоб руб.</th>
          <th>Эквайринг</th>
          <th>Реализация э/э, кВт*ч</th>
          <th>Выручка от реализации, руб.</th>
          <th>Выручка без налогов, руб.</th>
          <th>Затраты на производство и реализацию, руб.</th>
          <th>Прибыль от реализации, руб.</th>
          <th>Налоги из прибыли, руб.</th>
          <th>Чистая прибыль руб.</th>
          <th>Расходы из прибыли</th>
          <th>Капвложения, тыс.руб</th>
          <th>ЧД, тыс. руб</th>
          <th>Накопленный ЧД, тыс. руб</th>
          <th>ЧДД, тыс. руб.</th>
          <th>Накопленный ЧДД, тыс. руб.</th>
        </tr>
        <tr>
          <td>2020</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>0</td>
          <td></td>
          <td></td>
          <td></td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td></td>
          <td>42840</td>
          <td>-42840</td>
          <td>-42840</td>
          <td>-42840</td>
          <td>-42840</td>  
        </tr>
        <tr>
          <td>2021</td>
          <td>0,25</td>
          <td>7260</td>
          <td>5069</td>
          <td>886,16258</td>
          <td>23,244</td>
          <td>4967,6</td>
          <td>1937</td>
          <td>1614</td>
          <td>8169</td>
          <td>-6555</td>
          <td>-1180</td>
          <td>-5375</td>
          <td>-1075</td>
          <td>0</td>
          <td>2700</td>
          <td>-40140</td>
          <td>2457</td>
          <td>-40383</td>  
        </tr>
        <tr>
          <td>2022</td>
          <td>0,75</td>
          <td>7260</td>
          <td>15208</td>
          <td>2658,66256</td>
          <td>69,744</td>
          <td>14903,8</td>
          <td>5812</td>
          <td>4843</td>
          <td>9988</td>
          <td>-5145</td>
          <td>-926</td>
          <td>-4219</td>
          <td>-844</td>
          <td>0</td>
          <td>3625</td>
          <td>-36515</td>
          <td>3009</td>
          <td>-37374</td>
        </tr>
        <tr>
          <td>2023</td>
          <td>1,5</td>
          <td>7 260</td>
          <td>30417</td>
          <td>5317,49994</td>
          <td>139,5</td>
          <td>29808,7</td>
          <td>11625</td>
          <td>9688</td>
          <td>12717</td>
          <td>-3029</td>
          <td>-545</td>
          <td>-2484</td>
          <td>-497</td>
          <td>0</td>
          <td>5013</td>
          <td>-31502</td>
          <td>3760</td>
          <td>-33614</td>
        </tr>
        <tr>
          <td>2024</td>
          <td>3,25</td>
          <td>7 260</td>
          <td>65903</td>
          <td>11521,16246</td>
          <td>302,256</td>
          <td>64584,9</td>
          <td>25188</td>
          <td>20990</td>
          <td>19083</td>
          <td>1907</td>
          <td>343</td>
          <td>1564</td>
          <td>313</td>
          <td>0</td>
          <td>8251</td>
          <td>-23251</td>
          <td>5611</td>
          <td>-28003</td>
        </tr>
        <tr>
          <td>2025</td>
          <td>4,5</td>
          <td>7 260</td>
          <td>91250</td>
          <td>15952,325</td>
          <td>418,512</td>
          <td>89425,0</td>
          <td>34876</td>
          <td>29063</td>
          <td>23631</td>
          <td>5432</td>
          <td>978</td>
          <td>4454</td>
          <td>891</td>
          <td>0</td>
          <td>10563</td>
          <td>-12688</td>
          <td>6549</td>
          <td>-21454</td>
        </tr>
        <tr>
          <td>2026</td>
          <td>5</td>
          <td>7 260</td>
          <td>101389</td>
          <td>17724,82498</td>
          <td>465,012</td>
          <td>99361,2</td>
          <td>38751</td>
          <td>32293</td>
          <td>25450</td>
          <td>6843</td>
          <td>1232</td>
          <td>5611</td>
          <td>1122</td>
          <td>0</td>
          <td>11489</td>
          <td>-1199</td>
          <td>6434</td>
          <td>-15020</td>
        </tr>
        <tr>
          <td>2027</td>
          <td>7</td>
          <td>7 260</td>
          <td>141944</td>
          <td>24814,65008</td>
          <td>651,012</td>
          <td>139105,1</td>
          <td>54251</td>
          <td>45209</td>
          <td>32726</td>
          <td>12483</td>
          <td>2247</td>
          <td>10236</td>
          <td>2047</td>
          <td>0</td>
          <td>15189</td>
          <td>13990</td>
          <td>7746</td>
          <td>-7274</td>
        </tr>
        <tr>
          <td>2028</td>
          <td>8</td>
          <td>7 260</td>
          <td>162222</td>
          <td>28359,65004</td>
          <td>744,012</td>
          <td>158977,6</td>
          <td>62001</td>
          <td>51668</td>
          <td>36364</td>
          <td>15304</td>
          <td>2755</td>
          <td>12549</td>
          <td>2510</td>
          <td>0</td>
          <td>17039</td>
          <td>183</td>
          <td>8008</td>
          <td>734</td>
        </tr>
      </table>
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