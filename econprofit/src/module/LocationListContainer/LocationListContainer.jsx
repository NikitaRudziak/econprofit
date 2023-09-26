import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Stack, Typography, Button,} from '@mui/material';
import { LocationIndicatorsForm } from '../LocationIndicatorsForm/LocationIndicatorsForm';
import { LocationListForm } from '../LocationListForm/LocationListForm';
import style from './LocationListContainer.module.css';
  
  export const LocationListContainer = () => {
    const [flag, setFlag] = React.useState(false);
    const [flag2, setFlag2] = React.useState(true);

    const handleClick = () => {
      setFlag(!flag);
      setFlag2(!flag2);
    };

    return (
      <Stack
        direction="column"
        width='100%'
        alignItems='center'
        bgcolor="#F4F4FD"
        paddingY='52px'
        sx={{
          flex: '1 0 auto'
        }}
      >
        <Typography
          sx = {{
            fontSize: '16px',
            fontWeight: '600',
            lineHeight: '19.5px',
            fontStyle: 'normal',
            color: '#7A7A95',
          }}
        >
          Список локаций
        </Typography>
        <Stack
          direction= "row"
          justifyContent='center'
          sx={{
            paddingTop: '50px',
            width: '100%'
          }}
        >
          <Button
            onClick={handleClick}
            sx={flag ? {
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
          >Локации</Button>
          <Button
            onClick={handleClick}
            disableRipple
            sx={flag2 ? {
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
          >Параметры</Button>
        </Stack>
        <Stack>
          {flag ? <LocationIndicatorsForm/> : <LocationListForm/>}
        </Stack>
        {/* <Stack
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
            <InputLabel inputProps={{
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
                    padding: "30px"
                  }}
                  key={name}
                  value={name}
                >
                  <ListItemText primary={name} />
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
              }} sx={{
              top: "6px",
              left: "10px",
              "&:focus": {
                top: "3px",
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
                    padding: "30px"
                  }}
                  key={name}
                  value={name}
                >
                  <ListItemText primary={name} />
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
              }} sx={{
              top: "6px",
              left: "10px",
              "&:focus": {
                top: "3px",
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
                    padding: "30px"
                  }}
                  key={name}
                  value={name}
                >
                  <ListItemText primary={name} />
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
              }} sx={{
              top: "6px",
              left: "10px",
              "&:focus": {
                top: "3px",
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
                    padding: "30px"
                  }}
                  key={name}
                  value={name}
                >
                  <ListItemText primary={name} />
                  <WhiteBackgroundCheckbox checked={regionList.indexOf(name) > -1} />
                </MenuItem>
              ))}
            </Select>
            </FormControl>
            <select className={`${style.test2} ${style.selectwidth2}`}>
            <option value="" disabled selected>Тип</option>
            {stationTypeList()}
          </select>
          <FormControl>
            <InputLabel inputProps={{
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
                    padding: "30px"
                  }}
                  key={name}
                  value={name}
                >
                  <ListItemText primary={name} />
                  <WhiteBackgroundCheckbox checked={stationTypesList.indexOf(name) > -1} />
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          <TextField
            onChange={(event, value) => setKwFrom(event.target.value)}
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
            <Button onClick={outputFunc}>Submit</Button>
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
          <Link to={{pathname: '/maff/locationabout', id: item.id}}>
          <Stack
            onClick={() => handleLocationClick(item.id)}
            direction='column'
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
          </Link>
        ))}
        </Stack> */}
      </Stack> 
    );
  }

  const mapStateToProps = state => ({
    page: state.pageReducer.page,
    region: state.pageReducer.region,
  });

  export default withRouter(connect(mapStateToProps, null)(LocationListContainer));