import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Stack, Typography, Popover } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import { setCoordinates, setZoom } from '../../redux/actions';
import route from '../../back_route';
import { makeStyles } from "@mui/styles";
import { valueToFixed } from '../../CommonFuncs/editValues';

const useStyles = makeStyles({
  labelRoot: {
    "&:hover": {
      borderRadius: 4,
      backgroundColor: "gray",
    },
  }
})

const MarkOnMap = ({ obj }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const getColor = () => {
    let value = valueToFixed(Number(obj.sum) / Number(50000) * 100);
    let color = '';
    // console.log(valu)
    if (value < 34) {
      color = 'rgba(234, 79, 79, 1)'
    } else if (value > 66) {
      color = 'rgba(118, 210, 117, 1)'
    } else {
      color = 'rgba(122, 122, 149, 1)'
    }
    return color
  }

  const open = Boolean(anchorEl);

  return (
    <Stack
      width="57px"
      paddingX="9px"
      paddingY="8px"
      height="17px"
      bgcolor="#F4F4FD"
      borderRadius="12px"
      boxShadow="rgba(255, 255, 255, 0.7) -2px -2px 6px, rgba(192, 192, 219, 0.3) 2px 2px 6px, rgb(255, 255, 255) -2px -2px 2px inset, rgba(192, 192, 219, 0.7) 2px 2px 2px inset"
      alignItems="center"
      textAlign="center"
    >
      {/* <Stack
        onClick={() => handleLocationClick(obj.id)}
      > */}

    <Link to={{pathname: '/maff/locationabout', id: obj.id}}>
      <Typography 
      // className={classes.labelRoot}
        sx={{
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: "14px",
          lineHeight: "17px",
          color: getColor()
        }}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        
      >
        {valueToFixed(Number(obj.sum) / 50000 * 100)}
      </Typography>
      </Link>
      <Popover
        // borderRadius="12px"
        // id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
          borderRadius: "12px"
          // borderRadius: "50px"
          // bgcolor: '#F4F4FD',
          // boxShadow: 'rgba(255, 255, 255, 0.7) -2px -2px 6px, rgba(192, 192, 219, 0.3) 2px 2px 6px, rgb(255, 255, 255) -2px -2px 2px inset, rgba(192, 192, 219, 0.7) 2px 2px 2px inset'
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Stack
          bgcolor="#F4F4FD"
          // borderRadius= "12px"
          boxShadow="rgba(255, 255, 255, 0.7) -2px -2px 6px, rgba(192, 192, 219, 0.3) 2px 2px 6px, rgb(255, 255, 255) -2px -2px 2px inset, rgba(192, 192, 219, 0.7) 2px 2px 2px inset"
          flexDirection="column"
        >
          <Typography sx={{ p: 1 }}>{obj.name}</Typography>
          <Stack
            flexDirection="row"
          >
            <Stack>
              {/* <Typography sx={{ p: 1 }}>АЗС</Typography> */}
              <Typography sx={{ p: 1 }}>Выручка</Typography>
              <Typography sx={{ p: 1 }}>САРЕХ</Typography>
              <Typography sx={{ p: 1 }}>Сессии</Typography>
              <Typography sx={{ p: 1 }}>Потребление</Typography>
            </Stack>

            <Stack>
              {/* <Typography sx={{ p: 1 }}>{obj.name}</Typography> */}
              <Typography sx={{ p: 1 }}>{valueToFixed(obj.sum)}</Typography>
              <Typography sx={{ p: 1 }}>{valueToFixed(obj.kapzatr)}</Typography>
              <Typography sx={{ p: 1 }}>{valueToFixed(obj.count)}</Typography>
              <Typography sx={{ p: 1 }}>{valueToFixed(obj.power)}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Popover>
    </Stack>
  )
}

export const NewMap = ({location, latitude, longitude, zoom, setCenter, setZoom}) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // fetch(`../${route}/locationabout/${Number(props.location.id)}`)
    fetch(`${route}/locationmark`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setMarkers(data)
      });
    console.log(location.lt)
  }, [])
    const defaultProps = {
        center: {
          lat: location.lt ? location.lt : latitude,//location.lt,
          lng: location.lg ? location.lg : longitude//location.lg
        },
        zoom: location.lt ? 18 : 11
      };
    return (
    <Stack sx={{width: '100%', height:'100vh'}}>
        <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBoUSex8GgH0dsuHOCfz7yX4CvRCWzCKck" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        
    // center={center}
    // zoom={zoom2}
    // onChange={(e) => setChangeMarkers(e.zoom)}
  >
    {markers.map(item => (
      <MarkOnMap
        lat={item.latitude}
        lng={item.longitude}
        obj={item}
          // valueToFixed(Number(item.sum) / Number(item.kapzatr) * 100)
      />
    ))}
    
    {/* {getMarkers(test)} */}
  </GoogleMapReact>
    </Stack>
    )
};

const mapStateToProps = state => {
  return {
    latitude: state.pageReducer.lat,
    longitude: state.pageReducer.lng,
    zoom: state.pageReducer.zoom,
    // center: state.pageReducer.center
  }
}
  
const mapDispatchToProps = {
  setCenter: setCoordinates,
  setZoom: setZoom
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewMap));