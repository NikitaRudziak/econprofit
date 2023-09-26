import * as React from 'react';
import { Stack } from '@mui/material';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IndicatorContainer from '../IndicatorsContainer/IndicatorContainer';
import GMap from '../../Components/GMap/GMap';
import NewMap from '../NewMap/NewMap';

export const MapPage = () => (
  <Stack maxWidth='100vw' height='100vh'>
    <Header/>
    <NewMap/>
  </Stack>
);

const mapStateToProps = state => ({
  page: state.pageReducer.page,
  region: state.pageReducer.region,
});

export default withRouter(connect(mapStateToProps, null)(MapPage));