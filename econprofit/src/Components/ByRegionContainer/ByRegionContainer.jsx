import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import style from './ByRegionContainer.module.css';
import { useParams } from 'react-router-dom'
import route from '../../back_route';
import { Chart } from "react-google-charts";

export const ByRegionContainer = (props) => {
  const { id } = useParams();
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

  useEffect(() => {
    // fetch(`../${route}/locationinfo/${id}`)
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     setTest(data);
    //   });
    //   fetch(`../${route}/locationinfo/${id}`)
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     setTest(data);
    //   });



    
    fetch(`${route}/regionstat`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setRegionStat(data);
        console.log(data)
      });
    fetch(`${route}/regionsess`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setSessionsStat(data);
        console.log(data)
      });
    fetch(`${route}/regioncount`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setRegCount(data);
        console.log(data)
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
    // setQuery();
  }, [sessions])

  // const setQuery = () => {
  //   fetch(`${route}/regionsess/:${regionStat[region - 1].company}`)
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       setSessionsStat(data);
  //       console.log(data)
  //     });
  // }

  const dataSet  = () => {

  }

  const view = () => {
    var d = new Date(),
    datestring = '';
    datestring = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()
    console.log(test)
    console.log(datestring)
  }
    const view2 = () => {
    console.log(region)
    console.log(props.region)
    console.log(props.naming)
  }

  const generateRow = () => {
    return (
      test ? test.map(item => (
        <tr>
          <td>{item.power}</td>
          <td>{item.serialnumber}</td>
          <td>{item.friendlycode}</td>
        </tr>
      )) : null
    )
  }

  const openModal = () => {
    setRegion(region + 1)
    // setModalShow(!modalShow)
  }

  return (
    <>
    { props.region ? <div className={style.stationMainContainer}>
      <div className={style.addressRegion}>
        <div>
          {/* {props.region && regionStat ? regionStat[props.region - 1].company : null} */}
          {props.naming ? props.naming : null}
        </div>
        {/* <div className={style.tableButton} onClick={openModal}> */}
          {/* Расчет окупаемости */}
        {/* </div> */}
      </div>
      <div className={style.mainRegion}>
        <div className={style.leftLine}>
          <div className={style.stationInfo}>
            <div className={style.stationInfoHeader} onClick={view2}>
              Краткая информация
            </div>
            <div className={style.stationInfoMain}>
              <div >
                <b>Принадлежность:</b> {props.region && regionStat ? regionStat[props.region - 1].company : null}
              </div>
              {/* <div>
                <b>Область:</b> {test ? test[0].region : null}
              </div> */}
              <div>
                <b>Кол-во станций:</b> {regCount && props.region ? regCount[props.region - 1].count : null} 
              </div>
              <div>
                <b>Целевой показатель:</b> {regCount && props.region ? (Number(regCount[props.region - 1].count) * 613402).toLocaleString('ru') : null} кВт*ч
              </div>
              <div></div>
            </div>
          </div>
          {/* <div className={style.stationInfo2}>
            <div className={style.stationInfoHeader} onClick={view}>
              Информация о станции(ях)
            </div>
            <div className={style.stationInfoMain}>
              <table>
                <tr>
                  <th>Мощность</th>
                  <th>Серийный</th>
                  <th>OCPP</th>
                </tr>
                {generateRow()}
              </table>
              <div></div>
              <div></div>
            </div>
          </div> */}
        </div>
        <div className={style.topLine}>
          <div className={style.stationInfoStat}>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Целевой показатель по отпуску э/э на 2021</div>
                <div>
                  {regCount && props.region ? 
                    (regCount[props.region - 1].count * 5069).toLocaleString('ru')
                  : null} кВт*ч</div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">star_rate</span>
                {/* <i class="las la-certificate"></i> */}
              </div>
              </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div onClick={view2}>Отпущено э/э с 01.01.2021</div>
                  <div>{props.region && regionStat ? ((parseInt(regionStat[props.region - 1].totalkwh * 100)) / 100).toLocaleString('ru') : null} кВт*ч</div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">ev_station</span>
                {/* <i class="las la-charging-station"></i> */}
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Выполнение плана по отпуску э/э на 2021</div>
                <div>
                  {regCount && props.region && regionStat ?
                    ((parseInt((regionStat[props.region - 1].totalkwh / (regCount[props.region - 1].count * 5069) * 100) * 100)) / 100).toLocaleString('ru')
                  : null}%</div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">battery_charging_full</span>
                {/* <i class="las la-battery-half"></i> */}
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>В среднем за одну зарядную сессию</div>
                <div>
                  {regionStat && props.region ? (regionStat[props.region - 1].totalkwh / regionStat[props.region - 1].count).toLocaleString('ru') : null} кВт*ч
                  {/* {sessions ? 
                    perSession ?
                      (perSession).toLocaleString('ru')
                    : 'Нет данных'
                  : null} кВт*ч */}
                </div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">electric_car</span>
                {/* <i class="las la-car"></i> */}
              </div>
            </div>
          </div>


          <div className={style.stationInfoStat}>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Кол-во зарядных сессий с 01.01.2021</div>
                <div>{props.region && regionStat ? ((parseInt(regionStat[props.region - 1].count * 100)) / 100).toLocaleString('ru') : null} ед.</div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">account_box</span>
                {/* <i class="las la-user-clock"></i> */}
              </div>
            </div>
            {/* <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Целевой показатель до 2028 г.</div> */}
                {/* <div>{regCount && props.region ? ((regionStat[props.region - 1].totalkwh / (Number(regCount[props.region - 1].count) * 613402)) * 100).toLocaleString('ru') : null} %</div> */}
                {/* <div>{regCount && props.region ? ((regionStat[props.region - 1].totalkwh / (Number(regCount[props.region - 1].count) * 613402)) * 100).toLocaleString('ru')
                  : 'Нет данных'
                  }%</div> */}
              {/* </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">done_outline</span>
              </div>
            </div> */}
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Средняя продолжительность одной зарядной сессии</div>
                <div>
                  {props.region && regionStat ?
                      Math.trunc(regionStat[props.region - 1].totalkwh / regionStat[props.region - 1].count * 1.2)
                    : 'Нет данных'
                  } мин</div>
              </div>
              <div className={style.statPageCardRight}>
              <span className="material-icons greyground">timer</span>
                {/* <i class="las la-hourglass-end"></i> */}
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Выручка с 01.01.2021</div>
                  <div>{props.region && regionStat ? ((parseInt(regionStat[props.region - 1].totalcost * 100)) / 100).toLocaleString('ru') : null} руб.</div>
              </div>
              <div className={style.statPageCardRight}>
              <span className="material-icons greyground">monetization_on</span>
                {/* <i class="las la-coins"></i> */}
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
            ['Пистолет Chademo', sessionsStat && props.region ? Number(sessionsStat[4*(props.region - 1)+2].sum) : null],
            ['Пистолет CCS', sessionsStat && props.region ? Number(sessionsStat[4*(props.region - 1)+1].sum) : null],
            ['Вилка Type2', sessionsStat && props.region ? Number(sessionsStat[4*(props.region - 1)].sum) : null],
            ['Розеткка Type2', sessionsStat && props.region ? Number(sessionsStat[4*(props.region - 1)+3].sum) : null],
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
            ['Пистолет Chademo', sessionsStat && props.region ? Number(sessionsStat[4*(props.region - 1)+2].totalcost) : null],
            ['Пистолет CCS', sessionsStat && props.region ? Number(sessionsStat[4*(props.region - 1)+1].totalcost) : null],
            ['Вилка Type2', sessionsStat && props.region ? Number(sessionsStat[4*(props.region - 1)].totalcost) : null],
            ['Розеткка Type2', sessionsStat && props.region ? Number(sessionsStat[4*(props.region - 1)+3].totalcost) : null],
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
            ['Пистолет Chademo', sessionsStat && props.region ? Number(sessionsStat[4*(props.region - 1)+2].count) : null],
            ['Пистолет CCS', sessionsStat && props.region ? Number(sessionsStat[4*(props.region - 1)+1].count) : null],
            ['Вилка Type2', sessionsStat && props.region ? Number(sessionsStat[4*(props.region - 1)].count) : null],
            ['Розеткка Type2', sessionsStat && props.region ? Number(sessionsStat[4*(props.region - 1)+3].count) : null],
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
    </div> : <Redirect to="/maff/main"/> }</>
  )
}

const mapStateToProps = (state) => ({
  page: state.pageReducer.page,
  region: state.pageReducer.region,
});
    
const mapDispatchToProps = {
};
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ByRegionContainer));