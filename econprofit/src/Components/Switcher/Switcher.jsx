import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import route from '../../back_route';

import style from './Switcher.module.css';

export const Switcher = ({}) => {
  const[activeCell, setActiveCell] = useState(1);


  return (
    <div className={style.switcherContainer}>
      <div className={style.switcherHeader}>
        {activeCell ?
          <div className={style.switcherPoint}>
            <i className="las la-map-marked-alt" />
            Локации
          </div>
          :null
        }
        <div className={style.switcherPoint}>
          <i className="las la-charging-station" />
          Станции
        </div>
        <div className={style.switcherPoint}>
          <i className="lab la-fort-awesome" />
          Крепость
        </div>
      </div>
      <div className={style.switcherMain}>

        {/* dd */}
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
    
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Switcher));