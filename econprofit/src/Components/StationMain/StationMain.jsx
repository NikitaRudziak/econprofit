import React, { useEffect, useState, useCallback }from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import style from './StationMain.module.css';
import { useParams } from 'react-router-dom'
import route from '../../back_route';
import { Chart } from "react-google-charts";
import img from '../StatPageContainer/data.png';
import { Dialog, DialogTitle, Typography, Stack, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DateFnsUtils from '@date-io/date-fns';


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
  const [open, setOpen] = React.useState(false);
  const [byMonth, setByMonth] = useState();
  const [obj, setObj] = React.useState(false);
  const [value, setValue] = React.useState(new Date());
  const [data, setData] = React.useState({
    totalkwhbyMonth: null,
    totalcostbyMonth: null,
  });
  const escFunction = useCallback((event) => {
    console.log(event)
    // if (event.key === "Escape") {
    //   setOpen(false)
    //   console.log('ffff')
    // }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

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
      // fetch(`${route}/getconstantsbymonth`)
      fetch(`../${route}/getconstantsbymonth`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setByMonth(data)
          console.log(data)
        })
    setCenter2(Number(lat), Number(lng));
    setZoom2(14);
  }, [])

  useEffect(() => {
    let totalkwh = 0;
    let totalcost = 0;
    let totalsessions = 0;
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
    let totalkwhbyMonth = 0;
    let totalcostbyMonth = 0;
    if(sessions) {
      sessions.map(item => {
        totalkwh += Number(item.kwh);
        totalcost += Number(item.totalcost);
        let currMonth = new Date(byMonth[byMonth.length-1].monthdate);
        let m = new Date(item.chargingfrom)
        if ( m >= currMonth && m < currMonth.setMonth(currMonth.getMonth() + 1)) {
          totalkwhbyMonth += Number(item.kwh);
          totalcostbyMonth += Number(item.totalcost)
        }
        totalsessions += 1;
        if (Number(item.kwh) < 0.5) {
          failed += 1;
        }
        if (item.connector == 'Вилка Type 2') {
          type2 += Number(item.kwh);
          type2cash += Number(item.totalcost);
          type2count ++;
        }
        if (item.connector == 'Пистолет CCS') {
          ccs += Number(item.kwh);
          ccscash += Number(item.totalcost);
          ccscount ++;
        }
        if (item.connector == 'Пистолет CHAdeMO') {
          chademo += Number(item.kwh);
          chademocash += Number(item.totalcost);
          chademocount ++;
        }
        if (item.connector == 'Розетка Type 2') {
          type2plug += Number(item.kwh);
          type2plugcash += Number(item.totalcost);
          type2plugcount ++;
        }
      }) 
    }
    setData({totalkwhbyMonth: totalkwhbyMonth, totalcostbyMonth: totalcostbyMonth})
    arrcount.push(type2count, ccscount, chademocount, type2plugcount);
    kwharr.push(type2, ccs, chademo, type2plug);
    casharr.push(type2cash, ccscash, chademocash, type2plugcash);
    perSession = (parseInt((totalkwh / (totalsessions - failed)) * 100)) / 100;
    settotalkwh(totalkwh);
    settotalcost(totalcost);
    settotalsessions(totalsessions);
    setFailed(failed);
    setPerSession(perSession);
    setByType(kwharr);
    setByTypecash(casharr);
    setCount(arrcount);
    // 
    //   console.log('yes')
      
    // }
  }, [sessions])

  useEffect (() => {
    console.log(test)
    console.log(byMonth)
    let obj = null;
    if (test && byMonth && data) {
    let zatrproizv = ((test[0].kapzatr / byMonth[byMonth.length-1].plan * byMonth[byMonth.length-1].amort)
      + (byMonth[byMonth.length-1].techobsl * test.length / 600)
      + (byMonth[byMonth.length-1].rent * test.length / 600)
      + (test[0].kapzatr / byMonth[byMonth.length-1].plan * byMonth[byMonth.length-1].insure)
      + (byMonth[byMonth.length-1].zp * test.length / 600)
      + (byMonth[byMonth.length-1].prog * test.length / 600)
      + (byMonth[byMonth.length-1].sviaz * test.length / 600)
      + (byMonth[byMonth.length-1].askue * test.length / 600)
      + (byMonth[byMonth.length-1].komandir * test.length / 600)
      + (byMonth[byMonth.length-1].other * test.length / 600)
      + (data.totalkwhbyMonth / byMonth[byMonth.length-1].sumkwh * byMonth[byMonth.length-1].energy)
      + (data.totalcostbyMonth * byMonth[byMonth.length-1].bank / byMonth[byMonth.length-1].sumcost)).toFixed(2);
    obj = {
      name: byMonth[byMonth.length-1].name,
 	    monthdate: byMonth[byMonth.length-1].monthdate,
      sumkwh: (data.totalkwhbyMonth).toFixed(2),
 	    kwhperday: (data.totalkwhbyMonth / 30).toFixed(2),
 	    sumcost: (data.totalcostbyMonth).toFixed(2),
 	    nds: (data.totalcostbyMonth /1.2*0.2).toFixed(2),
 	    costwnds: (data.totalcostbyMonth-data.totalcostbyMonth /1.2*0.2).toFixed(2),
      zatrproizv: zatrproizv,
      uslperem: (data.totalkwhbyMonth / byMonth[byMonth.length-1].sumkwh * byMonth[byMonth.length-1].energy 
        + data.totalcostbyMonth * byMonth[byMonth.length-1].bank / byMonth[byMonth.length-1].sumcost).toFixed(2),
 	    energy: (data.totalkwhbyMonth / byMonth[byMonth.length-1].sumkwh * byMonth[byMonth.length-1].energy).toFixed(2),
 	    bank: (data.totalcostbyMonth * byMonth[byMonth.length-1].bank / byMonth[byMonth.length-1].sumcost).toFixed(2),
      uslpost: ((
        test[0].kapzatr / byMonth[byMonth.length-1].plan * byMonth[byMonth.length-1].amort)
        + (byMonth[byMonth.length-1].techobsl * test.length / 600)
        + (byMonth[byMonth.length-1].rent * test.length / 600)
        + (test[0].kapzatr / byMonth[byMonth.length-1].plan * byMonth[byMonth.length-1].insure)
        + (byMonth[byMonth.length-1].zp * test.length / 600)
        + (byMonth[byMonth.length-1].prog * test.length / 600)
        + (byMonth[byMonth.length-1].sviaz * test.length / 600)
        + (byMonth[byMonth.length-1].askue * test.length / 600)
        + (byMonth[byMonth.length-1].komandir * test.length / 600)
        + (byMonth[byMonth.length-1].other * test.length / 600)).toFixed(2),
      amort: (test[0].kapzatr / byMonth[byMonth.length-1].plan * byMonth[byMonth.length-1].amort).toFixed(2),
 	    techobsl: (byMonth[byMonth.length-1].techobsl * test.length / 600).toFixed(2),
 	    rent: (byMonth[byMonth.length-1].rent * test.length / 600).toFixed(2),
 	    insure: (test[0].kapzatr / byMonth[byMonth.length-1].plan * byMonth[byMonth.length-1].insure).toFixed(2),
 	    zp: (byMonth[byMonth.length-1].zp * test.length / 600).toFixed(2),
 	    prog: (byMonth[byMonth.length-1].prog * test.length / 600).toFixed(2),
 	    sviaz: (byMonth[byMonth.length-1].sviaz * test.length / 600).toFixed(2),
 	    askue: (byMonth[byMonth.length-1].askue * test.length / 600).toFixed(2),
 	    komandir: (byMonth[byMonth.length-1].komandir * test.length / 600).toFixed(2),
 	    other: (byMonth[byMonth.length-1].other * test.length / 600).toFixed(2),
      pokrzatr: ((data.totalcostbyMonth-data.totalcostbyMonth /1.2*0.2) / zatrproizv * 100).toFixed(2),
      zatrbezamort: (zatrproizv - (test[0].kapzatr / byMonth[byMonth.length-1].plan * byMonth[byMonth.length-1].amort)).toFixed(2),
      pokrzatrperc: ((data.totalcostbyMonth-data.totalcostbyMonth /1.2*0.2) / (zatrproizv - (test[0].kapzatr / byMonth[byMonth.length-1].plan * byMonth[byMonth.length-1].amort)) * 100).toFixed(2),
      pribil: ((data.totalcostbyMonth-data.totalcostbyMonth /1.2*0.2) - zatrproizv).toFixed(2),
      rentabreal: (((data.totalcostbyMonth-data.totalcostbyMonth /1.2*0.2) - zatrproizv) / zatrproizv * 100).toFixed(2),
      rentabprod: (((data.totalcostbyMonth-data.totalcostbyMonth /1.2*0.2) - zatrproizv) / data.totalcostbyMonth * 100).toFixed(2),
      zatr1kw: (zatrproizv / data.totalkwhbyMonth).toFixed(2)
    }
    
  }
  setObj(obj)
  console.log(obj)
    
  }, [test, byMonth, data])

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
    setModalShow(!modalShow);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
    <div className={style.stationMainContainer}>
      <div className={style.addressRegion}>
        <div>
          {test ? test[0].name : null}
        </div>
        <div className={style.tableButton} onClick={handleClickOpen} >
          Расчет окупаемости
        </div>
      </div>
      <div className={style.mainRegion}>
        <div className={style.leftLine}>
          <div className={style.stationInfo}>
            <div className={style.stationInfoHeader}>
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
                <b>Целевой показатель:</b> {test ? (test[0].cp_2022 * 8).toLocaleString('ru') : null} кВт*ч
              </div>
              <div>
                <br />
              </div>
            </div>
          </div>
          <div className={style.stationInfo2}>
            <div className={style.stationInfoHeader}>
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
                  {test ? (test[0].cp_2022) : null} кВт*ч
                </div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">star_rate</span>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Отпущено э/э с 01.01.2022</div>
                <div>{sessions ? totalkwh.toLocaleString('ru') : null} кВт*ч</div>
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
                    ((parseInt((totalkwh / (Number(test[0].cp_2022)) * 100) * 100)) / 100).toLocaleString('ru')
                  : null} %
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

          <div className={style.stationInfoStat}>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Покрытие затрат выручкой без НДС</div>
                <div>{obj ? (obj.pokrzatr).toLocaleString('ru') : null} %</div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">monetization_on</span>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Покрытие затрат без амортизации выручкой без НДС</div>
                <div>{
                  obj ? (obj.pokrzatrperc).toLocaleString('ru') : null
                  } %</div>
              </div>
              <div className={style.statPageCardRight}>
                <span className="material-icons greyground">monetization_on</span>
                
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Общие затраты на 1 кВт*ч оказанных услуг</div>
                <div>
                  {obj ? obj.zatr1kw : null} руб./кВт*ч</div>
              </div>
              <div className={style.statPageCardRight}> 
              <span className="material-icons greyground">monetization_on</span>
              </div>
            </div>
            <div className={style.statPageCard}>
              <div className={style.statPageCardLeft}>
                <div>Выручка без НДС на 1 кВт*ч оказанных услуг</div>
                <div>{sessions ? (Number(data.totalcostbyMonth) / Number(data.totalkwhbyMonth)).toLocaleString('ru') : null} руб./кВт*ч</div>
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
    <Dialog open={open} maxWidth='lg'>
      <DialogTitle>Целевые показатели<span className={style.close} onClick={() => setOpen(false)}>&times;</span></DialogTitle>
      <Stack>
        {obj ? <Stack spacing={2} sx={{width: '50vw', padding:'20px'}} >
          <TextField id="outlined-basic" label="Название" variant="outlined" size="small" name="name" value={obj.name} disabled/>
          {/* <TextField id="outlined-basic" label="Дата / месяц" variant="outlined" size="small" name="monthdate" value={obj.monthdate} disabled/> */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={['year', 'month']}
                    label="Месяц / Год"
                    minDate={new Date('2020-03-01')}
                    maxDate={new Date('2027-06-01')}
                    value={obj.monthdate}
                    
                    renderInput={(params) => <TextField {...params} helperText={null} disabled />}
                  />
                </LocalizationProvider>
          <TextField id="outlined-basic" label="Объем оказанных услуг, кВт*ч" variant="outlined" size="small" name="sumkwh" value={obj.sumkwh} disabled/>
          <TextField id="outlined-basic" label="Среднесуточный отпуск услуг, кВт*ч" variant="outlined" size="small" name="kwhperday" value={obj.kwhperday} disabled/>
          <TextField id="outlined-basic" label="Выручка от реализации с НДС, руб" variant="outlined" size="small" name="sumcost" value={obj.sumcost} disabled/>
          <TextField id="outlined-basic" label="НДС, руб" variant="outlined" size="small" name="nds" value={obj.nds} disabled/>
          <TextField id="outlined-basic" label="Выручка от реализации без НДС, руб" variant="outlined" size="small" name="costwnds" value={obj.costwnds} disabled/>
          <TextField id="outlined-basic" label="Затраты на производство и реализацию, руб" variant="outlined" size="small" name="zatrproizv" value={obj.zatrproizv}  disabled/>
          <TextField id="outlined-basic" label="Условно-переменные, руб" variant="outlined" size="small" value={obj.uslperem} disabled/>
          <TextField id="outlined-basic" label="Электроэнергия, руб" variant="outlined" size="small" name="energy" value={obj.energy} disabled/>
          <TextField id="outlined-basic" label="Услуги банка, руб" variant="outlined" size="small" name="bank" value={obj.bank} disabled/>
          <TextField id="outlined-basic" label="Условно-постоянные, руб" variant="outlined" size="small" value={obj.uslpost} disabled/>
          <TextField id="outlined-basic" label="Амортизация ОС и НМА, руб" variant="outlined" size="small" name="amort" value={obj.amort} disabled/>
          <TextField id="outlined-basic" label="ТО, руб" variant="outlined" size="small" name="techobsl" value={obj.techobsl} disabled/>
          <TextField id="outlined-basic" label="Аренда, руб" variant="outlined" size="small" name="rent" value={obj.rent} disabled/>
          <TextField id="outlined-basic" label="Страхование, руб" variant="outlined" size="small" name="insure" value={obj.insure} disabled/>
          <TextField id="outlined-basic" label="Заработная плата / ФСЗН, руб" variant="outlined" size="small" name="zp" value={obj.zp} disabled/>
          <TextField id="outlined-basic" label="ПО, руб" variant="outlined" size="small" name="prog" value={obj.prog} disabled/>
          <TextField id="outlined-basic" label="Услуги связи VPN, руб" variant="outlined" size="small" name="sviaz" value={obj.sviaz} disabled/>
          <TextField id="outlined-basic" label="Обслуживание АСКУЕ, руб" variant="outlined" size="small" name="askue" value={obj.askue} disabled/>
          <TextField id="outlined-basic" label="Командировки, руб" variant="outlined" size="small" name="komandir" value={obj.komandir} disabled/>
          <TextField id="outlined-basic" label="Прочие, руб" variant="outlined" size="small" name="other" value={obj.other} disabled/>
          <TextField id="outlined-basic" label="Покрытие затрат на производство и реализацию выручкой без НДС, %" variant="outlined" size="small" name="pokrzatr" value={obj.pokrzatr} disabled/>
          <TextField id="outlined-basic" label="Затраты на производство и реализацию без амортизации ОС и НМА, руб" variant="outlined" size="small" name="zatrbezamort" value={obj.zatrbezamort} disabled/>
          <TextField id="outlined-basic" label="Покрытие затрат на производство и реализацию без амортизации ОС и НМА выручкой без НДС, %" variant="outlined"  size="small" name="pokrzatrperc" value={obj.pokrzatrperc} disabled/>
          <TextField id="outlined-basic" label="Прибыль, руб" variant="outlined" size="small" name="pribil" value={obj.pribil} disabled/>
          <TextField id="outlined-basic" label="Рентабельность реализованной продукции, %" variant="outlined" size="small" name="rentabreal" value={obj.rentabreal} disabled/>
          <TextField id="outlined-basic" label="Рентабельность продаж, %" variant="outlined" size="small" name="rentabprod" value={obj.rentabprod} disabled/>
          <TextField id="outlined-basic" label="Затраты (руб.) на 1кВт*ч оказанных услуг, руб" variant="outlined" size="small" name="zatr1kw" value={obj.zatr1kw} disabled/>
        </Stack> : null}
      </Stack>
    </Dialog>
    {/* {modalShow 
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
    } */}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    page1: state.pageReducer.page,
  }
};
  
export default withRouter(connect(mapStateToProps, null)(StationMain));
