import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import route from '../../back_route';
import { Link } from "react-router-dom";
import {Stack, TextField, Typography, Button,
  InputLabel, MenuItem, FormControl, Select, Checkbox, ListItemText, Divider} from '@mui/material';
import {regions, companies, vendors, connectors, locationTypes, stationTypes, orderTypes, indicatorTypes, regionList, companyList, locationTypeList, stationTypeList, connectorList} from '../../CommonText/Places';

import { makeStyles, withStyles } from '@mui/styles';


  // import '../fonts//Montserrat-Regualar.ttf';
  import style from './LocationIndicatorsForm.module.css';
  // import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import 'dayjs/locale/en-gb';
  import 'dayjs/locale/de';
  import { dateToString } from '../../CommonFuncs/editValues';

  // const pages = ['Показатели', 'Карта станций', 'Список локаций', 'Статистика'];
  // const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const WhiteBackgroundCheckbox = withStyles((theme) => ({
    root: {
      // width: "220px",
      "&$checked": {
        color: "#FFFFFF",
        "& .MuiIconButton-label": {
          position: "relative",
          zIndex: 0
        },
        "& .MuiIconButton-label:after": {
          content: '""',
          left: 4,
          top: 4,
          height: 15,
          width: 15,
          position: "absolute",
          backgroundColor: "#76D275",
          zIndex: -1
        }
      },
      "&$notchedOutline": {
        border: "none",
      }
    },
    checked: {}
  }))(Checkbox);

  const useStyles = makeStyles(() => ({
    inputRoot: {
      // width: "300px",
      // borderRadius: "12px",
      // backgroundColor: "#F4F4FD",
      color: "#7A7A95",
      // height: "36px",
      // padding: "16px",
      // boxShadow:
      //   "inset -2px -2px 2px #FFFFFF, inset 2px 2px 2px rgba(192, 192, 219, 0.7) !important",
    },
    inputLabelRoot: {
      color: "red",
      fontSize: "12px",
      fontWeight: 600,
      lineHeight: "15px",
      ransform: "scale(1)"
    },
    selected: {
      "&:focus": {
        borderRadius: "12px",
      },
      "&$notchedOutline": {
        border: "none",
      }
    },
    underline: {
      "&::after": {
        borderBottom: "2px solid transparent",
        width: "0px"
      },
      "&::before": {
        borderBottom: "2px solid transparent",
        width: "0px"
      }
    },
  }));
  
  export const LocationIndicatorsForm = () => {
    const [flag, setFlag] = React.useState(false);
    const [flag2, setFlag2] = React.useState(true);
    const [locations, setLocations] = useState([]);
    const classes = useStyles();
    const [personName, setPersonName] = React.useState([]);
    const [regionList, setRegionList] = React.useState([]);
    const [connectorList, setConnectorList] = React.useState([]);
    const [stationTypesList, setStationTypesList] = React.useState([]);
    const [companyList, setCompanyList] = React.useState([]);
    const [vendorList, setVendorList] = React.useState([]);
    const [locationTypesList, setLocationTypesList] = React.useState([]);
    const [count, setStationCount] = React.useState(0);
    const [stationNum, setStationNum] = React.useState(0);
    const [kwFrom, setKwFrom] = React.useState(0);
    const [kwTo, setKwTo] = React.useState(0);
    const [indicatorList, setIndicatorList] = React.useState()
    const [indicator, setIndicator] = React.useState([]);
    const [order, setOrder] = React.useState([]);
    const [dateFrom, setDateFrom] = useState(new Date().getFullYear() + '-' + (new Date().getMonth()) + '-' + (new Date().getDate()))
    const [dateTo, setDateTo] = useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate()))
    // const [value, setValue] = React.useState(new Date());
    // const [locationId, setLocationId] = React.useState();

    const handleChange = (event) => {
      const {
        target: { value }
      } = event;
      setRegionList(
        typeof value === "string" ? value.split(",") : value
      );
    };

    const handleChangeStationTypes = (event) => {
      const {
        target: { value }
      } = event;
      setStationTypesList(
        typeof value === "string" ? value.split(",") : value
      );
    };

    const handleChangeIndicatorList = (event) => {
      const {
        target: { value }
      } = event;
      setIndicatorList(value)
      // setIndicatorList(
      //   typeof value === "string" ? value.split(",") : value
      // );
    };

    const handleChangeVendor = (event) => {
      const {
        target: { value }
      } = event;
      setVendorList(
        typeof value === "string" ? value.split(",") : value
      );
    };

    const handleChangeLocationTypesList = (event) => {
      const {
        target: { value }
      } = event;
      setLocationTypesList(
        typeof value === "string" ? value.split(",") : value
      );
    };

    const handleChangeOrderTypeList = (event) => {
      const {
        target: { value }
      } = event;
      setOrder(value);
    };

    const handleLocationClick = (id) => {
      console.log(id)
    }

    const handleClick = () => {
      setFlag(!flag);
      setFlag2(!flag2);
    };

    // useEffect(() => {
    //   // let id = {array: ["Гроднооблнефтепродукт", "Гомельоблнефтепродукт"]}
    //   let id = {array: regionList, connector: connectorList}
    //   // fetch(`${route}/location`)
    //   fetch(`${route}/locationfull/${JSON.stringify(id)}`)
    //   // fetch(`../${route}/locationinfo/${1}`)
    //     .then(response => {
    //       return response.json();
    //     })
    //     .then(data => {
    //       setLocations(data);
    //     });
    // }, [])

    const styleObj = {
      "&:hover": {
        backgroundColor: "red"
      },
      "&:active": {
        backgroundColor: "blue"
      }
    };

    const sortLocations = (array, param) => {
      array.sort((x, y) => x[param] - y[param])
      return (array)
    }

    const sortLocationsDesc = (array, param) => {
      array.sort((x, y) => y[param] - x[param])
      return (array)
    }

    const outputFunc = () => {
      // console.log(indicatorList)
      let param = 'totalcost';
      if(indicatorList == 'Выручка') {
        param = 'totalcost'
      }
      if(indicatorList == 'Сессии') {
        param = 'sessioncount'
      }
      if(indicatorList == 'Потребление') {
        param = 'sumkwh'
      }
      let id = {
        param: param,
        dateFrom: dateToString(dateFrom),
        dateTo: dateToString(dateTo)
      }
      console.log(id)
      // fetch(`${route}/locationfull/${JSON.stringify(id)}`)
      // fetch(`../${route}/locationinfo/${1}`)
      fetch(`${route}/getMainIndicatorsList/${JSON.stringify(id)}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setLocations(order == 'Возрастанию' ? sortLocations(data, id.param) : sortLocationsDesc(data, id.param));
        });
    }

    return (

      <Stack
        direction="column"
        width='100%'
        alignItems='center'
        bgcolor="#F4F4FD"
        // paddingY='52px'
        sx={{
          flex: '1 0 auto'
        }}
      >
        <Stack
          direction="row"
          sx={{
            padding: '46px'
          }}
        >
          <Stack
            direction="column"
          >
          <Stack 
            direction="row"
          >
            <FormControl>
            <InputLabel 
            // inputProps={{
            //     classes: {
            //       root: classes.inputRoot,
            //       select: classes.selected,
            //       focus: classes.focused
            //     }
            //   }} 
              sx={{
              top: "6px",
              left: "10px",
              "&:focus": {
                top: "3px",
              },
            }} id="test-select-label">Параметр</InputLabel>
            <Select
              // multiple
              value={indicatorList}
              disableUnderline={true}
              sx={{
                width: "220px",
                height: "49px",
                borderRadius: "12px",
                backgroundColor: "#F4F4FD",
                color: "#7A7A95",
                padding: "16px",
                margin: "10px",
                boxShadow:
                  "inset -2px -2px 2px #FFFFFF, inset 2px 2px 2px rgba(192, 192, 219, 0.7) !important",
                }}
              onChange={(handleChangeIndicatorList)}
              inputProps={{
                classes: {
                  root: classes.inputRoot,
                  select: classes.selected,
                  focus: classes.focused
                }
              }}
              // renderValue={indicatorList}
              // renderValue={(selected) => selected.join(", ")}
            >
              {indicatorTypes.map((name) => (
                <MenuItem
                  sx={{
                    padding: "10px",
                    background: "rgba(255, 255, 255, 1)",
                    borderBottom: "1px solid rgba(122, 122, 149, 0.5) !important"
                  }}
                  key={name}
                  value={name}
                >
                  <ListItemText 
                    sx={{
                      color: "rgba(122, 122, 149, 1)"
                    }}
                    primary={name} />
                </MenuItem>
              ))}
            </Select>
            </FormControl>
            <FormControl>
            <InputLabel 
            inputProps={{
                classes: {
                  root: classes.inputRoot,
                  select: classes.selected,
                  focus: classes.focused
                }
              }} sx={{
              top: "6px",
              left: "10px",
              "&:focus": {
                top: "3px",
              },
            }} id="test-select-label">Сортировать по</InputLabel>
            <Select
              value={order}
              disableUnderline={true}
              sx={{
                width: "220px",
                height: "49px",
                borderRadius: "12px",
                backgroundColor: "#F4F4FD",
                color: "#7A7A95",
                padding: "16px",
                margin: "10px",
                boxShadow:
                  "inset -2px -2px 2px #FFFFFF, inset 2px 2px 2px rgba(192, 192, 219, 0.7) !important",
                }}
              onChange={handleChangeOrderTypeList}
              // inputProps={{
              //   classes: {
              //     root: classes.inputRoot,
              //     select: classes.selected,
              //     focus: classes.focused
              //   }
              // }}
              // renderValue={(selected) => selected.join(", ")}
            >
              {orderTypes.map((item) => (
                <MenuItem
                  sx={{
                    padding: "10px",
                    background: "rgba(255, 255, 255, 1)",
                    borderBottom: "1px solid rgba(122, 122, 149, 0.5) !important"
                  }}
                  key={item}
                  value={item}
                >
                  <ListItemText 
                    sx={{
                      color: "rgba(122, 122, 149, 1)"
                    }}
                    primary={item} />
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DatePicker
        views={['year', 'month', 'day']}
        // label="Year and Month"
        minDate={new Date('2021-01-01')}
        maxDate={new Date('2025-01-01')}
        value={dateFrom}
        onChange={(newValue) => {
          setDateFrom(newValue);
        }}
        renderInput={(props) => <TextField {...props} sx={{
          width: "220px",
          height: "49px",
          borderRadius: "12px",
          backgroundColor: "#F4F4FD",
          color: "#7A7A95",
          margin: "10px",
          boxShadow:
            "inset -2px -2px 2px #FFFFFF, inset 2px 2px 2px rgba(192, 192, 219, 0.7) !important",
        }} />}
      />
    </LocalizationProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DatePicker
        views={['year', 'month', 'day']}
        minDate={new Date('2021-01-01')}
        maxDate={new Date('2025-01-01')}
        value={dateTo}
        onChange={(newValue) => {
          setDateTo(newValue);
        }}
        renderInput={(props) => <TextField {...props} sx={{
          width: "220px",
          height: "49px",
          borderRadius: "12px",
          backgroundColor: "#F4F4FD",
          color: "#7A7A95",
          margin: "10px",
          boxShadow:
            "inset -2px -2px 2px #FFFFFF, inset 2px 2px 2px rgba(192, 192, 219, 0.7) !important",
        }} />}
      />
    </LocalizationProvider>
          {/* <input className={`${style.test2} ${style.inputwidth2}`} placeholder="Номер станции" /> */}
         </Stack>
         <Stack
            flexDirection='row-reverse'
         >
            <Button 
              onClick={outputFunc}
              sx = {{
                background: 'linear-gradient(271.12deg, #6FBE6E 0%, #8BEB8A 100%)',
                padding: '14px 16px 16px',
                borderRadius: '100px',
                height: '36px',
                color: 'white',
                fontSize: '12px',
                color: 'white',
                width: '120px',
                margin: '10px'
              }}
            >Найти</Button>
            {/* <Button 
              onClick={outputFunc}
              sx = {{
                background: 'rgb(252, 151, 140)',
                padding: '14px 16px 16px',
                borderRadius: '100px',
                height: '36px',
                color: 'white',
                fontSize: '12px',
                color: 'white',
                width: '120px',
                margin: '10px'
              }}  
            >Очистить</Button> */}
            </Stack>
          </Stack>
          
        </Stack>
        <Stack
          
          sx={{
            paddingBottom: '17px',
            color: '#7A7A95'
          }}
        >
          Всего: {locations.length} локаций
           {/* ({count} станций) */}
        </Stack>
        <Stack
          direction='column'
          
        > 
        {locations.map(item => (
          <NavLink to={{pathname: '/maff/locationabout', id: item.id}}>
          {/* <div className={style.menuName}>г. Минск</div> */}
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            sx={{
              boxShadow: 'rgba(255, 255, 255, 0.7) -2px -2px 4px, rgb(208, 208, 230) 2px 2px 4px',
              borderRadius: '16px',
              padding: '16px',
              margin: '6px',
              color: '#7A7A95',
              width: '70vw'
            }}
          >
            <Stack
              onClick={() => handleLocationClick(item.id)}
              direction='column'
              // justifyContent='center'
              // alignItems='space-between'
              sx={{
                width: '250px',
                paddingRight: '16px',
                // display: 'flex',
                // flex: '1'  
                // textOverflow: 'ellipsis',
                // whiteSpace: 'nowrap',
                // overflow: 'hidden'
              }}
            >
              <Typography 
                className={style.tableData} 
                sx={{
                  fontWeight: '600',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden'
                }}
              >{item.name}
              </Typography>
              <Typography
                className={style.tableData}
                sx={{
                  // fontWeight: '600',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden'
                }}  
              >
                {item.address}
              </Typography>
              {/* <div className={style.tableData}>{item.address}</div> */}
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack>
              {item.sumkwh}
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack>
            {item.totalcost}
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack>
            {item.sessioncount}
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack>
              {(Number(item.sumkwh) / 50000 * 100).toFixed(2)}
            {/* {item.sessionfailcnt} */}
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack>
              ------
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack>
              ------
            </Stack>
          </Stack>
          
          </NavLink>
        ))

        }
        </Stack>
      </Stack> 
    );
  }

  const mapStateToProps = state => ({
    page: state.pageReducer.page,
    region: state.pageReducer.region,
  });

  export default withRouter(connect(mapStateToProps, null)(LocationIndicatorsForm));