import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import style from './ByRegionContainer.module.css';
import { useParams } from 'react-router-dom'
import route from '../../back_route';
import { Chart } from "react-google-charts";
import img from '../StatPageContainer/data.png'

export const ByRegionContainer = (props) => {
  const [test, setTest] = useState();
  const [sessions, setSessions] = useState();
  const [totalkwh, settotalkwh] = useState();
  const [totalcost, settotalcost] = useState();
  const [totalsessions, settotalsessions] = useState();
  const [failed, setFailed] = useState();
  const [perSession, setPerSession] = useState();
  const [byType, setByType] = useState([]);
  const [byTypecash, setByTypecash] = useState();
  const [count, setCount] = useState();
  const [modalShow, setModalShow] = useState(false);

  const [regionStat, setRegionStat] = useState();
  const [region, setRegion] = useState(1);
  const [sessionsStat, setSessionsStat] = useState();
  const [regCount, setRegCount] = useState();
  const [byConnector, setByConnector] = useState();
  const [br, setBr] = useState()
  const [dest, setDest] = useState([])

  useEffect(() => {
    fetch(`${route}/regionstat`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setRegionStat(data);
        // console.log(data)
      });
    fetch(`${route}/regionsess`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setSessionsStat(data);
        // console.log(data)
      });
    fetch(`${route}/regioncount`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setRegCount(data);
        // console.log(data)
      });
    fetch(`${route}/bymode`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setByConnector(data);
        // console.log(data)
      });
    fetch(`${route}/timespendbyregion`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setBr(data);
        // console.log(data)
      });
    fetch(`${route}/timespendbyregion`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setBr(data);
        // console.log(data)
      });
    fetch(`${route}/dest`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setDest(data);
        // console.log(data)
      });
  }, [])

  useEffect(() => {
    let totalkwh=0;
    let totalcost=0;
    let totalsessions=0;
    let failed = 0;
    let perSession = 0;
    let type2 = 0;
    let type2cash = 0;
    let type2count = 0;
    let ccs = 0;
    let ccscash = 0;
    let ccscount = 0;
    let chademo = 0;
    let chademocash = 0;
    let chademocount = 0;
    let type2plug = 0;
    let type2plugcash = 0;
    let type2plugcount = 0;
    let kwharr = [];
    let casharr = [];
    let arrcount = [];

    if(sessions) {
      sessions.map(item => {
        totalkwh += Number(item.kwh);
        totalcost += Number(item.totalcost);
        totalsessions += 1;
        if (Number(item.kwh) < 0.5) {
          failed += 1
        }
        if (item.connector == 'Вилка Type 2') {
          type2 += Number(item.kwh);
          type2cash += Number(item.totalcost);
          type2count++;
        }
        if (item.connector == 'Пистолет CCS') {
          ccs += Number(item.kwh)
          ccscash += Number(item.totalcost)
          ccscount++
        }
        if (item.connector == 'Пистолет CHAdeMO') {
          chademo += Number(item.kwh)
          chademocash += Number(item.totalcost)
          chademocount++
        }
        if (item.connector == 'Розетка Type 2') {
          type2plug += Number(item.kwh)
          type2plugcash += Number(item.totalcost)
          type2plugcount++;
        }
      }) 
    }
    arrcount.push(type2count, ccscount, chademocount, type2plugcount)
    kwharr.push(type2, ccs, chademo, type2plug);
    casharr.push(type2cash, ccscash, chademocash, type2plugcash);
    perSession = (parseInt((totalkwh / (totalsessions - failed)) * 100)) / 100;
    settotalkwh(totalkwh)
    settotalcost(totalcost)
    settotalsessions(totalsessions)
    setFailed(failed)
    setPerSession(perSession)
    setByType(kwharr)
    setByTypecash(casharr)
    setCount(arrcount);
    setRegion(1)
  }, [sessions])


  const openModal = () => {
    setModalShow(!modalShow)
  }

  const getGoal = (item) => {
    if(item == 0) { //брест
      return 52
    }
    if(item == 1) { //витебск
      return 46
    }
    if(item == 2) { //гомель
      return 56
    }
    if(item == 3) { //гродно
      return 64
    }
    if(item == 4) { //минск
      return 41
    }
    if(item == 5) { //минскобл
      return 40
    }
    if(item == 6) { //могилев
      return 29
    }
  }

  const getDest = () => {
    let num = 0;
    dest.map(item => {
      if(item.company == props.reg && item.destination == 'Областной центр') {
        num = item.count;
      }
      if(item.company == 'Минскоблнефтепродукт' && item.destination == 'Областной центр') {
        num = 0;
      }
      
    })
    return num;
  }
  
  const getAzs = () => {
    let azs = 0;
    console.log(dest);
    dest.map(item => {
      if(item.company == props.reg && item.nearplaces == 'АЗС') {
        azs = item.count;
      }
      
    })
    return azs;
  }

  return (
    <>
    {props.region ? <div className={style.stationMainContainer}>
      <div className={style.addressRegion}>
        <div>
          {/* {props.region && regionStat ? regionStat[props.region - 1].company : null} */}
          {props.naming ? props.naming : null}
        </div>
        <div className={style.tableButton} onClick={openModal}>
          Расчет окупаемости
        </div>
      </div>
      <div className={style.mainRegion}>
        <div className={style.leftLine}>
          <div className={style.stationInfo}>
            <div className={style.stationInfoHeader}>
              Краткая информация
            </div>
            <div className={style.stationInfoMain}>
              <div >
                <b>Принадлежность:</b> {props.region && regionStat ? regionStat[props.region - 1].company : null}
              </div>
              <div>
                <b>Кол-во станций:</b> {regCount && props.region ? regCount[props.region - 1].count + ' из ' + getGoal(props.region - 1) : null} 
              </div>
              <div>
                <b>Целевой показатель:</b> {regCount && props.region ? 
                  (getGoal(props.region - 1) * 1103437).toLocaleString('ru') : null} 
                {/* (Number(regCount[props.region - 1].count) * 1103437).toLocaleString('ru') : null}  */}
                 кВт*ч
              </div>
              <div >
                <b>В областном центре:</b> {dest ? getDest() : null} шт.
                {/* {props.region && regionStat ? regionStat[props.region - 1].company : null} */}
              </div>
              {/* <div >
                <b>На территории АЗС:</b> {dest ? getAzs() : null} шт.
              </div> */}
              <div>
                
              </div>
            </div>
          </div>
          <div className={style.stationInfo2}>
            <div className={style.stationInfoHeader}>
              Информация о станциях
            </div>
            <div className={style.stationInfoMain}>
              <div><b>ЭЗС переменного тока: </b> {props.region && byConnector ? byConnector[3 * (props.region - 1)].count : null} ед.</div>
              <div><b>ЭЗС постоянного тока: </b> {props.region && byConnector ? byConnector[3 * (props.region - 1) + 1].count : null} ед.</div>
              <div><b>Комбинированные ЭЗС: </b> {props.region && byConnector ? byConnector[3 * (props.region - 1) + 2].count : null} ед.</div>
              <div></div>
            </div>
          </div>
        </div>
        <div className={style.topLine}>
          <div className={style.stationInfoStat}>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Целевой показатель по отпуску э/э на 2022</div>
                <div>
                  {(getGoal(props.region - 1) * 30422).toLocaleString('ru')} кВт*ч
                </div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">star_rate</span>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Отпущено э/э с 01.01.2022</div>
                  <div>{props.region && regionStat ? ((parseInt(regionStat[props.region - 1].totalkwh * 100)) / 100).toLocaleString('ru') : null} кВт*ч</div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">ev_station</span>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Выполнение плана по отпуску э/э на 2022</div>
                <div>
                  {regCount && props.region && regionStat ?
                    ((parseInt((regionStat[props.region - 1].totalkwh / (regCount[props.region - 1].count * 30422) * 100) * 100)) / 100).toLocaleString('ru')
                  : null}%
                </div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">battery_charging_full</span>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>В среднем за одну зарядную сессию</div>
                <div>
                  {regionStat && props.region ? (regionStat[props.region - 1].totalkwh / regionStat[props.region - 1].count).toLocaleString('ru') : null} кВт*ч
                </div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">electric_car</span>
              </div>
            </div>
          </div>

          <div className={style.stationInfoStat}>
            <div className={style.statPageCardMiddle}>
              <div className={style.statPageCardLeft}>
                <div>Кол-во зарядных сессий с 01.01.2022</div>
                <div>{props.region && regionStat ? ((parseInt(regionStat[props.region - 1].count * 100)) / 100).toLocaleString('ru') : null} ед.</div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">account_box</span>
              </div>
            </div>
            <div className={style.statPageCardMiddle}>
              <div className={style.statPageCardLeft}>
                <div>Выручка с 01.01.2022</div>
                  <div>{props.region && regionStat ? ((parseInt(regionStat[props.region - 1].totalcost * 100)) / 100).toLocaleString('ru') : null} руб.</div>
              </div>
              <div className={style.statPageCardRight}>
              <span className="material-icons greyground">monetization_on</span>
              </div>
            </div>
            <div className={style.statPageCardMiddle}>
              <div className={style.statPageCardLeft}>
                <div>Средняя продолжительность одной зарядной сессии</div>
                <div>
                  {props.region && regionStat && br && br[0].timespend ?
                      br[props.region-1].timespend.hours ? br[props.region-1].timespend.hours + ' ч. ' + br[props.region-1].timespend.minutes
                      : br[props.region-1].timespend.minutes
                    : 'Нет данных'
                  } мин.
                </div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">timer</span>
              </div>
            </div>
          </div>
        </div>
      </div>  
      <div className={style.chartsLine}>
        <Chart
          width={'500px'}
          height={'400px'}
          chartType="PieChart"
          loader={<div>Загрузка</div>}
          data={[
            ['Task', 'Hours per Day'],
            ['Пистолет Chademo', sessionsStat && props.region ? Number(sessionsStat[4 * (props.region - 1) + 2].sum) : null],
            ['Пистолет CCS', sessionsStat && props.region ? Number(sessionsStat[4 * (props.region - 1) + 1].sum) : null],
            ['Вилка Type2', sessionsStat && props.region ? Number(sessionsStat[4 * (props.region - 1)].sum) : null],
            ['Розетка Type2', sessionsStat && props.region ? Number(sessionsStat[4 * (props.region - 1) + 3].sum) : null],
          ]}
          options={{
            title: 'Отпущено по коннекторам, кВт*ч',
            is3D: true,
            colors: ['rgb(164,203,158)', 'rgb(180,210,172)', 'rgb(245,228,50)','rgb(248,237,129)'],
            titleTextStyle: {
              fontSize: 16,
            },
            pieSliceTextStyle: {
              fontSize: 13,
              color: 'black'
            }
          }}
          rootProps={{ 'data-testid': '2' }}
        />
        <Chart
          width={'500px'}
          height={'400px'}
          chartType="PieChart"
          loader={<div>Загрузка</div>}
          data={[
            ['Task', 'Hours per Day'],
            ['Пистолет Chademo', sessionsStat && props.region ? Number(sessionsStat[4 * (props.region - 1) + 2].totalcost) : null],
            ['Пистолет CCS', sessionsStat && props.region ? Number(sessionsStat[4 * (props.region - 1) + 1].totalcost) : null],
            ['Вилка Type2', sessionsStat && props.region ? Number(sessionsStat[4 * (props.region - 1)].totalcost) : null],
            ['Розеткка Type2', sessionsStat && props.region ? Number(sessionsStat[4 * (props.region - 1) + 3].totalcost) : null],
          ]}
          options={{
            title: 'Распределение выручки по коннекторам, руб.',
            is3D: true,
            colors: ['rgb(164,203,158)', 'rgb(180,210,172)', 'rgb(245,228,50)','rgb(248,237,129)'],
            titleTextStyle: {
              fontSize: 16,
            },
            pieSliceTextStyle: {
              fontSize: 13,
              color: 'black'
            }
          }}
          rootProps={{ 'data-testid': '2' }}
        />
        <Chart
          width={'500px'}
          height={'400px'}
          chartType="PieChart"
          loader={<div>Загрузка</div>}
          data={[
            ['Task', 'Hours per Day'],
            ['Пистолет Chademo', sessionsStat && props.region ? Number(sessionsStat[4* (props.region - 1) + 2].count) : null],
            ['Пистолет CCS', sessionsStat && props.region ? Number(sessionsStat[4 * (props.region - 1) + 1].count) : null],
            ['Вилка Type2', sessionsStat && props.region ? Number(sessionsStat[4 * (props.region - 1)].count) : null],
            ['Розеткка Type2', sessionsStat && props.region ? Number(sessionsStat[4 * (props.region - 1) + 3].count) : null],
          ]}
          options={{
            title: 'Количество зарядных сессий, ед.',
            is3D: true,
            colors: ['rgb(164,203,158)', 'rgb(180,210,172)', 'rgb(245,228,50)','rgb(248,237,129)'],
            titleTextStyle: {
              fontSize: 16,
            },
            pieSliceTextStyle: {
              fontSize: 13,
              color: 'black'
            }
          }}
          rootProps={{ 'data-testid': '2' }}
        />
      </div>
    </div> : <Redirect to="/maff/main"/> }
    {modalShow 
      ? <div id="myModal" className={style.modalOpen}> 
          <div className={style.modalContent}>
            <span className={style.close} onClick={openModal}>&times;</span>
            <h2>Расчет окупаемости для одной среднестат. ЭЗС</h2>
            <h4>Срок окупаемости(простой): 5,7 лет</h4>
            <h4>Срок окупаемости(дисконтированный): 8,3 лет</h4>
            <img className={style.table_png} src={img} alt="" />
            {/* <table>
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
            </table> */}
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

const mapStateToProps = (state) => ({
  page: state.pageReducer.page,
  region: state.pageReducer.region,
});
    
const mapDispatchToProps = {
};
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ByRegionContainer));