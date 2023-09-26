import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import route from '../../back_route';
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {Stack, TextField, Typography, Button,
  InputLabel, MenuItem, FormControl, Select, Checkbox, ListItemText} from '@mui/material';
import {regions, companies, vendors, connectors, locationTypes, stationTypes, regionList, companyList, locationTypeList, stationTypeList, connectorList} from '../../CommonText/Places';

import { makeStyles, withStyles } from '@mui/styles';


  // import '../fonts//Montserrat-Regualar.ttf';
  import style from './LocationListForm.module.css';

  // const pages = ['Показатели', 'Карта станций', 'Список локаций', 'Статистика'];
  // const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const WhiteBackgroundCheckbox = withStyles((theme) => ({
    root: {
      color: "rgba(122, 122, 149, 1)",
      width: "24px",
      height: "24px",
      "&$checked": {
        color: "#76D275",
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
      transform: "scale(1)"
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
  
  export const LocationListForm = () => {
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

    const handleChangeCompanyTypes = (event) => {
      const {
        target: { value }
      } = event;
      setCompanyList(
        typeof value === "string" ? value.split(",") : value
      );
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

    const outputFunc = () => {
      console.log(stationNum)
      let id = {
       region: regionList.length == 0 ? regions : regionList,
       stationType: stationTypesList.length == 0 ? stationTypes : stationTypesList,
       company: companyList.length == 0 ? companies : companyList,
       vendor: vendorList.length == 0 ? vendors : vendorList,
       locationType: locationTypesList.length == 0 ? locationTypes : locationTypesList,
       stationNum: stationNum ? stationNum : 0,
       kwFrom: kwFrom ? kwFrom : 0,
       kwTo: kwTo ? kwTo : 1000,
      }
      fetch(`${route}/locationfull/${JSON.stringify(id)}`)
      // fetch(`../${route}/locationinfo/${1}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setLocations(data);
          let count = 0;
          data.map(item => {
            count += Number(item.count)
          })
          console.log(count)
          setStationCount(count)
        });
    }

    return (
        <Stack>
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
            <select className={`${style.test2} ${style.selectwidth}`}>
              <option value="" disabled selected>Город</option>
            </select>
            <FormControl>
            <InputLabel
              // focused="true"
              // inputProps={{
              //   classes: {
              //     // root: classes.inputRoot,
              //     // select: classes.selected,
              //     focus: {color: "red"}
              //   }
              // }} 
              sx={{
                top: "10px",
                left: "10px",
                color: "rgb(205,205,220)",
                ".Mui-focused": {
                  color:"red"
                  // top: "3px",
              },
            }} id="test-select-label">Дочернее</InputLabel>
            <Select
              multiple
              value={companyList}
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
              onChange={handleChangeCompanyTypes}
              inputProps={{
                classes: {
                  root: classes.inputRoot,
                  select: classes.selected,
                  focus: classes.focused
                }
              }}
              renderValue={(selected) => selected.join(", ")}
            >
              {companies.map((name) => (
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
                    primary={name}
                  />
                  <WhiteBackgroundCheckbox checked={companyList.indexOf(name) > -1} />
                </MenuItem>
              ))}
            </Select>
            </FormControl>
            <FormControl>
            <InputLabel inputProps={{
                classes: {
                  root: classes.inputRoot,
                  select: classes.selected,
                  focus: classes.focused
                }
              }} 
              sx={{
                top: "10px",
                left: "10px",
                color: "rgb(205,205,220)",
                ".Mui-focused": {
                  color:"red"
                  // top: "3px",
              },
            }} id="test-select-label">Тип локации</InputLabel>
            <Select
              multiple
              value={locationTypesList}
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
              onChange={handleChangeLocationTypesList}
              inputProps={{
                classes: {
                  root: classes.inputRoot,
                  select: classes.selected,
                  focus: classes.focused
                }
              }}
              renderValue={(selected) => selected.join(", ")}
            >
              {locationTypes.map((name) => (
                <MenuItem
                sx={{
                  padding: "10px",
                  background: "rgba(255, 255, 255, 1)",
                  borderBottom: "1px solid rgba(122, 122, 149, 0.5) !important"
                }}
                  key={name}
                  value={name}
                >
                  <ListItemText sx={{
                      color: "rgba(122, 122, 149, 1)"
                    }} 
                    primary={name} />
                  <WhiteBackgroundCheckbox checked={locationTypesList.indexOf(name) > -1} />
                </MenuItem>
              ))}
            </Select>
            </FormControl>
            <FormControl>
            <InputLabel inputProps={{
                classes: {
                  root: classes.inputRoot,
                  select: classes.selected,
                  focus: classes.focused
                }
              }} 
              sx={{
                top: "10px",
                left: "10px",
                color: "rgb(205,205,220)",
                ".Mui-focused": {
                  color:"red"
                  // top: "3px",
              },
            }} id="test-select-label">Производитель</InputLabel>
            <Select
              multiple
              value={vendorList}
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
              onChange={handleChangeVendor}
              inputProps={{
                classes: {
                  root: classes.inputRoot,
                  select: classes.selected,
                  focus: classes.focused
                }
              }}
              renderValue={(selected) => selected.join(", ")}
            >
              {vendors.map((name) => (
                <MenuItem
                sx={{
                  padding: "10px",
                  background: "rgba(255, 255, 255, 1)",
                  borderBottom: "1px solid rgba(122, 122, 149, 0.5) !important"
                }}
                >
                  <ListItemText sx={{
                      color: "rgba(122, 122, 149, 1)"
                    }} 
                    primary={name} />
                  <WhiteBackgroundCheckbox checked={vendorList.indexOf(name) > -1} />
                </MenuItem>
              ))}
            </Select>
            </FormControl>   
          </Stack>
         <Stack
          direction="row"
         >
          <FormControl>
            <InputLabel inputProps={{
                classes: {
                  root: classes.inputRoot,
                  select: classes.selected,
                  focus: classes.focused
                }
              }} 
              sx={{
                top: "10px",
                left: "10px",
                color: "rgb(205,205,220)",
                ".Mui-focused": {
                  color:"red"
                  // top: "3px",
              },
            }} id="test-select-label">Область</InputLabel>
            <Select
              multiple
              value={regionList}
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
              onChange={handleChange}
              inputProps={{
                classes: {
                  root: classes.inputRoot,
                  select: classes.selected,
                  focus: classes.focused
                }
              }}
              renderValue={(selected) => selected.join(", ")}
            >
              {regions.map((name) => (
                <MenuItem
                sx={{
                  padding: "10px",
                  background: "rgba(255, 255, 255, 1)",
                  borderBottom: "1px solid rgba(122, 122, 149, 0.5) !important"
                }}
                  key={name}
                  value={name}
                >
                  <ListItemText sx={{
                      color: "rgba(122, 122, 149, 1)"
                    }} 
                    primary={name} />
                  <WhiteBackgroundCheckbox checked={regionList.indexOf(name) > -1} />
                </MenuItem>
              ))}
            </Select>
            </FormControl>
            <select className={`${style.test2} ${style.selectwidth2}`}>
            <option value="" disabled selected>Тип</option>
            {/* {stationTypeList()} */}
          </select>
          <FormControl>
            <InputLabel inputProps={{
                classes: {
                  root: classes.inputRoot,
                  select: classes.selected,
                  focus: classes.focused
                }
              }} 
              sx={{
                top: "10px",
                left: "10px",
                color: "rgb(205,205,220)",
                ".Mui-focused": {
                  color:"red"
                  // top: "3px",
              },
            }} id="test-select-label">Ток</InputLabel>
            <Select
              multiple
              value={stationTypesList}
              disableUnderline={true}
              sx={{
                width: "100px",
                height: "49px",
                borderRadius: "12px",
                backgroundColor: "#F4F4FD",
                color: "#7A7A95",
                padding: "16px",
                margin: "10px",
                boxShadow:
                  "inset -2px -2px 2px #FFFFFF, inset 2px 2px 2px rgba(192, 192, 219, 0.7) !important",
                }}
              onChange={handleChangeStationTypes}
              inputProps={{
                classes: {
                  root: classes.inputRoot,
                  select: classes.selected,
                  focus: classes.focused
                }
              }}
              renderValue={(selected) => selected.join(", ")}
            >
              {stationTypes.map((name) => (
                <MenuItem
                sx={{
                  padding: "10px",
                  background: "rgba(255, 255, 255, 1)",
                  borderBottom: "1px solid rgba(122, 122, 149, 0.5) !important"
                }}
                  key={name}
                  value={name}
                >
                  <ListItemText sx={{
                      color: "rgba(122, 122, 149, 1)"
                    }} 
                    primary={name} />
                  <WhiteBackgroundCheckbox checked={stationTypesList.indexOf(name) > -1} />
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          <TextField
            onChange={(event, value) => setKwFrom(event.target.value)}
            placeholder='от кВт'
            sx={{
              width: "100px",
              height: "49px",
              borderRadius: "12px",
              backgroundColor: "#F4F4FD",
              color: "#7A7A95",
              margin: "10px",
              boxShadow:
                "inset -2px -2px 2px #FFFFFF, inset 2px 2px 2px rgba(192, 192, 219, 0.7) !important",
            }}
            InputProps={{
              classes: {root: classes.inputRoot}
            }}
            InputLabelProps={{ classes: { root: classes.inputLabelRoot } }}
            FormHelperTextProps={{ classes: { root: classes.formHelperTextRoot } }}
          />
          <TextField
            onChange={(event, value) => setKwTo(event.target.value)}
            placeholder='до кВт'
            sx={{
              width: "100px",
              height: "49px",
              borderRadius: "12px",
              backgroundColor: "#F4F4FD",
              color: "#7A7A95",
              margin: "10px",
              boxShadow:
                "inset -2px -2px 2px #FFFFFF, inset 2px 2px 2px rgba(192, 192, 219, 0.7) !important",
            }}
            InputProps={{
              classes: {root: classes.inputRoot}
            }}
            InputLabelProps={{ classes: { root: classes.inputLabelRoot } }}
            FormHelperTextProps={{ classes: { root: classes.formHelperTextRoot } }}
          />
          <TextField
            onChange={(event, value) => setStationNum(event.target.value)}
            placeholder='Номер станции'
            sx={{
              width: "220px",
              height: "49px",
              borderRadius: "12px",
              backgroundColor: "#F4F4FD",
              color: "#7A7A95",
              margin: "10px",
              boxShadow:
                "inset -2px -2px 2px #FFFFFF, inset 2px 2px 2px rgba(192, 192, 219, 0.7) !important",
            }}
            InputProps={{
              classes: {root: classes.inputRoot}
            }}
            InputLabelProps={{ classes: { root: classes.inputLabelRoot } }}
            FormHelperTextProps={{ classes: { root: classes.formHelperTextRoot } }}
          />
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
          Всего: {locations.length} локаций ({count} станций)
        </Stack>
        <Stack
          direction='column'
          
        > 
        {locations.map(item => (
          <NavLink to={{pathname: '/maff/locationabout', id: item.id}}>
          <Stack
            onClick={() => handleLocationClick(item.id)}
            direction='column'
            alignItems='center'
            sx={{
              boxShadow: 'rgba(255, 255, 255, 0.7) -2px -2px 4px, rgb(208, 208, 230) 2px 2px 4px',
              borderRadius: '16px',
              padding: '16px',
              margin: '6px',
              color: '#7A7A95'
            }}

          >
            <Typography 
              className={style.tableData} 
              sx={{fontWeight: '600'}}
            >{item.name}
            </Typography>
            <div className={style.tableData}>{item.address}</div>
          </Stack>
          </NavLink>
        ))}
        </Stack>
        </Stack>
      
    );
  }

  const mapStateToProps = state => ({
    page: state.pageReducer.page,
    region: state.pageReducer.region,
  });

  export default withRouter(connect(mapStateToProps, null)(LocationListForm));