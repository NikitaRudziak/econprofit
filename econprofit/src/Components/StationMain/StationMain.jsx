import React, { useEffect, useState }from 'react';
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
  const [count, setCount] = useState();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetch(`../${route}/locationinfo/${id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTest(data);
      });
    fetch(`../${route}/sessioninfo/${id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setSessions(data);
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
  }, [sessions])

  const view = () => {
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
                <b>Кол-во станций:</b> {test ? test.length : null} 
              </div>
              <div>
                <b>Целевой показатель:</b> {test ? (test.length * 613402).toLocaleString('ru') : null} кВт*ч
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
                    (test.length * 5069).toLocaleString('ru')
                  : null} кВт*ч
                </div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">star_rate</span>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div onClick={view2}>Отпущено э/э с 01.01.2021</div>
                <div>{sessions ? ((parseInt(totalkwh * 100)) / 100).toLocaleString('ru') : null} кВт*ч</div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">ev_station</span>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Выполнение плана по отпуску э/э на 2021</div>
                <div>
                  {test ?
                    ((parseInt((totalkwh / (test.length * 5069) * 100) * 100)) / 100).toLocaleString('ru')
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
                <div>Кол-во зарядных сессий с 01.01.2021</div>
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
                    perSession ?
                      Math.trunc(perSession * 1.2)
                    : 'Нет данных'
                  : null} мин</div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">timer</span>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Выручка с 01.01.2021</div>
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
            <h4>Срок окупаемости(простой): 5,1 лет</h4>
            <h4>Срок окупаемости(дисконтированный): 7,9 лет</h4>
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
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StationMain));