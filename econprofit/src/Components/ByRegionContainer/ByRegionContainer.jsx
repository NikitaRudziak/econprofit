import React, { useEffect, useState }from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import style from './ByRegionContainer.module.css';
import route from '../../back_route';
import { Chart } from "react-google-charts";
import { Dialog, DialogTitle, Typography, Stack, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import img from '../StatPageContainer/data.png';

export const ByRegionContainer = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [regionStat, setRegionStat] = useState();
  const [sessionsStat, setSessionsStat] = useState();
  const [regCount, setRegCount] = useState();
  const [byConnector, setByConnector] = useState();
  const [br, setBr] = useState();
  const [dest, setDest] = useState([]);
  const [cp,setCP] = useState();
  const [open, setOpen] = React.useState(false);
  const [byMonth, setByMonth] = useState();

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
    fetch(`${route}/getcp`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setCP(data);
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
    // fetch(`../${route}/getconstantsbymonth`)
    fetch(`${route}/getconstantsbymonth`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setByMonth(data)
        console.log(data)
      })
    getPY();
  }, [])

  const openModal = () => {
    setModalShow(!modalShow);
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
    if(item == 6) { //могилев
      return 29
    }
    if(item == 4) { //минск
      return 411
    }
    if(item == 5) { //минскобл
      return 40
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

  const getPY = () => {
    let obj = {};
    if(props.naming == 'г. Минск') {
      obj = {
        goal: 1870461,
        sum: 2162142.89,
        plan: 115.59,
        sr: 12.651,
        col: 170909,
        price: 774148.8,
        time: 87
      }
    }
    if(props.naming == 'Минская область') {
      obj = {
        goal: 101380,
        sum: 124660.5,
        plan: 122.96,
        sr: 10.356,
        col: 12037,
        price: 45396.72,
        time: 31
      }
    }
    if(props.naming == 'Гомельская область') {
      obj = {
        goal: 147001,
        sum: 73579.5,
        plan: 50.05,
        sr: 7.833,
        col: 9394,
        price: 27232.83,
        time: 48
      }
    }
    if(props.naming == 'Витебская область') {
      obj = {
        goal: 101380,
        sum: 71773.69,
        plan: 70.79,
        sr: 9.444,
        col: 7600,
        price: 26373.39,
        time: 59
      }
    }
    if(props.naming == 'Брестская область') {
      obj = {
        goal: 157139,
        sum: 131541.97,
        plan: 83.71,
        sr: 9.875,
        col: 13321,
        price: 48683.37,
        time: 40
      }
    }
    if(props.naming == 'Гродненская область') {
      obj = {
        goal: 147001,
        sum: 116582.47,
        plan: 79.3,
        sr: 10.279,
        col: 11342,
        price: 44449.79,
        time: 47
      }
    }
    if(props.naming == 'Могилевская область') {
      obj = {
        goal: 106449,
        sum: 41185.44,
        plan: 38.69,
        sr: 8.162,
        col: 5046,
        price: 15055.78,
        time: 53
      }
    }
    return obj;
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
    {props.region ? <div className={style.stationMainContainer}>
      <div className={style.addressRegion}>
        <div>
          {props.naming ? props.naming : null}
        </div>
        <div className={style.tableButton} onClick={handleClickOpen}>
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
                <b>Целевой показатель:</b> {cp && props.region ? 
                  (Number(cp[props.region-1].cp) * 8).toLocaleString('ru')  : null} кВт*ч
              </div>
              <div >
                {dest  ?  
                  getDest() != 0 ?  <b>В областном центре: </b>  : null 
                  : null} 
                
                {dest  ?  
                  getDest() != 0 ? 
                    getDest()
                    : null 
                : null} 
                {dest  ?  
                  getDest() != 0 ?  'шт.' : null 
                  : null} 
              </div>
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
                  {cp ? (Number(cp[props.region-1].cp)).toLocaleString('ru') : null} кВт*ч
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
                    parseFloat(regionStat[props.region - 1].totalkwh / Number(cp[props.region-1].cp) * 100).toLocaleString('ru')
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
                <div>{props.region && regionStat ? ((Number(regionStat[props.region - 1].count * 100)) / 100).toLocaleString('ru') 
                // ((Number(regionStat[props.region - 1].count * 100)) / 100).toLocaleString('ru') 
                : null} ед.</div>
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
                      br[props.region - 1].timespend.hours ? br[props.region - 1].timespend.hours + ' ч. ' + br[props.region - 1].timespend.minutes
                      : br[props.region - 1].timespend.minutes
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
      <div>
        <div className={style.year}>
          Результаты 2021 г.
        </div>
        <div className={style.mainRegion}>
          <div className={style.topLine}>
            <div className={style.stationInfoStat}>
              <div className={style.statPageCard}>
                <div className={style.statPageCardLeft}>
                  <div>Целевой показатель по отпуску э/э на 2021</div>
                  <div>
                    {dest ? getPY().goal.toLocaleString('ru') : null} кВт*ч
                  </div>
                </div>
                <div className={style.statPageCardRight}>
                  <span className="material-icons greyground">star_rate</span>
                </div>
              </div>
              <div className={style.statPageCard}>
                <div className={style.statPageCardLeft}>
                  <div>Отпущено э/э с 01.01.2021</div>
                    <div>{dest ? getPY().sum.toLocaleString('ru') : null} кВт*ч</div>
                </div>
                <div className={style.statPageCardRight}>
                  <span className="material-icons greyground">ev_station</span>
                </div>
              </div>
              <div className={style.statPageCard}>
                <div className={style.statPageCardLeft}>
                  <div>Выполнение плана по отпуску э/э на 2021</div>
                  <div>
                    {dest ? getPY().plan.toLocaleString('ru')
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
                    {dest ? getPY().sr.toLocaleString('ru') : null} кВт*ч
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
                  <div>{dest ? getPY().col.toLocaleString('ru') : null} ед.</div>
                </div>
                <div className={style.statPageCardRight}>
                  <span className="material-icons greyground">account_box</span>
                </div>
              </div>
              <div className={style.statPageCardMiddle}>
                <div className={style.statPageCardLeft}>
                  <div>Выручка с 01.01.2022</div>
                    <div>{dest ? getPY().price.toLocaleString('ru') : null} руб.</div>
                </div>
                <div className={style.statPageCardRight}>
                <span className="material-icons greyground">monetization_on</span>
                </div>
              </div>
              <div className={style.statPageCardMiddle}>
                <div className={style.statPageCardLeft}>
                  <div>Средняя продолжительность одной зарядной сессии</div>
                  <div>
                    {dest ? getPY().time.toLocaleString('ru') : null} мин.
                  </div>
                </div>
                <div className={style.statPageCardRight}>
                  <span className="material-icons greyground">timer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> : <Redirect to="/maff/main"/> }
    <Dialog open={open} maxWidth='lg'>
      <DialogTitle>Целевые показатели<span className={style.close} onClick={() => setOpen(false)}>&times;</span></DialogTitle>
      {/* <Stack>
        {obj ? <Stack spacing={2} sx={{width: '50vw', padding:'20px'}} >
          <TextField id="outlined-basic" label="Название" variant="outlined" size="small" name="name" value={obj.name} disabled/>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={['year', 'month']}
                    label="Месяц / Год"
                    minDate={new Date('2020-03-01')}
                    maxDate={new Date('2027-06-01')}
                    value={obj.monthdate}
                    
                    renderInput={(params) => <TextField {...params} helperText={null} disabled />}
                  />
          </LocalizationProvider> */}
          {/* <TextField id="outlined-basic" label="Объем оказанных услуг, кВт*ч" variant="outlined" size="small" name="sumkwh" value={obj.sumkwh} disabled/>
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
          <TextField id="outlined-basic" label="Затраты (руб.) на 1кВт*ч оказанных услуг, руб" variant="outlined" size="small" name="zatr1kw" value={obj.zatr1kw} disabled/> */}
        {/* </Stack> : null}
      </Stack> */}
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

const mapStateToProps = (state) => ({
  page: state.pageReducer.page,
  region: state.pageReducer.region,
});
  
export default withRouter(connect(mapStateToProps, null)(ByRegionContainer));
