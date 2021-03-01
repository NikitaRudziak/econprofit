import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import logo from './malanka_logo_small.png'

import style from './Navigation.module.css';

export const Navigation = () => {

  return (
    <div className={style.navigationContainer}>
      <div className={style.logoSection}>
        <img src={logo} alt=""/>
      </div>
      <div className={style.menuSection}>
        <Link to='/main'>
          <div className={style.menuPoint}>
            <i class="las la-chart-bar" />
            <div className={style.menuName}>Статистика</div>
          </div>
        </Link>
        <Link to='/map'>
          <div className={style.menuPoint}>
            <i class="las la-map-marked-alt" />    
            <div className={style.menuName}>Карта</div>
          </div>
        </Link>
        <Link to='/db'>
          <div className={style.menuPoint}>
            <i class="las la-database" />
            <div className={style.menuName}>Работа с БД</div>
          </div>
        </Link>
      </div>
      {/* <div></div> */}
    </div>
  )

}

const mapStateToProps = state => ({
  page: state.pageReducer.page,
  region: state.pageReducer.region,
});
  
const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));