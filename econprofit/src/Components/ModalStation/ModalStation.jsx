import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import route from '../../back_route';

import style from './ModalStation.module.css';

export const ModalStation = ({}) => {
  return (
    <div className={style.modalContainer}>
      <div className={style.modalHeader}>
        <i className="las la-times"></i>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  page: state.pageReducer.page,
  region: state.pageReducer.region,
});
    
const mapDispatchToProps = {
  };
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalStation));