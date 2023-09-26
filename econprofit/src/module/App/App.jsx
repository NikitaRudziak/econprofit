import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../Components/Navigation/Navigation';
import { StatPageContainer } from '../../Components/StatPageContainer/StatPageContainer';
import { StartPage } from '../StartPage/StartPage';
import style from './App.module.css';
import LocationListContainer from '../LocationListContainer/LocationListContainer';
// import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "typeface-montserrat"

// const theme = createTheme({
//   components: {
//     MuiTypography: {
//       styleOverrides: {
//         root: {
//           fontFamily: 'montserrat'
//           // fontSize: '20px'
//           // fontFamily: ''
//         },
//       },
//     },
//   },
// });

// const theme = createTheme({
//   typography: {
//     fontFamily: [
//       'montserrat',
//       'serif',
//     ].join(','),
// },});

export const App = () => (
  // <ThemeProvider theme={theme}>
    <div className={style.appContainer}>
      {/* <LocationListContainer/> */}
      <StartPage/>
      {/* <Navigation />
      <StatPageContainer /> */}
    </div>
  // </ThemeProvider>
)

const mapStateToProps = state => {
  return {
    page1: state.pageReducer.page,
  }
}

export default withRouter(connect(mapStateToProps, null)(App));
