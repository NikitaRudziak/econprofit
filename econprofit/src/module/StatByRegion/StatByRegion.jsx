import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../Components/Navigation/Navigation';
import { ByRegionContainer } from '../../Components/ByRegionContainer/ByRegionContainer';
import style from './StatByRegion.module.css';

export const StatByRegion = (props) => {
  useEffect(() => {
    console.log(props.location.type)
  }, [])
    
  return (
    <div className={style.StatByRegionContainer}>
      <Navigation />
      <ByRegionContainer region={props.location.type} naming={props.location.name}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    page1: state.pageReducer.page,
  }
}

export default withRouter(connect(mapStateToProps, null)(StatByRegion));
