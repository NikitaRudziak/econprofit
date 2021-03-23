import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../Components/Navigation/Navigation';
import { StationMain } from '../../Components/StationMain/StationMain';
import style from './StationContainer.module.css';

export const StationContainer = () => {
  return (
    <div className={style.stationContainer}>
      <Navigation />
      {/* <div className={style.stat}> */}
        <StationMain />
      {/* </div> */}
      
    </div>
  )
}

const mapStateToProps = state => ({
  page: state.pageReducer.page,
  region: state.pageReducer.region,
});
    
 const mapDispatchToProps = {
};
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StationContainer));