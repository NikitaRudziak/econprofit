import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import logo from './malanka_logo_small.png';

import style from './Navigation.module.css';

export const Navigation = ({view}) => {
  const [show, setShow] = useState(false);

  const changeVisibility = () => {
    setShow(!show);
  }

  return (
    <div className={style.navigationContainer}>
      <Link to='/maff/map'>
        <div className={style.logoSection}>
          <img src={logo} alt=""/>
        </div>
      </Link>
      <div className={style.col}>
        <div className={style.menuSection}>
          <div className={style.menuPoint} onClick={changeVisibility}>
            <span className="material-icons darkground">insert_chart_outlined</span>
            <div className={style.menuName}>Статистика</div>
          </div>
          <div className={style.littleMenu}>
            <Link to='/maff/main'>
              <div className={style.menuName}>Республика Беларусь</div>
            </Link>
            <Link to={{pathname: '/maff/regioninfo', type: 5, name: 'г. Минск', reg: 'Минскавтозаправка'}}>
              <div className={style.menuName}>г. Минск</div>
            </Link>
            <Link to={{pathname: '/maff/regioninfo', type: 6, name: 'Минская область', reg: 'Минскоблнефтепродукт'}}>
              <div className={style.menuName}>Минская область</div>
            </Link>
            <Link to={{pathname: '/maff/regioninfo', type: 1, name: 'Брестская область', reg: 'Брестоблнефтепродукт'}}>
              <div className={style.menuName}>Брестская область</div>
            </Link>
            <Link to={{pathname: '/maff/regioninfo', type: 2, name: 'Витебская область', reg: 'Витебскоблнефтепродукт '}}>
              <div className={style.menuName}>Витебская область</div>
            </Link>
            <Link to={{pathname: '/maff/regioninfo', type: 3, name: 'Гомельская область', reg: 'Гомельоблнефтепродукт'}}>
              <div className={style.menuName}>Гомельская область</div>
            </Link>
            <Link to={{pathname: '/maff/regioninfo', type: 4, name: 'Гродненская область', reg: 'Гроднооблнефтепродукт'}}>
              <div className={style.menuName}>Гродненская область</div>
            </Link>
            <Link to={{pathname: '/maff/regioninfo', type: 7, name: 'Могилевская область', reg: 'Могилевоблнефтепродукт'}}>
              <div className={style.menuName}>Могилевская область</div>
            </Link>
          </div>
          <Link to='/maff/map'>
            <div className={style.menuPoint}>
              <span className="material-icons darkground">map</span>
              <div className={style.menuName}>Карта</div>
            </div>
          </Link>
        </div>
        { view == 'true' ? <div className={style.legend}>
          <div className={style.leg_title}>Соответствие плану на текущий момент</div>
            <div className={style.leg_item}>
              <div className={style.legGreen}>
              </div>
              <div>>=100%</div>
            </div>
            <div className={style.leg_item}>
              <div className={style.leg}></div>
              <div>>=75% &lt;100%</div>
            </div>
            <div className={style.leg_item}>
              <div className={style.legYellow}></div>
              <div>>=50% &lt;75%</div>
            </div>
            <div className={style.leg_item}>
              <div className={style.legOrange}></div>
              <div>>=25% &lt;50%</div>
            </div>
            <div className={style.leg_item}>
              <div className={style.legRed}></div>
              <div>0% &lt;25%</div>
          </div>
        </div> : null}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  page: state.pageReducer.page,
  region: state.pageReducer.region,
});

export default withRouter(connect(mapStateToProps, null)(Navigation));