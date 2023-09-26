import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import route from '../../back_route';
import { Link } from "react-router-dom";
import { valueToFixed } from '../../CommonFuncs/editValues';
import {Stack, TextField, Typography, Button,
  InputLabel, MenuItem, FormControl, Select} from '@mui/material';

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
  import { NavLink } from "react-router-dom";

  // import '../fonts//Montserrat-Regualar.ttf';
  // import style from './StartPage.module.css';

  const pages = ['Показатели', 'Карта станций', 'Список локаций', 'Статистика'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  
  export const Header = (props) => {
    // const [flag, setFlag] = React.useState(false);
    
    return (
        <Stack
        direction="column"
        width='100vw'
      >
        
        <Stack 
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        bgcolor="#F4F4FD"
        height="74px"
        paddingX={4}
        boxShadow='0px 1px 2px rgba(0, 0, 0, 0.1)'
        zIndex='10'
      >
        <Stack flexDirection="row">
          <SvgIcon
               sx={{
                 width: '44px'
               }}
             >
               <path d="M10.1635 20L5.06566 12.2028L4.50015 13.0685L0 20H10.1635ZM26.878 12.2028L21.7843 20H32.0027L26.9843 12.3622L26.878 12.2028ZM26.722 4.44341L29.6442 0H23.6777C22.9344 0 22.2427 0.369636 21.8409 0.981374L15.987 9.8894L10.1337 0.981374C9.73195 0.370357 9.04022 0 8.29698 0H2.33043L15.4831 19.9992H16.4885L26.7202 4.44064L26.722 4.44341Z" fill="#76D275">
               </path>
             </SvgIcon>
             <Typography
              ml='20px'
              color='#7A7A95'
             >MAFF</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
        >
          <NavLink
            to="/maff/indicators"
            activeStyle={{color:'rgba(118, 210, 117, 1)'}}
            style={{
              fontSize: '14px',
              fontWeight: '500',
              lineHeight: '15px',
              fontStyle: 'normal',
              color: '#7A7A95',
              paddingLeft: '8px',
            }}
          >
            <Stack 
              direction="row"
              alignItems="center"
            >
            {/* <SvgIcon
               sx={{
                width: '18px'
               }}
             > */}
               {/* <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 20 18" data-testid="WalletIcon">
                <path d="M18.4466 8.49796V6.22157C18.445 5.79222 18.3182 5.37391 18.0838 5.02386C17.8494 4.67382 17.5188 4.40913 17.1371 4.26602V3.09657C17.1371 2.45195 16.8957 1.83373 16.4659 1.37791C16.0361 0.922091 15.4532 0.666016 14.8454 0.666016H3.05973C2.45195 0.666016 1.86905 0.922091 1.43928 1.37791C1.00951 1.83373 0.768066 2.45195 0.768066 3.09657V13.8605C0.769106 14.781 1.11436 15.6635 1.72809 16.3145C2.34182 16.9654 3.17393 17.3316 4.04188 17.3327H15.1728C16.0408 17.3316 16.8729 16.9654 17.4866 16.3145C18.1003 15.6635 18.4456 14.781 18.4466 13.8605V12.973C18.6451 12.852 18.81 12.6779 18.9249 12.468C19.0399 12.2581 19.1007 12.0198 19.1014 11.7771V9.69379C19.1007 9.45108 19.0399 9.21282 18.9249 9.00293C18.81 8.79304 18.6451 8.61889 18.4466 8.49796ZM17.7919 9.69379V11.7771H14.1907C13.9302 11.7771 13.6804 11.6674 13.4962 11.472C13.312 11.2767 13.2085 11.0117 13.2085 10.7355C13.2085 10.4592 13.312 10.1942 13.4962 9.99889C13.6804 9.80354 13.9302 9.69379 14.1907 9.69379H17.7919ZM3.05973 2.0549H14.8454C15.1059 2.0549 15.3557 2.16465 15.5399 2.36C15.7241 2.55535 15.8276 2.8203 15.8276 3.09657V4.13824H3.05973C2.79925 4.13824 2.54944 4.02849 2.36525 3.83314C2.18107 3.63779 2.07759 3.37284 2.07759 3.09657C2.07759 2.8203 2.18107 2.55535 2.36525 2.36C2.54944 2.16465 2.79925 2.0549 3.05973 2.0549V2.0549ZM15.1728 15.9438H4.04188C3.52091 15.9438 3.02129 15.7243 2.65292 15.3336C2.28454 14.9429 2.07759 14.413 2.07759 13.8605V5.28338C2.38357 5.44178 2.71925 5.52509 3.05973 5.52713H16.4824C16.656 5.52713 16.8225 5.60029 16.9453 5.73053C17.0681 5.86076 17.1371 6.03739 17.1371 6.22157V8.3049H14.1907C13.5829 8.3049 13 8.56098 12.5702 9.0168C12.1405 9.47262 11.899 10.0908 11.899 10.7355C11.899 11.3801 12.1405 11.9983 12.5702 12.4541C13 12.9099 13.5829 13.166 14.1907 13.166H17.1371V13.8605C17.1371 14.413 16.9302 14.9429 16.5618 15.3336C16.1934 15.7243 15.6938 15.9438 15.1728 15.9438Z" 
                	fill= "#C0C0DB"></path>
               </svg> */}
              {/* </SvgIcon> */}
              <Typography>Показатели</Typography>
            </Stack>
          </NavLink>
          <Stack
            direction="row"
            alignItems="center"
          >
            <NavLink
              to="/maffmap"
              activeStyle={{color:'rgba(118, 210, 117, 1)'}}
              style={{
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '15px',
                fontStyle: 'normal',
                color: '#7A7A95',
                paddingLeft: '8px',
              }}
            >
              <Stack 
                direction="row"
                alignItems="center"
              >
            {/* <SvgIcon
               sx={{
                width: '18px'
               }}
             >
               <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" color="transparent" aria-hidden="true" viewBox="0 0 17 20" data-testid="PointMapIcon"><path d="M15.669 8.36364C15.669 14.0909 8.46904 19 8.46904 19C8.46904 19 1.26904 14.0909 1.26904 8.36364C1.26904 6.41068 2.02761 4.53771 3.37787 3.15676C4.72814 1.77581 6.55948 1 8.46904 1C10.3786 1 12.2099 1.77581 13.5602 3.15676C14.9105 4.53771 15.669 6.41068 15.669 8.36364Z" stroke="rgb(192, 192, 219)" stroke-width="1.36054" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.46982 10.8173C9.79531 10.8173 10.8698 9.71836 10.8698 8.36275C10.8698 7.00714 9.79531 5.9082 8.46982 5.9082C7.14434 5.9082 6.06982 7.00714 6.06982 8.36275C6.06982 9.71836 7.14434 10.8173 8.46982 10.8173Z" stroke="rgb(192, 192, 219)" stroke-width="1.36054" stroke-linecap="round" stroke-linejoin="round"></path></svg>
             </SvgIcon> */}
                <Typography>Карта станций</Typography>
              </Stack>
            </NavLink>
          </Stack>
          
          <Stack
            direction="row"
            alignItems="center"
          >
            <NavLink
              to="/maff/main"
              activeStyle={{color:'rgba(118, 210, 117, 1)'}}
              style={{
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '15px',
                fontStyle: 'normal',
                color: '#7A7A95',
                paddingLeft: '8px',
              }}
            >
              <Stack 
                direction="row"
                alignItems="center"
              >
            {/* <SvgIcon
               sx={{
                width: '18px'
               }}
             >
               <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" color="transparent" aria-hidden="true" viewBox="0 0 21 20" data-testid="ChargeSessionIcon"><circle cx="10.2012" cy="10" r="9.4" stroke="#C0C0DB" stroke-width="1.2"></circle><path d="M10.9512 3L7.20117 10.4286H9.45117V16L13.2012 8.57143H10.9512V3Z" fill="#C0C0DB" stroke="#F4F4FD" stroke-width="0.3"></path></svg>
             </SvgIcon> */}
                <Typography>Список локаций</Typography>
              </Stack>
            </NavLink>    
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
          >
            <NavLink
              to="/maff/statistic"
              activeStyle={{color:'rgba(118, 210, 117, 1)'}}
              style={{
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '15px',
                fontStyle: 'normal',
                color: '#7A7A95',
                paddingLeft: '8px',
              }}
            >
              <Stack 
                direction="row"
                alignItems="center"
              >
            {/* <SvgIcon
               sx={{
                 width: '18px'
               }}
             >
               <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 19 18" data-testid="MarketingGreenIcon"><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.22734 4.40078V3.50078M8.22734 8.45078V7.55078M8.22734 12.5008V11.6008M3.90734 0.800781H16.1473C17.1554 0.800781 17.6595 0.800781 18.0445 0.996972C18.3832 1.16954 18.6586 1.4449 18.8311 1.7836C19.0273 2.16864 19.0273 2.67269 19.0273 3.68078V4.85078C17.2876 4.85078 15.8773 6.26108 15.8773 8.00078C15.8773 9.74048 17.2876 11.1508 19.0273 11.1508V12.3208C19.0273 13.3289 19.0273 13.833 18.8311 14.218C18.6586 14.5567 18.3832 14.8321 18.0445 15.0046C17.6595 15.2008 17.1554 15.2008 16.1473 15.2008H3.90734C2.89925 15.2008 2.3952 15.2008 2.01016 15.0046C1.67146 14.8321 1.3961 14.5567 1.22353 14.218C1.02734 13.833 1.02734 13.3289 1.02734 12.3208V11.1508C2.76704 11.1508 4.17734 9.74048 4.17734 8.00078C4.17734 6.26108 2.76704 4.85078 1.02734 4.85078V3.68078C1.02734 2.67269 1.02734 2.16864 1.22353 1.7836C1.3961 1.4449 1.67146 1.16954 2.01016 0.996972C2.3952 0.800781 2.89925 0.800781 3.90734 0.800781Z" stroke="rgb(192, 192, 219)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></svg></svg>
             </SvgIcon> */}
                <Typography>Статистика</Typography>
              </Stack>
            </NavLink>    
          </Stack>
        </Stack>
        <Stack>
          <Button
            sx = {{
              background: 'linear-gradient(271.12deg, #6FBE6E 0%, #8BEB8A 100%)',
              boxShadow: '-6px -6px 16px rgba(255, 255, 255, 0.7), 6px 6px 20px rgba(192, 192, 219, 0.7)',
              padding: '14px 16px 16px',
              borderRadius: '100px',
              height: '36px',
              color: 'white',
              fontSize: '12px',
              color: 'white'
            }}
          >
            Скачать бизнес-план
          </Button>
        </Stack>
        </Stack>
        {/* <AboutStationContainer/> */}
      </Stack>
    );
  }

  const mapStateToProps = state => ({
    page: state.pageReducer.page,
    region: state.pageReducer.region,
  });

  export default withRouter(connect(mapStateToProps, null)(Header));