import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    page1: state.pageReducer.page,
  }
}

export default withRouter(connect(mapStateToProps, null)(App));
