import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import style from './StationMain.module.css';
import { useParams } from 'react-router-dom'
import route from '../../back_route';

export const StationMain = () => {
  const { id } = useParams();
  const [test, setTest] = useState();
  const [sessions, setSessions] = useState();
  const [totalkwh, settotalkwh] = useState();
  const [totalcost, settotalcost] = useState();
  const [totalsessions, settotalsessions] = useState();
  const [failed, setFailed] = useState();

  useEffect(() => {
    fetch(`${route}/locationinfo/${id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTest(data);
      });
  }, [])

  useEffect(() => {
    if(test) {
      test.map((item) => {
        fetch(`${route}/sessioninfo/${item.friendlycode}`)
          .then(response => {
            return response.json();
          })
          .then(data => {
            setSessions(data);
          });
      })
    }
  }, [test])

  useEffect(() => {
    let totalkwh=0;
    let totalcost=0;
    let totalsessions=0;
    let failed = 0;
    if(sessions) {
      sessions.map(item => {
        totalkwh += Number(item.kwh);
        totalcost += Number(item.totalcost);
        totalsessions += 1;
        if (Number(item.kwh) < 0.5) {
          failed += 1
        }
      }) 
    }
      settotalkwh(totalkwh)
      settotalcost(totalcost)
      settotalsessions(totalsessions)
      setFailed(failed)
  }, [sessions])

  const view = () => {
    console.log(test)
  }
  const view2 = () => {
    console.log(sessions)
  }

  return (
    <div className={style.stationMainContainer}>
      <div className={style.addressRegion}>
        {test ? test[0].name : null}
      </div>
      <div className={style.mainRegion}>
        <div className={style.stationInfo}>
          <div className={style.stationInfoHeader} onClick={view}>
            Информация о локации
          </div>
          <div className={style.stationInfoMain}>
            <div >
              <b>Принадлежность:</b> {test ? test[0].company : null}
            </div>
            <div>
              <b>Область:</b> {test ? test[0].region : null}
            </div>
            <div>
              <b>Кол-во станций:</b> {test ? test.length  : null} 
            </div>
            <div></div>
            <div></div>
          </div>
          
        </div>
        <div className={style.stationInfoStat}>
          <div className={style.statPageCard}>
            <div className={style.statPageCardLeft}>
              <div onClick={view2}>Отпущено</div>
                <div>{sessions ? totalkwh : null} кВт*ч</div>
            </div>
            <div className={style.statPageCardRight}>
             <i class="las la-charging-station"></i>
            </div>
          </div>
          <div className={style.statPageCard}>
            <div className={style.statPageCardLeft}>
              <div>Заработано</div>
                <div>{sessions ? totalcost : null} руб.</div>
            </div>
            <div className={style.statPageCardRight}>
              <i class="las la-coins"></i>
            </div>
          </div>
          <div className={style.statPageCard}>
            <div className={style.statPageCardLeft}>
              <div>Кол-во сессий</div>
              <div>{sessions ? totalsessions : null}</div>
            </div>
            <div className={style.statPageCardRight}>
              <i class="las la-user-clock"></i>
            </div>
          </div>
          <div className={style.statPageCard}>
            <div className={style.statPageCardLeft}>
              <div>Успешные</div>
              <div>{sessions ? 100 - (failed / totalsessions * 100) : null}%</div>
            </div>
            <div className={style.statPageCardRight}>
              <i class="las la-check-double"></i>
            </div>
          </div>
        </div>  
      </div>  
    </div>
  )
}

const mapStateToProps = (state) => ({
  page: state.pageReducer.page,
  region: state.pageReducer.region,
});
    
 const mapDispatchToProps = {
};
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StationMain));