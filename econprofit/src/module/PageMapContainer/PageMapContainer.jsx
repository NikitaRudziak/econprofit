import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../Components/Navigation/Navigation';
import { GMap } from '../../Components/GMap/GMap';

import style from './PageMapContainer.module.css';

export const PageMapContainer = () => {

  return (
    <div className={style.pageMapContainer}>
      <Navigation />
      <GMap />
    </div>
  )
}

const mapStateToProps = state => ({
  page: state.pageReducer.page,
  region: state.pageReducer.region,
});
  
const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageMapContainer));