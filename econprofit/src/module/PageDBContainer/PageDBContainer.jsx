import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../Components/Navigation/Navigation';
import { Switcher } from '../../Components/Switcher/Switcher';

import style from './PageDBContainer.module.css';

export const PageDBContainer = () => (
  <div className={style.pageDBContainer}>
    <Navigation />
    <div className={style.rightContainer}>
      <Switcher />
    </div>
  </div>
)

const mapStateToProps = state => ({
  page: state.pageReducer.page,
  region: state.pageReducer.region,
});

export default withRouter(connect(mapStateToProps, null)(PageDBContainer));
