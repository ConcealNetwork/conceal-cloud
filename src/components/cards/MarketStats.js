import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

import { AppContext } from '../ContextProvider';


const MarketStats = () => {
  const { state } = useContext(AppContext);
  const { marketData } = state;
  const [xLabels, setXLabels] = useState([]);

  const ccxToUSD =  marketData ? marketData.market_data.current_price.usd : 0;
  const ccxToBTC =  marketData ? marketData.market_data.current_price.btc : 0;
  const marketCap =  marketData ? marketData.market_data.market_cap.usd : 0;
  const marketCapRank =  marketData ? marketData.market_cap_rank : 0;
  const dailyVolume = marketData ? marketData.market_data.total_volume.usd : 0;

  const format2Decimals = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  const format8Decimals = { minimumFractionDigits: 8, maximumFractionDigits: 8 };

  const data = {
    labels: xLabels,
    datasets: [
      {
        fill: true,
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        borderColor: 'rgb(255, 165, 0)',
        borderWidth: 1,
        pointRadius: 0,
        data: marketData ? marketData.market_data.sparkline_7d.price : [],
      }
    ]
  };

  const options = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          fontSize: 10,
          callback: value => `$ ${value.toLocaleString(undefined, format2Decimals)}`
        },
        gridLines: {
          color: 'rgba(255, 255, 255, .08)'
        },
      }],
      xAxes: [{
        ticks: {
          autoSkip: true,
          maxTicksLimit: 7,
          maxRotation: 0,
          minRotation: 0,
        },
        gridLines: {
          color: 'rgba(255, 255, 255, .08)'
        },
      }],
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: item => `$ ${parseFloat(item.value).toLocaleString(undefined, format2Decimals)}`,
      }
    },
  };

  useEffect(() => {
    const len = marketData ? marketData.market_data.sparkline_7d.price.length : 0;
    if (len !== data.labels.length) {
      const duration = moment.duration(7 / len, 'd').asMilliseconds();
      setXLabels(
        Array(len)
          .fill(len)
          .map((val, i) => moment().subtract(duration * (i + 1), 'ms').format('YYYY-MM-DD'))
          .reverse()
      );
    }
  }, [marketData]);

  return (
    <div>
      <div className="nav-statistics-wrapper mg-t-20">
        <nav className="nav">
			  <span className="nav-link active">Market</span>
		</nav>
      </div>

      <div id="blockStats" className="card card-dash-one mg-b-20">
        <div className="row no-gutters">
          <div className="col-lg-3">
            <div className="dash-content dash-small-info dash-flex">
   			      <div className="info-text">
				        <label>CCX to USD</label>
				        <h2>$ {ccxToUSD.toLocaleString(undefined, format2Decimals)}</h2>
			        </div>
              <div className="icon icon-info">
                <FontAwesomeIcon icon="dollar-sign" fixedWidth />
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="dash-content dash-small-info dash-flex">
   			      <div className="info-text">
                <label>CCX to BTC</label>
                <h2>{ccxToBTC.toLocaleString(undefined, format8Decimals)}</h2>
			        </div>
              <div className="icon icon-info">
                <FontAwesomeIcon icon={['fab', 'bitcoin']} fixedWidth />
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="dash-content dash-small-info dash-flex">
   			      <div className="info-text">
                <label>Marketcap (Rank {marketCapRank})</label>
                <h2>$ {parseInt(marketCap).toLocaleString()}</h2>
              </div>
              <div className="icon icon-info">
                <FontAwesomeIcon icon="trophy" fixedWidth />
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="dash-content dash-small-info dash-flex">
              <div className="info-text">
                <label>Daily Volume</label>
                <h2>$ {parseInt(dailyVolume).toLocaleString()}</h2>
			        </div>
              <div className="icon icon-info">
                <FontAwesomeIcon icon={['far', 'money-bill-alt']} fixedWidth />
              </div>
            </div>
          </div>

        </div>
        </div>

      <div className="card card-info">
        <div className="card-body pd-40">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default MarketStats;
