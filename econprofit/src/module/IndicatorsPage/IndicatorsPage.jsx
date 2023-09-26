import * as React from 'react';
import { Stack } from '@mui/material';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IndicatorContainer from '../IndicatorsContainer/IndicatorContainer';

export const IndicatorsPage = () => (
  <Stack>
    <Header/>
    <IndicatorContainer/>
  </Stack>
);

const mapStateToProps = state => ({
  page: state.pageReducer.page,
  region: state.pageReducer.region,
});

export default withRouter(connect(mapStateToProps, null)(IndicatorsPage));