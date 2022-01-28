import React, { useEffect, useState }from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import style from './StationMain.module.css';
import { useParams } from 'react-router-dom'
import route from '../../back_route';
import { Chart } from "react-google-charts";
import img from '../StatPageContainer/data.png'

export const StationMain = ({lat, lng, setCenter2, setZoom2}) => {
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
  const [timespend, setTimeSpend] = useState();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetch(`../${route}/locationinfo/${id}`)
    // fetch(`${route}/locationinfo/${id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTest(data);
      });
    // fetch(`${route}/sessioninfo/${id}`)
    fetch(`../${route}/sessioninfo/${id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setSessions(data);
        // console.log(data)
      });
    fetch(`../${route}/timespend/${id}`)
    // fetch(`${route}/timespend/${id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTimeSpend(data);
        // console.log(data)
      });
    // console.log(page1)
    setCenter2(Number(lat), Number(lng))
    setZoom2(14);
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
  }, [sessions])

  const view = () => {
    var d = new Date(),
    datestring = '';
    datestring = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()
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
    setModalShow(!modalShow)
  }

  return (
    <>
    <div className={style.stationMainContainer}>
      <div className={style.addressRegion}>
        <div>
          {test ? test[0].name : null}
        </div>
        <div className={style.tableButton} onClick={openModal}>
          Расчет окупаемости
        </div>
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
                <b>Тип расположения:</b> {test ? test[0].destination : null}
              </div>
              <div>
                <b>Места рядом:</b> {test ? test[0].nearplaces + ' ( ' + test[0].nearplaces_add + ' )' : null}
              </div>
              <div>
                <b>Кол-во станций:</b> {test ? test.length : null}
              </div>
              <div>
                <b>Целевой показатель:</b> {test ? (test.length * 1103437).toLocaleString('ru') : null} кВт*ч
              </div>
              <div>
                <br />
              </div>
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
                <div>Целевой показатель по отпуску э/э на 2022</div>
                <div>
                  {test ?
                    (test.length * 30422).toLocaleString('ru')
                  : null} кВт*ч
                </div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">star_rate</span>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Отпущено э/э с 01.01.2022</div>
                <div>{sessions ? ((parseInt(totalkwh * 100)) / 100).toLocaleString('ru') : null} кВт*ч</div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">ev_station</span>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Выполнение плана по отпуску э/э на 2022</div>
                <div>
                  {test ?
                    ((parseInt((totalkwh / (test.length * 30422) * 100) * 100)) / 100).toLocaleString('ru')
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
                  {sessions ? 
                    perSession ?
                      (perSession).toLocaleString('ru')
                    : 'Нет данных'
                  : null} кВт*ч
                </div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">electric_car</span>
              </div>
            </div>
          </div>

          <div className={style.stationInfoStat}>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Кол-во зарядных сессий с 01.01.2022</div>
                <div>{sessions ? ((parseInt(totalsessions * 100)) / 100).toLocaleString('ru') : null}</div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">account_box</span>
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
                <span className="material-icons greyground">done_outline</span>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Средняя продолжительность одной зарядной сессии</div>
                <div>
                  {test ?
                    timespend ?
                    timespend[0].timespend.hours ? timespend[0].timespend.hours + ' ч. ' + timespend[0].timespend.minutes + ' мин.': timespend[0].timespend.minutes + ' мин.'
                      // timespend.hours + timespend.minutes
                      // Math.trunc(perSession * 1.2)
                    : null
                  : null}</div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">timer</span>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Выручка с 01.01.2022</div>
                <div>{sessions ? ((parseInt(totalcost * 100)) / 100).toLocaleString('ru') : null} руб.</div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">monetization_on</span>
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
            ['Пистолет Chademo', byTypecash ? Number(byTypecash[2]) : null],
            ['Пистолет CCS', byTypecash ? Number(byTypecash[1]) : null],
            ['Вилка Type2', byTypecash ? Number(byTypecash[0]) : null],
            ['Розеткка Type2', byTypecash ? Number(byTypecash[3]) : null],
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
            ['Пистолет Chademo', count ? Number(count[2]) : null],
            ['Пистолет CCS', count ? Number(count[1]) : null],
            ['Вилка Type2', count ? Number(count[0]) : null],
            ['Розеткка Type2', count ? Number(count[3]) : null],
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
    </div>
    {modalShow 
      ? <div id="myModal" className={style.modalOpen}> 
          <div className={style.modalContent}>
            <span className={style.close} onClick={openModal}>&times;</span>
            <h2>Расчет окупаемости для одной среднестат. ЭЗС</h2>
            <h4>Срок окупаемости(простой): 5,7 лет</h4>
            <h4>Срок окупаемости(дисконтированный): 8,3 лет</h4>
            <img className={style.table_png} src={img} alt="" />
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

const mapStateToProps = (state) => {
  return {
  page1: state.pageReducer.page,
  // region: state.pageReducer.region,
  }
};
    
const mapDispatchToProps = {

};
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StationMain));