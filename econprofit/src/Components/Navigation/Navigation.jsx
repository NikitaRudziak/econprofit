import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import logo from './malanka_logo_small.png'

import style from './Navigation.module.css';

export const Navigation = () => {
  const [show, setShow] = useState(false);

  const changeVisibility = () => {
    setShow(!show)
  }

  return (
    <div className={style.navigationContainer}>
      <Link to='/maff/map'>
        <div className={style.logoSection}>
          <img src={logo} alt=""/>
        </div>
      </Link>
      <div className={style.menuSection}>
        <div className={style.menuPoint} onClick={changeVisibility}>
          <span className="material-icons darkground">insert_chart_outlined</span>
          <div className={style.menuName}>Статистика</div>
        </div>
        <div className={style.littleMenu}>
          <Link to='/maff/main'>
            <div className={style.menuName}>Республика Беларусь</div>
          </Link>
          <Link to={{pathname: '/maff/regioninfo', type: 5, name: 'г. Минск'}}>
            <div className={style.menuName}>г. Минск</div>
          </Link>
          <Link to={{pathname: '/maff/regioninfo', type: 6, name: 'Минская область'}}>
            <div className={style.menuName}>Минская область</div>
          </Link>
          <Link to={{pathname: '/maff/regioninfo', type: 1, name: 'Брестская область'}}>
            <div className={style.menuName}>Брестская область</div>
          </Link>
          <Link to={{pathname: '/maff/regioninfo', type: 2, name: 'Витебская область'}}>
            <div className={style.menuName}>Витебская область</div>
          </Link>
          <Link to={{pathname: '/maff/regioninfo', type: 3, name: 'Гомельская область'}}>
            <div className={style.menuName}>Гомельская область</div>
          </Link>
          <Link to={{pathname: '/maff/regioninfo', type: 4, name: 'Гродненская область'}}>
            <div className={style.menuName}>Гродненская область</div>
          </Link>
          <Link to={{pathname: '/maff/regioninfo', type: 7, name: 'Могилевская область'}}>
            <div className={style.menuName}>Могилевская область</div>
          </Link>
        </div>
        <Link to='/maff/map'>
          <div className={style.menuPoint}>
            <span className="material-icons darkground">map</span>
            <div className={style.menuName}>Карта</div>
          </div>
        </Link>
        {/* <Link to='/maff/db'>
          <div className={style.menuPoint}>
            <i className="las la-database" />
            <div className={style.menuName}>Работа с БД</div>
          </div>
        </Link> */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));