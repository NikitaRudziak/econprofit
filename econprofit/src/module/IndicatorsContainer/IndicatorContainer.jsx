import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import route from '../../back_route';
import { Link } from "react-router-dom";
import { valueToFixed } from '../../CommonFuncs/editValues';
import {Stack, TextField, Typography, Button,
  InputLabel, MenuItem, FormControl, Select, Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  import { makeStyles, withStyles } from '@mui/styles';

  // import '../fonts//Montserrat-Regualar.ttf';
  // import style from './StartPage.module.css';

//   const pages = ['Показатели', 'Карта станций', 'Список локаций', 'Статистика'];
//   const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const useStyles = makeStyles(() => ({
    MuiAccordionroot: {
      "&.MuiAccordion-root": {
        borderRadius: "16px !important" 
      },
      "&.MuiAccordion-root:before": {
        backgroundColor: "#F4F4FD"
      }
    }
  }));
  
  export const IndicatorContainer = (props) => {
    const [flag, setFlag] = React.useState(2);
    const [locationData, setLocationData] = React.useState();
    const [expanded, setExpanded] = React.useState(false);
    const [data, setData] = React.useState(false);
    const classes = useStyles();

    const handleChange = (panel) => (event, isExpanded) => {
      console.log(isExpanded)
      setExpanded(isExpanded ? panel : false);
      
    };

    // const handleClick = () => {
    //   setFlag(!flag);
    //   setFlag2(!flag2);
    //   setFlag3(!flag3);
    // };

    useEffect(() => {
      fetch(`${route}/getIndicatorsByYear`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setData(data)
        // console.log(data)
      })
      .catch(function (error) {
        console.log(error);
      });
        
      console.log(locationData)
    }, [])

    

    return (
      <Stack
        bgcolor="#F4F4FD"
        alignItems='center'
        sx={{
          flex: '1 0 auto'
        }}
        
        // height="100vh"
        paddingY='52px'
        width='100%'
      > 
        <Typography
          sx = {{
            fontSize: '16px',
            fontWeight: '600',
            lineHeight: '19.5px',
            fontStyle: 'normal',
            color: '#7A7A95',
            marginBottom: "50px"
          }}
        >Показатели</Typography>
        <Stack
          width='800px'
        >
          <Stack 
            flexDirection='row'
            justifyContent='space-between'
            px='25px'
          >
            <Typography sx={{ width: '33%', flexShrink: 0, color: 'rgba(122, 122, 149, 1)', fontWeight: '500'}}>Показатели</Typography>
            <Typography sx={{ width: '22%', color: 'rgba(122, 122, 149, 1)', fontWeight: '500' }}>2021</Typography>
            <Typography sx={{ width: '22%', color: 'rgba(122, 122, 149, 1)', fontWeight: '500' }}>2022</Typography>
            <Typography sx={{ width: '22%', color: 'rgba(122, 122, 149, 1)', fontWeight: '500' }}>2023</Typography>
          </Stack>
          <Accordion 
          sx= {{
            boxShadow: 'rgba(255, 255, 255, 0.7) -2px -2px 6px, rgba(192, 192, 219, 0.3) 2px 2px 6px, rgb(255, 255, 255) -2px -2px 2px inset, rgba(192, 192, 219, 0.7) 2px 2px 2px inset',
            border: '1px solid white' ,
            borderRadius: '16px',
            background: '#F4F4FD',
            margin: "12px"
          }}
          classes={{
            root: classes.MuiAccordionroot
         }}
          
          expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0, color: 'rgba(122, 122, 149, 1)' }}>
            Объем оказанных услуг:
          </Typography>
          {
            data ? data.map(item => (
              <Typography sx={{ width: '22%', color: 'text.secondary' }}>{Number((item.sumenergy)).toFixed(2)}</Typography>
            )) : null
          }
        </AccordionSummary>
        <AccordionDetails>
          <Stack flexDirection="row">
          <Typography py='16px' sx={{ width: '32%', flexShrink: 0, color: 'rgba(122, 122, 149, 1)' }}>
            Среднесуточный отпуск
          </Typography>
          {
            data ? data.map(item => (
              <Typography py='16px' sx={{ width: '22%', color: 'text.secondary' }}>{Number((item.avgenergy)).toFixed(2)}</Typography>
            )) : null
          }
          </Stack>
          <Stack flexDirection="row">
          <Typography sx={{ width: '32%', flexShrink: 0, color: 'rgba(122, 122, 149, 1)' }}>
            Выручка от зарядки с НДС
          </Typography>
          {
            data ? data.map(item => (
              <Typography sx={{ width: '22%', color: 'text.secondary' }}>{Number((item.valuevat)).toFixed(2)}</Typography>
            )) : null
          }
          </Stack>
          
        </AccordionDetails>
          </Accordion>
          <Accordion 
          sx= {{
            boxShadow: 'rgba(255, 255, 255, 0.7) -2px -2px 6px, rgba(192, 192, 219, 0.3) 2px 2px 6px, rgb(255, 255, 255) -2px -2px 2px inset, rgba(192, 192, 219, 0.7) 2px 2px 2px inset',
            border: '1px solid white' ,
            borderRadius: '16px',
            background: '#F4F4FD',
            margin: "12px"
          }} 
          classes={{
            root: classes.MuiAccordionroot
         }}
          
          expanded={expanded === 'panel2'} onChange={handleChange('panel2')} >
          <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          
        >
          <Typography sx={{ width: '33%', flexShrink: 0, color: 'rgba(122, 122, 149, 1)' }}>
            Итого выручка с НДС
          </Typography>
          {
            data ? data.map(item => (
              <Typography sx={{ width: '22%', color: 'text.secondary' }}>{Number((item.valuevat)).toFixed(2)}</Typography>
            )) : null
          }
        </AccordionSummary>
        <AccordionDetails>
        <Stack flexDirection="row">
          <Typography sx={{ width: '32%', flexShrink: 0, color: 'rgba(122, 122, 149, 1)' }}>
            НДС
          </Typography>
          {
            data ? data.map(item => (
              <Typography sx={{ width: '22%', color: 'text.secondary' }}>{Number((item.nds)).toFixed(2)}</Typography>
            )) : null
          }
          </Stack>
          <Stack flexDirection="row">
          <Typography py='16px' sx={{ width: '32%', flexShrink: 0, color: 'rgba(122, 122, 149, 1)' }}>
            Выручка без НДС
          </Typography>
          {
            data ? data.map(item => (
              <Typography py='16px' sx={{ width: '22%', color: 'text.secondary' }}>{(Number((item.valuevat)).toFixed(2) - Number((item.nds)).toFixed(2)).toFixed(2)}</Typography>
            )) : null
          }
          </Stack>
        </AccordionDetails>
          </Accordion>
          {/* <Accordion 
          sx= {{
            boxShadow: 'rgba(255, 255, 255, 0.7) -2px -2px 6px, rgba(192, 192, 219, 0.3) 2px 2px 6px, rgb(255, 255, 255) -2px -2px 2px inset, rgba(192, 192, 219, 0.7) 2px 2px 2px inset',
            border: '1px solid white' ,
            borderRadius: '16px',
            background: '#F4F4FD',
            margin: "12px"
          }} 
          classes={{
            root: classes.MuiAccordionroot
         }}
          expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Затраты на производство и реализацию
          </Typography>
          <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111</Typography>
          <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111</Typography>
          <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111</Typography>
          <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111</Typography>
          <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111</Typography>
          <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack flexDirection="row">
            <Typography sx={{ width: '32%', flexShrink: 0 }}>
              Условно переменные
            </Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
          </Stack>
          <Stack flexDirection="row">
            <Typography sx={{ width: '32%', flexShrink: 0 }}>
              Условно постоянные
            </Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
          </Stack>
          <Stack flexDirection="row">
            <Typography sx={{ width: '32%', flexShrink: 0 }}>
              Амортизация ОС и НМА
            </Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
          </Stack>
        </AccordionDetails>
          </Accordion>
          <Accordion 
            sx= {{
              boxShadow: 'rgba(255, 255, 255, 0.7) -2px -2px 6px, rgba(192, 192, 219, 0.3) 2px 2px 6px, rgb(255, 255, 255) -2px -2px 2px inset, rgba(192, 192, 219, 0.7) 2px 2px 2px inset',
              border: '1px solid white' ,
              borderRadius: '16px',
              background: '#F4F4FD',
              margin: "12px"
            }} 
            classes={{
              root: classes.MuiAccordionroot
            }}
            expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Покрытие затрат на производство и реализацию выручкой без НДС, %
              </Typography>
              <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111</Typography>
              <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111</Typography>
              <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111</Typography>
              <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111</Typography>
              <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111</Typography>
              <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack flexDirection="row">
                <Typography sx={{ width: '32%', flexShrink: 0 }}>
                  Затраты на производство и реализацию без амортизации ОС и НМА
                </Typography>
                <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
                <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
                <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
                <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
                <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
                <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Stack flexDirection="row"
            sx= {{
              boxShadow: 'rgba(255, 255, 255, 0.7) -2px -2px 6px, rgba(192, 192, 219, 0.3) 2px 2px 6px, rgb(255, 255, 255) -2px -2px 2px inset, rgba(192, 192, 219, 0.7) 2px 2px 2px inset',
              border: '1px solid white' ,
              borderRadius: '16px',
              background: '#F4F4FD',
              margin: "12px",
              padding: "16px"
            }}
          >
            <Typography sx={{ width: '32%', color: 'text.secondary' }}>Прибыль</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
          </Stack>
          <Stack flexDirection="row"
            sx= {{
              boxShadow: 'rgba(255, 255, 255, 0.7) -2px -2px 6px, rgba(192, 192, 219, 0.3) 2px 2px 6px, rgb(255, 255, 255) -2px -2px 2px inset, rgba(192, 192, 219, 0.7) 2px 2px 2px inset',
              border: '1px solid white' ,
              borderRadius: '16px',
              background: '#F4F4FD',
              margin: "12px",
              padding: "16px"
            }}
          >
            <Typography sx={{ width: '32%', color: 'text.secondary' }}>Рентабельность реализованной продукции</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
          </Stack>
          <Stack flexDirection="row"
            sx= {{
              boxShadow: 'rgba(255, 255, 255, 0.7) -2px -2px 6px, rgba(192, 192, 219, 0.3) 2px 2px 6px, rgb(255, 255, 255) -2px -2px 2px inset, rgba(192, 192, 219, 0.7) 2px 2px 2px inset',
              border: '1px solid white' ,
              borderRadius: '16px',
              background: '#F4F4FD',
              margin: "12px",
              padding: "16px"
            }}
          >
            <Typography sx={{ width: '32%', color: 'text.secondary' }}>Рентабельность продаж</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
          </Stack>
          <Stack flexDirection="row"
            sx= {{
              boxShadow: 'rgba(255, 255, 255, 0.7) -2px -2px 6px, rgba(192, 192, 219, 0.3) 2px 2px 6px, rgb(255, 255, 255) -2px -2px 2px inset, rgba(192, 192, 219, 0.7) 2px 2px 2px inset',
              border: '1px solid white' ,
              borderRadius: '16px',
              background: '#F4F4FD',
              margin: "12px",
              padding: "16px"
            }}
          >
            <Typography sx={{ width: '32%', color: 'text.secondary' }}>Затраты (руб) на 1 кВтч оказанных услуг</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
            <Typography sx={{ width: '11%', color: 'text.secondary' }}>2111111</Typography>
          </Stack> */}
        </Stack>
      </Stack>
    );
  }

  const mapStateToProps = state => ({
    page: state.pageReducer.page,
    region: state.pageReducer.region,
  });

  export default withRouter(connect(mapStateToProps, null)(IndicatorContainer));