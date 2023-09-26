import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import route from '../../back_route';
import { Link } from "react-router-dom";
import { valueToFixed } from '../../CommonFuncs/editValues';
import { NavLink } from "react-router-dom";
import { setCoordinates, setZoom } from '../../redux/actions';
import {Stack, TextField, Typography, Button,
  InputLabel, MenuItem, FormControl, Select} from '@mui/material';
import { dateToString } from '../../CommonFuncs/editValues';

  import AppBar from '@mui/material/AppBar';
  import Box from '@mui/material/Box';
  import Toolbar from '@mui/material/Toolbar';
  import IconButton from '@mui/material/IconButton';
  // import Typography from '@mui/material/Typography';
  import Menu from '@mui/material/Menu';
  // import Item from '@mui/material/Item';
  import MenuIcon from '@mui/icons-material/Menu';
  import Container from '@mui/material/Container';
  import Avatar from '@mui/material/Avatar';
  // import Button from '@mui/material/Button';
  import Tooltip from '@mui/material/Tooltip';
  // import MenuItem from '@mui/material/MenuItem';
  import AdbIcon from '@mui/icons-material/Adb';
  import SvgIcon from '@mui/material/SvgIcon';
  import LocationListContainer from '../LocationListContainer/LocationListContainer';
  import { Header } from '../Header/Header';

  // import '../fonts//Montserrat-Regualar.ttf';
  // import style from './StartPage.module.css';

  const pages = ['Показатели', 'Карта станций', 'Список локаций', 'Статистика'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  
  export const AboutStationContainer = (props) => {
    const [flag, setFlag] = React.useState(2);
    const [locationData, setLocationData] = React.useState();
    const [locationStat, setLocationStat] = React.useState();
    const [stationData, setStationData] = React.useState([]);
    // const [flag2, setFlag2] = React.useState(true);
    // const [flag3, setFlag3] = React.useState(true);

    // const handleClick = () => {
    //   setFlag(!flag);
    //   setFlag2(!flag2);
    //   setFlag3(!flag3);
    // };

    useEffect(() => {
      console.log(locationData)
      console.log(props.location.id)
      // fetch(`../${route}/locationabout/${Number(props.location.id)}`)
      fetch(`${route}/locationabout/${Number(props.location.id)}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setLocationData(data)
        });
      fetch(`${route}/stationabout/${Number(props.location.id)}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setStationData(data)
        });
      fetch(`${route}/locationstat/${Number(props.location.id)}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setLocationStat(data)
        })
    }, [])

    // const handleClick = () => {
    //   setCoordinates({lat: Number(stationData.latitude), lng: Number(stationData.longitude) });
    //   setZoom(17);
    // }

    return (
      <Stack
        bgcolor="#F4F4FD"
        alignItems='center'
        // justifyContent='center'
      >
        <Header />
        
        <Stack
          // direction= "column"
          alignItems='center'
          justifyContent='center'
        >
          <Typography 
          m={"20px"} sx={{fontSize: '16px', fontWeight: '400', color: 'rgba(122, 122, 149, 1)'}} 
        >Беларусь > {locationData ? locationData[0].region : 'Нет данных'}</Typography>
          <Typography sx={{fontSize: '16px', fontWeight: '600', color: 'rgba(122, 122, 149, 1)'}} >{locationData ? locationData[0].name : 'Нет данных'}</Typography>
          <Typography sx={{fontSize: '16px', fontWeight: '400', color: 'rgba(122, 122, 149, 1)'}} >{locationData ? locationData[0].address : 'Нет данных'}</Typography>
          {/* <Typography>Введена: {locationData ? locationData[0].cumdate : 'Нет данных'}</Typography> */}
        </Stack>
        <Stack
          direction= "row"
          justifyContent='center'
            sx={{
                marginY: '50px',
                
                width: '100%'
                
            }}
        >
                 
                 <Link to={{pathname: '/maff', lt: locationData ? Number(locationData[0].latitude) : null, lg: locationData ? Number(locationData[0].longitude) : null, zoom: 20}}>
            <Button
              onClick={() => setFlag(1)}
              sx={flag != 1 ? {
                width: '125px',
                height: '36px',
                borderRadius: '16px',
                background: '#F4F4FD',
                boxShadow: '-6px -6px 30px #FFFFFF, 6px 6px 20px rgba(192, 192, 219, 0.7)',
                fontSize: '12px',
                border: '1px solid rgb(241, 241, 255)' ,
                fontWeight: '500',
                lineHeight: '14.63px',
                textTransform: 'capitalize',
                color: '#7A7A95',
                marginX: '6px',
            } : {
                width: '125px',
                height: '36px',
                borderRadius: '16px',
                background: '#F4F4FD',
                boxShadow: 'rgba(255, 255, 255, 0.7) -2px -2px 6px, rgba(192, 192, 219, 0.3) 2px 2px 6px, rgb(255, 255, 255) -2px -2px 2px inset, rgba(192, 192, 219, 0.7) 2px 2px 2px inset',
                fontSize: '12px',
                border: '1px solid white' ,
                fontWeight: '500',
                lineHeight: '14.63px',
                textTransform: 'capitalize',
                color: 'rgb(118, 210, 117)',
                marginX: '6px',
            }}
            >На карте</Button>
         </Link>
            <Button
              onClick={() => setFlag(2)}
              disableRipple
              sx={flag != 2 ? {
                  width: '125px',
                  height: '36px',
                  borderRadius: '16px',
                  background: '#F4F4FD',
                  boxShadow: '-6px -6px 30px #FFFFFF, 6px 6px 20px rgba(192, 192, 219, 0.7)',
                  fontSize: '12px',
                  border: '1px solid rgb(241, 241, 255)' ,
                  fontWeight: '500',
                  lineHeight: '14.63px',
                  textTransform: 'capitalize',
                  color: '#7A7A95',
                  marginX: '6px',
              } : {
                  width: '125px',
                  height: '36px',
                  borderRadius: '16px',
                  background: '#F4F4FD',
                  boxShadow: 'rgba(255, 255, 255, 0.7) -2px -2px 6px, rgba(192, 192, 219, 0.3) 2px 2px 6px, rgb(255, 255, 255) -2px -2px 2px inset, rgba(192, 192, 219, 0.7) 2px 2px 2px inset',
                  fontSize: '12px',
                  border: '1px solid white' ,
                  fontWeight: '500',
                  lineHeight: '14.63px',
                  textTransform: 'capitalize',
                  color: 'rgb(118, 210, 117)',
                  marginX: '6px',
              }}
            >О станции(ях)</Button>
            <Button
              onClick={() => setFlag(3)}
              disableRipple
              sx={flag != 3 ? {
                  width: '125px',
                  height: '36px',
                  borderRadius: '16px',
                  background: '#F4F4FD',
                  boxShadow: '-6px -6px 30px #FFFFFF, 6px 6px 20px rgba(192, 192, 219, 0.7)',
                  fontSize: '12px',
                  border: '1px solid rgb(241, 241, 255)' ,
                  fontWeight: '500',
                  lineHeight: '14.63px',
                  textTransform: 'capitalize',
                  color: '#7A7A95',
                  marginX: '6px',
              } : {
                  width: '125px',
                  height: '36px',
                  borderRadius: '16px',
                  background: '#F4F4FD',
                  boxShadow: 'rgba(255, 255, 255, 0.7) -2px -2px 6px, rgba(192, 192, 219, 0.3) 2px 2px 6px, rgb(255, 255, 255) -2px -2px 2px inset, rgba(192, 192, 219, 0.7) 2px 2px 2px inset',
                  fontSize: '12px',
                  border: '1px solid white' ,
                  fontWeight: '500',
                  lineHeight: '14.63px',
                  textTransform: 'capitalize',
                  color: 'rgb(118, 210, 117)',
                  marginX: '6px',
              }}
            >Показатели</Button>
        </Stack>
        <Stack
          paddingX="35px"
          paddingY="30px"
          sx={{
            borderRadius: "12px",
            color: "#7A7A95",
            boxShadow:
              "inset -2px -2px 2px #FFFFFF, inset 2px 2px 2px rgba(192, 192, 219, 0.7) !important",
            }}
        >
          {flag == 2 ? <Stack
            direction="row"
          >
            <Stack
              alignItems="center"
              paddingX="10px"
            >
              <Typography sx={{fontSize: '16px', fontWeight: '600'}} pb='16px'>Дочернее</Typography>
              <Typography sx={{fontSize: '16px', fontWeight: '600'}} pb='16px'>Мощность</Typography>
              <Typography sx={{fontSize: '16px', fontWeight: '600'}} pb='16px'>Количество</Typography>
              {stationData.map(item=>(
                <Typography>{item.friendlycode}</Typography>
              ))}
              <Typography sx={{fontSize: '14px', fontWeight: '600'}} pt='16px'>Места рядом</Typography>
              <Typography>Тип расположения</Typography>
              <Typography>Область</Typography>
            </Stack>
            <Stack
              alignItems="center"
              paddingX="10px"
            >
              <Typography sx={{fontSize: '16px', fontWeight: '600'}} pb='16px' onClick={() => console.log(locationData)}>{locationData ? locationData[0].company : 'Нет данных'}</Typography>
              <Typography sx={{fontSize: '16px', fontWeight: '600'}} pb='16px'>{locationData ? locationData[0].sum : 'Нет данных'}</Typography>
              <Typography sx={{fontSize: '16px', fontWeight: '600'}} pb='16px'>{locationData ? locationData[0].count : 'Нет данных'}</Typography>
              {stationData.map(item=>(
                <Stack
                  flexDirection='row'
                >
                  <Typography
                    mx='8px'
                  >{item.power}</Typography>
                  <Typography>{dateToString(item.cumdate)}</Typography>
                </Stack>
                
              ))}
              <Typography sx={{fontSize: '14px', fontWeight: '600'}} pt='16px'>{locationData ? locationData[0].nearplaces : 'Нет данных'}</Typography>
              <Typography>{locationData ? locationData[0].destination : 'Нет данных'}</Typography>
              <Typography>{locationData ? locationData[0].region : 'Нет данных'}</Typography>
            </Stack>
          </Stack> : null}
          {flag == 3 ? <Stack
            direction="row"
          >
            <Stack
              alignItems="center"
              paddingX="10px"
            >
              <Typography sx={{fontSize: '16px', fontWeight: '600', color: 'rgba(122, 122, 149, 1)'}}>ИТОГО выручка</Typography>
              <Typography sx={{fontSize: '16px', fontWeight: '600', color: 'rgba(122, 122, 149, 1)'}} my='16px'>CAPEX</Typography>
              <Typography sx={{fontSize: '16px', fontWeight: '600', color: 'rgba(122, 122, 149, 1)'}} mb='16px'>% покрытия</Typography>
              <Typography sx={{fontSize: '14px', fontWeight: '600', color: 'rgba(122, 122, 149, 1)'}}>Итого сессий</Typography>
              <Typography>Успешные %</Typography>
              <Typography>AVG, кВтч</Typography>
              <Typography>AVG t, чч:мм:сс</Typography>
              <Typography sx={{fontSize: '14px', fontWeight: '600', color: 'rgba(122, 122, 149, 1)'}} mt='16px'>Итого кВтч</Typography>
            </Stack>
            <Stack
              alignItems="center"
              paddingX="10px"
            >
              <Typography sx={{fontSize: '16px', fontWeight: '600', color: 'rgba(122, 122, 149, 1)'}} >{locationStat ? valueToFixed(locationStat[0].income) : 'Нет данных'}</Typography>
              <Typography sx={{fontSize: '16px', fontWeight: '600', color: 'rgba(122, 122, 149, 1)'}} my='16px'>{locationStat ? valueToFixed(locationStat[0].kapzatr) : 'Нет данных'}</Typography>
              <Typography sx={{fontSize: '16px', fontWeight: '600', color: 'rgba(122, 122, 149, 1)'}} mb='16px'>{locationStat ? valueToFixed(locationStat[0].income / locationStat[0].kapzatr * 100) : 'Нет данных'}</Typography>
              <Typography sx={{fontSize: '14px', fontWeight: '600', color: 'rgba(122, 122, 149, 1)'}}>{locationStat ? valueToFixed(locationStat[0].sessioncnt) : 'Нет данных'}</Typography>
              <Typography>{locationStat ? valueToFixed(100 - (locationStat[0].sessionfailcnt / locationStat[0].sessioncnt * 100)): 'Нет данных'}</Typography>
              <Typography>{locationStat ? valueToFixed(locationStat[0].avgkwh) : 'Нет данных'}</Typography>
              <Typography>{locationStat ? locationStat[0].avgtime.hours ? locationStat[0].avgtime.hours : '00' + ':' + locationStat[0].avgtime.minutes + ':' + locationStat[0].avgtime.seconds : 'Нет данных'}</Typography>
              <Typography sx={{fontSize: '14px', fontWeight: '600', color: 'rgba(122, 122, 149, 1)'}} mt='16px'>{locationStat ? valueToFixed(locationStat[0].totalkwh) : 'Нет данных'}</Typography>
            </Stack>
          </Stack> : null}
        </Stack>
        <Stack>

        </Stack>
      </Stack>
    );
  }

  const mapStateToProps = state => ({
    page: state.pageReducer.page,
    region: state.pageReducer.region,
  });

  // const mapDispatchToProps = {
  //   setCenter: setCoordinates,
  //   setZoom: setZoom
  // };

  export default withRouter(connect(mapStateToProps, null)(AboutStationContainer));