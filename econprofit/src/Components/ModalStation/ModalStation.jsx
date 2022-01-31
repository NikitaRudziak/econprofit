import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import style from './ModalStation.module.css';

export const ModalStation = () => (
  <div className={style.modalContainer}>
    <div className={style.modalHeader}>
      <i className="las la-times"></i>
    </div>
  </div>
)

const mapStateToProps = state => ({
  page: state.pageReducer.page,
  region: state.pageReducer.region,
});
  
export default withRouter(connect(mapStateToProps, null)(ModalStation));