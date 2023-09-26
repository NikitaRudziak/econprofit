import { useState,useEffect } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IndicatorContainer from '../IndicatorsContainer/IndicatorContainer';
import NewButton from '../../Components/NewButton/NewButton';
import { Chart } from "react-google-charts";
import route from '../../back_route';
import style from './StatisticPage.module.css';
// import { arraySum } from '../../CommonFuncs/editValues';

export const StatisticPage = () => {
  const regions = [
    { name: 'Республика',
      company: 'Республика'
    },
    { name: 'Минск',
      company: 'Минскавтозаправка'
    },
    { name: 'Минская обл.',
      company: 'Минскоблнефтепродукт'
    },
    { name: 'Брестская обл.',
      company: 'Брестоблнефтепродукт'
    },
    { name: 'Витебская обл.',
      company: 'Витебскоблнефтепродукт'
    },
    { name: 'Гомельская обл.',
      company: 'Гомельоблнефтепродукт'
    },
    { name: 'Гродненская обл.',
      company: 'Гроднооблнефтепродукт'
    },
    { name: 'Могилевская обл.',
      company: 'Могилевоблнефтепродукт'
    }
  ]
  const [isActive, setIsActive] = useState('Республика')
  const [data, setData] = useState();
  const [userCount, setUserCount] = useState();
  const [stationCount, setStationCount] = useState(0)

  useEffect(() => {
    fetch(`${route}/getIndicatorsByYear`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setData(data)
    })
    .catch(function (error) {
      console.log(error);
    });
    fetch(`${route}/getUsersCountByYear`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setUserCount(data)
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }, [])

  const handleClick = (item) => {
    let company;
    console.log(item.company)
    // if (item == 'Минск') {
    //   company = 'Минскавтозаправка'
    // } else if  (item == 'Минская обл.') {
    //   company = 'Минскоблнефтепродукт'
    // } else if  (item == 'Брестская обл.') {
    //   company = 'Брестоблнефтепродукт'
    // } else if  (item == 'Витебская обл.') {
    //   company = 'Витебскоблнефтепродукт'
    // } else if  (item == 'Гродненская обл.') {
    //   company = 'Гроднооблнефтепродукт'
    // } else if  (item == 'Могилевская обл.') {
    //   company = 'Могилевоблнефтепродукт'
    // }
    if (item.name == 'Республика') {
      fetch(`${route}/getIndicatorsByYear`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setData(data)
        })
        .catch(function (error) {
          console.log(error);
        });
      fetch(`${route}/getStationCountByYear`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setStationCount(data)
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      fetch(`${route}/getIndicatorsByYear2/${item.company}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setData(data)
        })
        .catch(function (error) {
          console.log(error);
        });
        fetch(`${route}/getStationCountByYearId/${item.company}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setStationCount(data)
    })
    .catch(function (error) {
      console.log(error);
    });
    }
    setIsActive(item.name)
  }

  const avgSum = (array) => {
    let res = array.reduce(function(sum, elem) {
      return sum + Number(elem.count);
    }, 0);
    console.log(res)
    return res
  }

  const percentCount = (array) => {
    let res = array.reduce(function(sum, elem) {
      return sum + Number(elem.count);
    }, 0);
    let percent = (res * 100 / (res - Number(stationCount[stationCount.length-1].count)) - 100).toFixed(2);
    if (stationCount[stationCount.length-1].date != '01.01.2023') {
      percent = 0 
    }
    console.log(percent);
    return percent;
  }

  return(
  <Stack>
    <Header/>
    <Stack
      flexDirection='column'
      mx='50px'
    >
      <Stack 
        flexDirection='row'
        justifyContent='center'
        my='52px'
      >
        {regions.map(item => (
          <NewButton
            label={item}
            onClick={handleClick}
            isActive={isActive}
          />
        ))}
      </Stack>
      <Stack
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <Stack
          width='500px'
          px='50px'
        >
          <Chart
            chartType="Bar"
            width="500px"
            height="350px"
            legend={{position: 'none'}}
            data={[
              ["Год", "Выручка"],
              [data ? data[0].date : null, data ? Number(data[0].valuevat) : null],
              [data ? data[1].date : null, data ? Number(data[1].valuevat) : null],
              [data ? data[2].date : null, data ? Number(data[2].valuevat) : null],
            ]}
          />
          <Chart
            chartType="Bar"
            width="500px"
            height="350px"
            legend={{position: 'none'}}
            data={[
              ["Год", "Итого затрат"],
              ["2021", 1],
              ["2022", 1],
              ["2023", 1],
            ]}
          />
        </Stack>
        <Stack
          paddingX="35px"
          paddingY="10px"
          width='300px'
          // mx='25px'
          sx={{
            borderRadius: "12px",
            color: "#7A7A95",
            boxShadow:
              "inset -2px -2px 2px #FFFFFF, inset 2px 2px 2px rgba(192, 192, 219, 0.7) !important",
            }}
        >
          <Stack
            flexDirection='column'
          >
            <Stack
              flexDirection='row'
              alignItems='center'
              justifyContent='space-between'
              my='25px'
            >
              <Stack alignItems='center' width='100px'>
              <svg width="47" height="42" viewBox="0 0 47 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M44.7797 19.7466V14.0556C44.7755 12.9823 44.4588 11.9365 43.8728 11.0614C43.2867 10.1862 42.4601 9.52453 41.5059 9.16675V6.24314C41.5059 4.63158 40.9023 3.08603 39.8279 1.94648C38.7535 0.806938 37.2962 0.166748 35.7768 0.166748H6.31248C4.79301 0.166748 3.33577 0.806938 2.26135 1.94648C1.18692 3.08603 0.583313 4.63158 0.583313 6.24314V33.1529C0.585912 35.4542 1.44904 37.6606 2.98338 39.2879C4.51771 40.9152 6.59796 41.8307 8.76784 41.8334H36.5952C38.7651 41.8307 40.8453 40.9152 42.3797 39.2879C43.914 37.6606 44.7771 35.4542 44.7797 33.1529V30.9341C45.2758 30.6318 45.6882 30.1964 45.9755 29.6717C46.2628 29.147 46.4149 28.5513 46.4166 27.9445V22.7362C46.4149 22.1294 46.2628 21.5338 45.9755 21.009C45.6882 20.4843 45.2758 20.0489 44.7797 19.7466ZM43.1428 22.7362V27.9445H34.1399C33.4887 27.9445 32.8641 27.6702 32.4037 27.1818C31.9432 26.6934 31.6845 26.031 31.6845 25.3404C31.6845 24.6497 31.9432 23.9873 32.4037 23.4989C32.8641 23.0106 33.4887 22.7362 34.1399 22.7362H43.1428ZM6.31248 3.63897H35.7768C36.428 3.63897 37.0525 3.91334 37.513 4.40171C37.9734 4.89009 38.2321 5.55247 38.2321 6.24314V8.8473H6.31248C5.66128 8.8473 5.03675 8.57294 4.57628 8.08456C4.11581 7.59619 3.85712 6.9338 3.85712 6.24314C3.85712 5.55247 4.11581 4.89009 4.57628 4.40171C5.03675 3.91334 5.66128 3.63897 6.31248 3.63897ZM36.5952 38.3612H8.76784C7.46543 38.3612 6.21638 37.8125 5.29544 36.8357C4.3745 35.859 3.85712 34.5342 3.85712 33.1529V11.7102C4.62207 12.1062 5.46128 12.3144 6.31248 12.3195H39.869C40.3032 12.3195 40.7195 12.5024 41.0265 12.828C41.3335 13.1536 41.5059 13.5952 41.5059 14.0556V19.264H34.1399C32.6204 19.264 31.1632 19.9042 30.0887 21.0437C29.0143 22.1832 28.4107 23.7288 28.4107 25.3404C28.4107 26.9519 29.0143 28.4975 30.0887 29.637C31.1632 30.7766 32.6204 31.4167 34.1399 31.4167H41.5059V33.1529C41.5059 34.5342 40.9886 35.859 40.0676 36.8357C39.1467 37.8125 37.8976 38.3612 36.5952 38.3612Z" fill="#76D275"/>
</svg>
                <Typography
                  sx={{fontSize: '16px', fontWeight: '600'}}
                >Выручка</Typography>
              </Stack>
              <Stack
                alignItems='center' width='100px'
              >
                <Typography sx={{fontSize: '16px', fontWeight: '400', color: 'rgba(118, 210, 117, 1)'}}>{data ? Number(data[2].valuevat): null}</Typography>
                <Typography sx={{fontSize: '24px', fontWeight: '600'}}>{ data ? ((Number(data[2].valuevat) - Number(data[1].valuevat))/ Number(data[2].valuevat) * 100).toFixed(2) : null } %</Typography>
                <Typography sx={{fontSize: '12px', fontWeight: '400'}}>vs 2022</Typography>
              </Stack>
            </Stack>
            <Stack
              flexDirection='row'
              alignItems='center'
              justifyContent='space-between'
              my='25px'
            >
              <Stack alignItems='center' width='100px'>
              <svg width="51" height="37" viewBox="0 0 51 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M31.8035 3.7C30.7818 3.7 29.9535 2.87173 29.9535 1.85C29.9535 0.828274 30.7818 0 31.8035 0H39.859C42.6204 0 44.859 2.23858 44.859 5V31.6009C44.859 34.3623 42.6204 36.6009 39.859 36.6009H31.8035C30.7818 36.6009 29.9535 35.7726 29.9535 34.7509C29.9535 33.7291 30.7818 32.9009 31.8035 32.9009H39.859C40.577 32.9009 41.159 32.3188 41.159 31.6009V5C41.159 4.28203 40.577 3.7 39.859 3.7H31.8035ZM15.0474 1.85C15.0474 2.87173 14.2191 3.7 13.1974 3.7H5.14062C4.42266 3.7 3.84063 4.28203 3.84063 5V31.6009C3.84063 32.3188 4.42266 32.9009 5.14063 32.9009H13.1974C14.2191 32.9009 15.0474 33.7291 15.0474 34.7509C15.0474 35.7726 14.2191 36.6009 13.1974 36.6009H5.14063C2.3792 36.6009 0.140625 34.3623 0.140625 31.6009V5C0.140625 2.23858 2.3792 0 5.14062 0H13.1974C14.2191 0 15.0474 0.828274 15.0474 1.85ZM24.3636 16.2591H29.9534L20.637 32.5262V20.3259H15.0472L24.3636 4.05883V16.2591ZM47.1594 14.0447C47.1594 13.023 47.9877 12.1947 49.0094 12.1947C50.0312 12.1947 50.8594 13.023 50.8594 14.0447V22.545C50.8594 23.5667 50.0312 24.395 49.0094 24.395C47.9877 24.395 47.1594 23.5667 47.1594 22.545V14.0447Z" fill="#76D275"/>
</svg>

                <Typography 
                  sx={{fontSize: '16px', fontWeight: '600'}}
                >
                  Отпущено</Typography>
              </Stack>
              <Stack
                alignItems='center' width='100px'
              >
                <Typography sx={{fontSize: '16px', fontWeight: '400', color: 'rgba(118, 210, 117, 1)'}}>{data ? Number(data[2].sumenergy): null}</Typography>
                <Typography sx={{fontSize: '24px', fontWeight: '600'}}>{data ? ((Number(data[2].sumenergy) - Number(data[1].sumenergy))/ Number(data[2].sumenergy) * 100).toFixed(2) : null} %</Typography>
                <Typography sx={{fontSize: '12px', fontWeight: '400'}}>vs 2022</Typography>
              </Stack>
            </Stack>
            <Stack
              flexDirection='row'
              alignItems='center'
              justifyContent='space-between'
              my='25px'
            >
              <Stack alignItems='center' width='100px'>
              <svg width="37" height="43" viewBox="0 0 37 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M34.6177 8.33914H27.5887V2.35659C27.5887 1.9968 27.443 1.65174 27.1838 1.39734C26.9246 1.14293 26.573 1 26.2064 1C25.8398 1 25.4882 1.14293 25.2289 1.39734C24.9697 1.65174 24.8241 1.9968 24.8241 2.35659V8.33914H12.1759V2.35659C12.1759 1.9968 12.0303 1.65174 11.7711 1.39734C11.5118 1.14293 11.1603 1 10.7936 1C10.427 1 10.0754 1.14293 9.8162 1.39734C9.55697 1.65174 9.41133 1.9968 9.41133 2.35659V8.33914H2.38231C2.0157 8.33914 1.6641 8.48206 1.40487 8.73647C1.14564 8.99088 1 9.33594 1 9.69573C1 10.0555 1.14564 10.4006 1.40487 10.655C1.6641 10.9094 2.0157 11.0523 2.38231 11.0523H3.29463V16.9942C3.29616 20.716 4.71479 24.3029 7.27216 27.0511C9.82953 29.7993 13.341 31.5105 17.1177 31.8488V40.341C17.1177 40.7008 17.2633 41.0459 17.5226 41.3003C17.7818 41.5547 18.1334 41.6976 18.5 41.6976C18.8666 41.6976 19.2182 41.5547 19.4774 41.3003C19.7367 41.0459 19.8823 40.7008 19.8823 40.341V31.8488C23.659 31.5105 27.1705 29.7993 29.7278 27.0511C32.2852 24.3029 33.7038 20.716 33.7054 16.9942V11.0523H34.6177C34.9843 11.0523 35.3359 10.9094 35.5951 10.655C35.8544 10.4006 36 10.0555 36 9.69573C36 9.33594 35.8544 8.99088 35.5951 8.73647C35.3359 8.48206 34.9843 8.33914 34.6177 8.33914ZM30.9408 16.9942C30.2496 33.1918 6.75039 33.185 6.05924 16.9942V11.0523H30.9408V16.9942Z" fill="#76D275" stroke="#76D275"/>
</svg>

                <Typography
                  sx={{fontSize: '16px', fontWeight: '600'}}
                >Станций</Typography>
              </Stack>
              <Stack
                alignItems='center' width='100px'
              >
                <Typography sx={{fontSize: '16px', fontWeight: '400', color: 'rgba(118, 210, 117, 1)'}}>{stationCount ? avgSum(stationCount) : null}</Typography>
                <Typography sx={{fontSize: '24px', fontWeight: '600'}}>{stationCount ? percentCount(stationCount) : null} %</Typography>
                <Typography sx={{fontSize: '12px', fontWeight: '400'}}>vs 2022</Typography>
              </Stack>
            </Stack>
            {userCount && userCount[2].usercount ? <Stack
              flexDirection='row'
              alignItems='center'
              justifyContent='space-between'
              my='25px'
            >
              <Stack alignItems='center' width='100px'>
              <svg width="41" height="42" viewBox="0 0 41 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.24466 16.6038V16.6032C8.24462 14.9762 8.56192 13.3652 9.17841 11.8622C9.79489 10.3592 10.6985 8.9937 11.8374 7.84377C12.9764 6.69385 14.3284 5.782 15.8162 5.16029C17.304 4.53858 18.8984 4.21919 20.5084 4.22033C22.1184 4.22147 23.7124 4.54313 25.1993 5.16694C26.6863 5.79076 28.037 6.70452 29.1744 7.85607C30.3117 9.00761 31.2134 10.3744 31.8278 11.8782C32.4422 13.3821 32.7573 14.9936 32.7549 16.6206L32.755 16.6218L32.9095 30.4899C32.9095 30.4902 32.9095 30.4904 32.9095 30.4907C32.9093 32.1602 32.1156 33.4402 30.5221 34.333C28.9307 35.2246 26.5421 35.7285 23.3566 35.83C22.9606 35.2022 22.3726 34.721 21.6809 34.4603C20.971 34.1926 20.1928 34.1726 19.4704 34.4035C18.7479 34.6343 18.1228 35.1026 17.6946 35.7337C17.2663 36.3647 17.0594 37.1221 17.1066 37.8855C17.1538 38.6489 17.4524 39.3745 17.9551 39.9469C18.4578 40.5192 19.1357 40.9054 19.881 41.0436C20.6264 41.1819 21.396 41.0642 22.0674 40.7094C22.7204 40.3644 23.2439 39.8144 23.5596 39.1434C28.444 38.9661 31.5357 37.8808 33.4392 36.3728C35.3287 34.8759 36.0363 32.9715 36.1714 31.158C37.579 30.7926 38.6825 29.9506 39.4354 28.6887C40.1995 27.408 40.6 25.6995 40.6 23.6247C40.6 21.508 40.1852 19.7732 39.3938 18.4847C38.6144 17.2158 37.4727 16.3847 36.0175 16.05C35.8783 11.9991 34.1929 8.15832 31.3124 5.33343C28.4135 2.49044 24.5321 0.900074 20.4916 0.9C16.4511 0.899926 12.5697 2.49014 9.67069 5.33303C6.79006 8.15786 5.10453 11.9987 4.96519 16.0496C3.51444 16.3872 2.37707 17.2202 1.60093 18.4894C0.812779 19.7783 0.4 21.5117 0.4 23.6247C0.4 26.0673 0.9517 28.0035 1.9977 29.3312C3.04637 30.6623 4.58282 31.3701 6.52335 31.3701C6.95813 31.3701 7.37503 31.1962 7.68306 30.8868C7.99104 30.5775 8.16518 30.1578 8.16774 29.7195L8.24466 16.6038Z" fill="#76D275" stroke="#76D275" stroke-width="0.2"/>
</svg>

                <Typography
                  sx={{fontSize: '16px', fontWeight: '600'}}
                >Пользователи</Typography>
              </Stack>
              <Stack
                alignItems='center' width='100px'
              >
                <Typography sx={{fontSize: '16px', fontWeight: '400', color: 'rgba(118, 210, 117, 1)'}}>{ Number(userCount[2].usercount) }</Typography>
                <Typography sx={{fontSize: '24px', fontWeight: '600'}}>{ ((Number(userCount[2].usercount) - Number(userCount[1].usercount))/ Number(userCount[2].usercount) * 100).toFixed(2) } %</Typography>
                <Typography sx={{fontSize: '12px', fontWeight: '400'}}>vs 2022</Typography>
              </Stack>
            </Stack> : null} 
            <Stack
              flexDirection='row'
              alignItems='center'
              justifyContent='space-between'
              my='25px'
            >
              <Stack alignItems='center' width='100px'>
              <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.5 41.1866C32.2696 41.1866 41 32.4143 41 21.5933C41 10.7722 32.2696 2 21.5 2C10.7304 2 2 10.7722 2 21.5933C2 32.4143 10.7304 41.1866 21.5 41.1866Z" stroke="#76D275" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.864 23.385L16.1822 28.7287C21.7205 23.1638 24.8257 20.0438 30.364 14.479" stroke="#76D275" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                <Typography
                  sx={{fontSize: '16px', fontWeight: '600'}}
                >Сессий</Typography>
              </Stack>
              <Stack
                alignItems='center' width='100px'
              >
                <Typography sx={{fontSize: '16px', fontWeight: '400', color: 'rgba(118, 210, 117, 1)'}}>{data ? Number(data[2].sessioncount): null}</Typography>
                <Typography sx={{fontSize: '24px', fontWeight: '600'}}>{data ? ((Number(data[2].sessioncount) - Number(data[1].sessioncount))/ Number(data[2].sessioncount) * 100).toFixed(2) : null} %</Typography>
                <Typography sx={{fontSize: '12px', fontWeight: '400'}}>vs 2022</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          width='500px'
          px='50px'
        >
          <Chart
            chartType="Bar"
            width="500px"
            height="350px"
            data={[
              ["Год", "Отпущено"],
              [data ? data[0].date : null, data ? Number(data[0].sumenergy) : null],
              [data ? data[1].date : null, data ? Number(data[1].sumenergy) : null],
              [data ? data[2].date : null, data ? Number(data[2].sumenergy) : null],
            ]}
          />
          <Chart
            chartType="Bar"
            width="500px"
            height="350px"
            data={[
              ["Год", "Сессий"],
              [data ? data[0].date : null, data ? Number(data[0].sessioncount) : null],
              [data ? data[1].date : null, data ? Number(data[1].sessioncount) : null],
              [data ? data[2].date : null, data ? Number(data[2].sessioncount) : null],
            ]}
          />
        </Stack>
      </Stack>
    </Stack>
    {/* <IndicatorContainer/> */}
  </Stack>
)};

const mapStateToProps = state => ({
  page: state.pageReducer.page,
  region: state.pageReducer.region,
});

export default withRouter(connect(mapStateToProps, null)(StatisticPage));