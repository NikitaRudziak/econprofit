import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import style from './StationMain.module.css';
import { useParams } from 'react-router-dom'
import route from '../../back_route';
import { Chart } from "react-google-charts";

export const StationMain = () => {
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
  const [count, setCount] = useState()
  // const [perSession, setPerSession] = useState();
  // const [perSession, setPerSession] = useState();

  useEffect(() => {
    fetch(`${route}/locationinfo/${id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTest(data);
        // console.log(data)
      });
    fetch(`${route}/sessioninfo/${id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setSessions(data);
        console.log(data)
      });
  }, [])

  // useEffect(() => {
  //   if(test) {
  //     test.map((item) => {
  //       fetch(`${route}/sessioninfo/${item.friendlycode}`)
  //         .then(response => {
  //           return response.json();
  //         })
  //         .then(data => {
  //           setSessions(data);
            
  //         });
  //     })
  //   }
  // }, [test])

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
    // console.log(sessions)
  }, [sessions])

  const view = () => {
    // const date2 = new Date()
    var d = new Date(),
    datestring = '';
    datestring = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()
    console.log(test)
    console.log(datestring)
  }
  const view2 = () => {
    console.log(byType)
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

  return (
    <div className={style.stationMainContainer}>
      <div className={style.addressRegion}>
        {test ? test[0].name : null}
      </div>
      <div className={style.mainRegion}>
        <div className={style.leftLine}>
          <div className={style.stationInfo}>
            <div className={style.stationInfoHeader} onClick={view}>
              Информация о локации
            </div>
            <div className={style.stationInfoMain}>
              <div >
                <b>Принадлежность:</b> {test ? test[0].company : null}
              </div>
              <div>
                <b>Область:</b> {test ? test[0].region : null}
              </div>
              <div>
                <b>Кол-во станций:</b> {test ? test.length : null} 
              </div>
              <div>
                <b>Целевой показатель:</b> {test ? (test.length * 456249).toLocaleString('ru') : null} кВт*ч
              </div>
              <div></div>
            </div>
          </div>
          <div className={style.stationInfo2}>
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
          </div>
        </div>
        <div className={style.topLine}>
          <div className={style.stationInfoStat}>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Целевой показатель по отпуску э/э на 2021</div>
                <div>
                  {test ?
                    (test.length * 9311).toLocaleString('ru')
                  : null} кВт*ч</div>
              </div>
              <div className={style.statPageCardRight}>
                <i class="las la-certificate"></i>
              </div>
              </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div onClick={view2}>Отпущено э/э с 01.01.2021</div>
                  <div>{sessions ? ((parseInt(totalkwh * 100)) / 100).toLocaleString('ru') : null} кВт*ч</div>
              </div>
              <div className={style.statPageCardRight}>
                <i class="las la-charging-station"></i>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Выполнение плана по отпуску э/э на 2021 г.</div>
                <div>
                  {test ?
                    ((parseInt((totalkwh / (test.length * 9311) * 100) * 100)) / 100).toLocaleString('ru')
                  : null}%</div>
              </div>
              <div className={style.statPageCardRight}>
                <i class="las la-battery-half"></i>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>В среднем за одну зарядную сессию</div>
                <div>
                  {sessions ? 
                    perSession ?
                      (perSession).toLocaleString('ru')
                    : 'Нет данных'
                  : null} кВт*ч</div>
              </div>
              <div className={style.statPageCardRight}>
                <i class="las la-car"></i>
              </div>
            </div>
          </div>


          <div className={style.stationInfoStat}>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Кол-во зарядных сессий с 01.01.2021</div>
                <div>{sessions ? ((parseInt(totalsessions * 100)) / 100).toLocaleString('ru') : null}</div>
              </div>
              <div className={style.statPageCardRight}>
                <i class="las la-user-clock"></i>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Успешные зарядные сессии</div>
                <div>{sessions ? 
                  (failed && totalsessions) ?
                  ((parseInt((100 - (failed / totalsessions * 100)) * 100)) / 100).toLocaleString('ru')
                  : 'Нет данных'
                  : null}%</div>
              </div>
              <div className={style.statPageCardRight}>
                <i class="las la-check-double"></i>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Средняя продолжительность одной зарядной сессии</div>
                <div>
                  {test ?
                    perSession ?
                      Math.trunc(perSession * 1.2)
                    : 'Нет данных'
                  : null} мин</div>
              </div>
              <div className={style.statPageCardRight}>
                <i class="las la-hourglass-end"></i>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Выручка с 01.01.2021</div>
                  <div>{sessions ? ((parseInt(totalcost * 100)) / 100).toLocaleString('ru') : null} руб.</div>
              </div>
              <div className={style.statPageCardRight}>
                <i class="las la-coins"></i>
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
            ['Пистолет Chademo', byType ? Number(byType[2]) : null],
            ['Пистолет CCS', byType ? Number(byType[1]) : null],
            ['Вилка Type2', byType ? Number(byType[0]) : null],
            ['Розеткка Type2', byType ? Number(byType[3]) : null],
          ]}
          options={{
            title: 'Отпущено по коннекторам, кВт*ч',
            is3D: true,
            titleTextStyle: {
              fontSize: 16,
            },
            pieSliceTextStyle: {
              fontSize: 13
            }
            // textStyle: {
            //   fontSize: 40,
            // }
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
            ['Пистолет Chademo', byTypecash ? Number(byTypecash[2]) : null],
            ['Пистолет CCS', byTypecash ? Number(byTypecash[1]) : null],
            ['Вилка Type2', byTypecash ? Number(byTypecash[0]) : null],
            ['Розеткка Type2', byTypecash ? Number(byTypecash[3]) : null],
          ]}
          options={{
            title: 'Распределение выручки по коннекторам, руб.',
            is3D: true,
            titleTextStyle: {
              fontSize: 16,
            },
            pieSliceTextStyle: {
              fontSize: 13
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
            ['Пистолет Chademo', count ? Number(count[2]) : null],
            ['Пистолет CCS', count ? Number(count[1]) : null],
            ['Вилка Type2', count ? Number(count[0]) : null],
            ['Розеткка Type2', count ? Number(count[3]) : null],
          ]}
          options={{
            title: 'Количество зарядных сессий, ед.',
            is3D: true,
            titleTextStyle: {
              fontSize: 16,
            },
            pieSliceTextStyle: {
              fontSize: 13
            }
          }}
          rootProps={{ 'data-testid': '2' }}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  page: state.pageReducer.page,
  region: state.pageReducer.region,
});
    
const mapDispatchToProps = {
};
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StationMain));