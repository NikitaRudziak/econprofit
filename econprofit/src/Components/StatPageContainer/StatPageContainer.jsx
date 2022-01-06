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
  const [byMode, setByMode] = useState();

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
    fetch(`${route}/bymodecountry`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setByMode(data);
        console.log(data)
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

  const stationSum = (array) => {
    let count = 0;
    array.map(item => {
      count += Number(item.count)
    })
    return count;
  }

  return (
    <div className={style.statPageContainer}>
      <div className={style.statPageCardCont}>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div>Краткая информация</div>
            <div>
              <div>AC: {byMode ? byMode[0].count : null} шт.</div>
              <div>DC: {byMode ? byMode[1].count : null} шт.</div>
              <div>AC/DC: {byMode ? byMode[2].count : null} шт.</div>
              <div>Всего: {byMode ? stationSum(byMode) : null} шт.</div>
            </div>
            {/* <div></div> */}
            {/* <div></div> */}
            {/* <div onClick={view}>Выполнение плана по отпуску э/э на 2021</div>
            <div>
              {sum ? ((parseInt((sum[0].sumkw / 2215153 * 100) * 100)) / 100).toLocaleString('ru') : null}%
            </div> */}
          </div>
          <div className={style.statPageCardRight}>
            <span className="material-icons greyground">ev_station</span>
            {/* <span className="material-icons greyground">battery_charging_full</span> */}
          </div>
        </div>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div>Целевой показатель по отпуску э/э на 2022</div>
            <div>{(21052631.58).toLocaleString('ru')} кВт*ч</div>
          </div>
          <div className={style.statPageCardRight}>
            <span className="material-icons greyground">star_rate</span>
          </div>
        </div>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div onClick={view}>Выполнение плана по отпуску э/э на 2022</div>
            <div>
              {sum ? ((parseInt((sum[0].sumkw / 21052631.58  * 100) * 100)) / 100).toLocaleString('ru') : null}%
            </div>
          </div>
          <div className={style.statPageCardRight}>
            <span className="material-icons greyground">battery_charging_full</span>
          </div>
        </div>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div onClick={view}>Отпущено э/э с 01.01.2022</div>
            <div>{sum ? ((parseInt(sum[0].sumkw * 100)) / 100).toLocaleString('ru') : null} кВт*ч</div>
          </div>
          <div className={style.statPageCardRight}>
            <span className="material-icons greyground">ev_station</span>
          </div>
        </div>
        <div className={style.statPageCard} onClick={shareData}>
          <div className={style.statPageCardLeft}>
            <div>Кол-во зарядных сессий с 01.01.2022</div>
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
            <div>{(763578947.37).toLocaleString('ru')} кВт*ч</div>
          </div>
          <div className={style.statPageCardRight}>
            <span className="material-icons greyground">star_rate</span>
          </div>
        </div>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div onClick={view}>Общее выполнение плана по отпуску э/э</div>
            <div>{sum ? ((parseInt(((sum[0].sumkw) / 763578947.37 * 100 ) * 100) + 0,35) / 100).toLocaleString('ru') : null}%</div>
          </div>
          <div className={style.statPageCardRight}>
            <span className="material-icons greyground">battery_charging_full</span>
          </div>
        </div>
        <div className={style.statPageCard}>
          <div className={style.statPageCardLeft}>
            <div>Выручка с 01.01.2022</div>
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
            colors: ['#B9E3C6', '#D81E5B', '#004F2D', 'rgb(154, 155, 161)','#59C9A5', '#FFFD98', '#AFCBFF'],
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
            colors: ['#B9E3C6', '#D81E5B', '#004F2D', 'rgb(154, 155, 161)','#59C9A5', '#FFFD98', '#AFCBFF'],
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
            colors: ['#B9E3C6', '#D81E5B', '#004F2D', 'rgb(154, 155, 161)','#59C9A5', '#FFFD98', '#AFCBFF'],
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
          <td>2021</td>
          <td>0,25</td>
          <td>6936,42</td>
          <td>4563</td>
          <td>797,78</td>
          <td>18,73</td>
          <td>4335,26</td>
          <td>1560,69</td>
          <td>1300,58</td>
          <td>7752,92</td>
          <td>-6452,35</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>3973,99</td>
          <td>-27817,92</td>
          <td>3616,33</td>
          <td>-28175,58</td>  
        </tr>
        <tr>
          <td>2022</td>
          <td>1,66</td>
          <td>6936,42</td>
          <td>30422,88</td>
          <td>5318,53</td>
          <td>124,86</td>
          <td>28901,73</td>
          <td>10404,62</td>
          <td>8670,52</td>
          <td>12379,80</td>
          <td>-3709,28</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>3973,99</td>
          <td>-23843,93</td>
          <td>3298,41</td>
          <td>-24877,17</td>
        </tr>
        <tr>
          <td>2023</td>
          <td>3,66</td>
          <td>6936,42</td>
          <td>66930,33</td>
          <td>11700,76</td>
          <td>274,68</td>
          <td>63583,82</td>
          <td>22890,17</td>
          <td>19075,14</td>
          <td>18911,86</td>
          <td>163,29</td>
          <td>29,39</td>
          <td>133,89</td>
          <td>26,78</td>
          <td>0</td>
          <td>4081,10</td>
          <td>-19762,83</td>
          <td>3060,83</td>
          <td>-21816,34</td>
        </tr>
        <tr>
          <td>2024</td>
          <td>6</td>
          <td>6936,42</td>
          <td>109522,36</td>
          <td>19146,70</td>
          <td>449,48</td>
          <td>104046,24</td>
          <td>27456,65</td>
          <td>31213,87</td>
          <td>26532,60</td>
          <td>4681,28</td>
          <td>842,63</td>
          <td>3838,65</td>
          <td>767,73</td>
          <td>0</td>
          <td>7044,91</td>
          <td>-12717,92</td>
          <td>4790,54</td>
          <td>-17025,80</td>
        </tr>
        <tr>
          <td>2025</td>
          <td>4,5</td>
          <td>6936,42</td>
          <td>212960,15</td>
          <td>37229,69</td>
          <td>873,99</td>
          <td>202312,14</td>
          <td>72832,37</td>
          <td>60693,64</td>
          <td>45040,10</td>
          <td>15653,54</td>
          <td>2817,64</td>
          <td>12835,91</td>
          <td>2567,18</td>
          <td>0</td>
          <td>14242,71</td>
          <td>1524,79</td>
          <td>8830,48</td>
          <td>-8195,32</td>
        </tr>
        <tr>
          <td>2026</td>
          <td>11,66</td>
          <td>6936,42</td>
          <td>219044,72</td>
          <td>38293,40</td>
          <td>898,96</td>
          <td>208092,49</td>
          <td>74913,29</td>
          <td>62427,75</td>
          <td>46128,77</td>
          <td>16298,97</td>
          <td>2933,81</td>
          <td>13365,16</td>
          <td>2673,03</td>
          <td>0</td>
          <td>14666,11</td>
          <td>16190,91</td>
          <td>8213,02</td>
          <td>17,70</td>
        </tr>
        <tr>
          <td>2027</td>
          <td>12,61</td>
          <td>6936,42</td>
          <td>229996,96</td>
          <td>40208,07</td>
          <td>943,91</td>
          <td>218497,11</td>
          <td>78658,96</td>
          <td>65549,13</td>
          <td>48088,39</td>
          <td>17460,74</td>
          <td>3142,93</td>
          <td>14317,81</td>
          <td>2863,56</td>
          <td>0</td>
          <td>15428,23</td>
          <td>31619,14</td>
          <td>7868,40</td>
          <td>7886,10</td>
        </tr>
        <tr>
          <td>2028</td>
          <td>12,61</td>
          <td>6936,42</td>
          <td>229996,96</td>
          <td>40208,07</td>
          <td>943,91</td>
          <td>218497,11</td>
          <td>78658,96</td>
          <td>65549,13</td>
          <td>48088,39</td>
          <td>17460,74</td>
          <td>3142,93</td>
          <td>14317,81</td>
          <td>2863,56</td>
          <td>0</td>
          <td>15428,23</td>
          <td>47047,38</td>
          <td>7251,27</td>
          <td>15137,37</td>
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