import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import route from '../../back_route';
import { Navigation } from '../../Components/Navigation/Navigation';
import { StationMain } from '../../Components/StationMain/StationMain';
import { setCoordinates, setZoom } from '../../redux/actions';
import {Stack, TextField, Button, Tab, Tabs, Chip} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DateFnsUtils from '@date-io/date-fns';


import style from './SettingsContainer.module.css';


export const SettingsContainer = (props) => {
  const [value, setValue] = React.useState(0);
  const [month, setMonth] = React.useState(new Date());
  const [byMonth, setByMonth] = React.useState([]);
  const [data, setData] = React.useState({
    name: null,
 	  monthdate: null,
    sumkwh: null,
 	  kwhperday: null,
 	  sumcost: null,
 	  nds: null,
 	  costwnds: null,
 	  energy: null,
 	  bank: null,
    amort: null,
 	  techobsl: null,
 	  rent: null,
 	  insure: null,
 	  zp: null,
 	  prog: null,
 	  sviaz: null,
 	  askue: null,
 	  komandir: null,
 	  other: null,
    plan: null,
    energykwh: null
  });
  // const [value, setValue] = React.useState(new Date());

  React.useEffect(() => {
    fetch(`${route}/getconstantsbymonth`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setByMonth(data)
        console.log(data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])


  const handleChange = (e) => {
    console.log(e)
    setData({...data, [e.target.name]: e.target.value})
  };

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmit = () => {
    console.log(data)
    const ticket = {
      name: null,
 	    monthdate: month,
      sumkwh: data.sumkwh,
 	    kwhperday: data.kwhperday,
 	    sumcost: data.sumcost,
 	    nds: data.nds,
 	    costwnds: data.costwnds,
 	    energy: data.energy,
 	    bank: data.bank,
      amort: data.amort,
 	    techobsl: data.techobsl,
 	    rent: data.rent,
 	    insure: data.insure,
 	    zp: data.zp,
 	    prog: data.prog,
 	    sviaz: data.sviaz,
 	    askue: data.askue,
 	    komandir: data.komandir,
 	    other: data.other,
      plan: data.plan,
      energykwh: data.energykwh
    }
    fetch(`${route}/addconstant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticket),
    })
    .then(response => {
      return response.text();
    })
    .then(data => {
    });
  }

  function generate_token(length){
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}
// generate_token(32);

  const addtab = () => {
    const ticket = {
      id: generate_token(12),
      name: null,
 	    monthdate: null,
      sumkwh: null,
 	    kwhperday: null,
 	    sumcost: null,
 	    nds: null,
 	    costwnds: null,
 	    energy: null,
 	    bank: null,
      amort: null,
 	    techobsl: null,
 	    rent: null,
 	    insure: null,
 	    zp: null,
 	    prog: null,
 	    sviaz: null,
 	    askue: null,
 	    komandir: null,
 	    other: null,
      plan: null,
      energykwh: null
    }
    setByMonth([...byMonth, ticket])
  }

  return (
  <div className={style.stationContainer}>
    <Navigation />
    <Stack  direction='column'
      sx={{
        width: 'calc(100% - 280px);',
      }}
    > 
      <Button sx={{width:'100px', alignSelf:'flex-start', margin: '5px'}} variant="contained" onClick={addtab}>Добавить</Button>
      {/* <Chip variant="outlined" color="primary" label="Выбрать на карте" onClick={addtab} /> */}
      <TabContext value={value} >
        
        <TabList onChange={handleChange2} aria-label="lab API tabs example">
          {byMonth.map(item => 
            <Tab label={item.name} value={item.id} sx={{bgcolor: 'lavender'}} />
          )}
        </TabList>
        {byMonth.map(item => 
          <TabPanel value={item.id}>
            <Stack direction='row' justifyContent='space-evenly'>
              <Stack
                sx={{
                  padding: '20px',
                  width: '30vw',
                  borderRadius: '8px',
                  margin: '10px',
  
                }}
                spacing={2}
              >
                <TextField id="outlined-basic" label="Название" variant="outlined" size="small" name="name" value={item.name} onChange={handleChange}/>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={['year', 'month']}
                    label="Месяц / Год"
                    minDate={new Date('2020-03-01')}
                    maxDate={new Date('2027-06-01')}
                    value={month}
                    onChange={(newValue) => {
                      setMonth(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} helperText={null} />}
                  />
                </LocalizationProvider>
                {/* <TextField id="outlined-basic" label="Дата / месяц" variant="outlined" size="small" name="monthdate" value={item.monthdate} onChange={handleChange}/> */}
                <TextField id="outlined-basic" label="Объем оказанных услуг, кВт*ч" variant="outlined" size="small" name="sumkwh" value={item.sumkwh} onChange={handleChange}/>
                <TextField id="outlined-basic" label="Среднесуточный отпуск услуг, кВт*ч" variant="outlined" size="small" name="kwhperday" value={item.kwhperday} onChange={handleChange}/>
                <TextField id="outlined-basic" label="Выручка от реализации с НДС, руб" variant="outlined" size="small" name="sumcost" value={item.sumcost} onChange={handleChange}/>
                <TextField id="outlined-basic" label="НДС, руб" variant="outlined" size="small" name="nds" value={item.nds} onChange={handleChange}/>
                <TextField id="outlined-basic" label="Выручка от реализации без НДС, руб" variant="outlined" size="small" name="costwnds" value={item.costwnds} onChange={handleChange}/>
              </Stack>
              <Stack
                sx={{
                  padding: '20px',
                  width: '30vw',
                  borderRadius: '8px',
                  margin: '10px',
                }}
                spacing={2}
              >
                <TextField id="outlined-basic" label="Электроэнергия, руб" variant="outlined" size="small" name="energy" value={item.energy} onChange={handleChange}/>
                <TextField id="outlined-basic" label="Услуги банка, руб" variant="outlined" size="small" name="bank" value={item.bank} onChange={handleChange}/>
                <TextField id="outlined-basic" label="Амортизация ОС и НМА, руб" variant="outlined" size="small" name="amort" value={item.amort} onChange={handleChange}/>
                <TextField id="outlined-basic" label="ТО, руб" variant="outlined" size="small" name="techobsl" value={item.techobsl} onChange={handleChange}/>
                <TextField id="outlined-basic" label="Аренда, руб" variant="outlined" size="small" name="rent" value={item.rent} onChange={handleChange}/>
                <TextField id="outlined-basic" label="Страхование, руб" variant="outlined" size="small" name="insure" value={item.insure} onChange={handleChange}/>
                <TextField id="outlined-basic" label="Заработная плата / ФСЗН, руб" variant="outlined" size="small" name="zp" value={item.zp} onChange={handleChange}/>
                <TextField id="outlined-basic" label="ПО, руб" variant="outlined" size="small" name="prog" value={item.prog} onChange={handleChange}/>
                <TextField id="outlined-basic" label="Услуги связи VPN, руб" variant="outlined" size="small" name="sviaz" value={item.sviaz} onChange={handleChange}/>
                <TextField id="outlined-basic" label="Обслуживание АСКУЕ, руб" variant="outlined" size="small" name="askue" value={item.askue} onChange={handleChange}/>
                <TextField id="outlined-basic" label="Командировки, руб" variant="outlined" size="small" name="komandir" value={item.komandir} onChange={handleChange}/>
                <TextField id="outlined-basic" label="Прочие, руб" variant="outlined" size="small" name="other" value={item.other} onChange={handleChange}/>
                <TextField id="outlined-basic" label="План, руб" variant="outlined" size="small" name="plan" value={item.plan} onChange={handleChange}/>
                <TextField id="outlined-basic" label="Э/э по сети, руб" variant="outlined" size="small" name="energykwh" value={item.energykwh} onChange={handleChange}/>
                <Button sx={{width:'100px', alignSelf:'flex-end'}} variant="contained" onClick={onSubmit}>Добавить</Button>
              </Stack>
            </Stack>
          </TabPanel>
          )}
      </TabContext>
    </Stack>
  </div>
)}

const mapStateToProps = state => ({
  page1: state.pageReducer.page,
  region: state.pageReducer.region,
});
    
const mapDispatchToProps = {
  setCenter: setCoordinates,
  setZoom: setZoom
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsContainer));
