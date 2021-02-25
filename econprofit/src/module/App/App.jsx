import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../Components/Navigation/Navigation';
import { GMap } from '../../Components/GMap/GMap';
import logo from './logo.svg';
import style from './App.module.css';

export const App = () => {
  return (
    <div className={style.appContainer}>
      <Navigation />
      <GMap />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    page1: state.pageReducer.page,
  }
}

export default withRouter(connect(mapStateToProps, null)(App));
