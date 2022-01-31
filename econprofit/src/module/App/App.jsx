import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../Components/Navigation/Navigation';
import { StatPageContainer } from '../../Components/StatPageContainer/StatPageContainer';
import style from './App.module.css';

export const App = () => {
  return (
    <div className={style.appContainer}>
      <Navigation />
      <StatPageContainer />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    page1: state.pageReducer.page,
  }
}

export default withRouter(connect(mapStateToProps, null)(App));
