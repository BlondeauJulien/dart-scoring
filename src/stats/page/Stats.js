import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import StatsContainer from '../components/StatsContainer';
import Input from '../../shared/components/form/Input';
import Modal from '../../shared/components/UIElement/Modal';
import ChartComponent from '../../shared/components/charts/ChartComponent';
import PageErrorMessage from '../../shared/components/UIElement/PageErrorMessage';
import Spinner from '../../shared/components/UIElement/Spinner';
import localStorageMethod from '../../utils/localStorageMethods';
import getChartData from '../../shared/components/charts/utils/getChartDataMethods';

import './Stats.css';

const Stats = () => {
  const {getAllPlayersName, getSinglePlayerData} = localStorageMethod;
  const [form, setForm] = useState({playerName: undefined});
  const [playerStats, setPlayerStats] = useState(undefined);
  const [playerNameList, setPlayerNameList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGraph, setShowGraph] = useState(false);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setPlayerNameList(getAllPlayersName());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(playerNameList) {
      setLoading(false);
      setForm({...form, playerName: playerNameList[0] ? playerNameList[0] : undefined})
    }
    // eslint-disable-next-line
  }, [playerNameList]);

  if(loading) {
    return <Spinner
    spinnerContClassName={'spinner-cont-large'}
    spinnerImgClassName={'spinnerSmall'}
  />
  }

  const handleChange = e => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const getChart = (statName, title, chartType) => {
      let data = getChartData(statName, playerStats);
      setChartData({title, data, chartType});
      setShowGraph(true);
  }

  const onSubmit = e => {
    e.preventDefault();
    setPlayerStats(getSinglePlayerData(form.playerName));
  }
  return (
    <Fragment>
      {showGraph && (
        <Modal 
          isDiv
          header={chartData.title}
          onClickModalBackground={() => setShowGraph(false)}
          className={'modal-graph-cont'}
          footer={(
            <Fragment>
              <button className="modal-btn" onClick={() => setShowGraph(false)}>Go Back</button>
            </Fragment>
          )}
        >
          <ChartComponent chartType={chartData.chartType} data={chartData.data} />
        </Modal>
      )}
   
      <div className="stats-page-cont">
        {playerNameList && playerNameList.length ? (
          <div>
            <form onSubmit={onSubmit} className="stats-page-cont__form">
              <Input element="select" 
                name="playerName" 
                htmlFor="playerName" 
                label="Pick a player:" 
                value={form.playerName} 
                onChange={handleChange}
              >
                {playerNameList.map((playerName) => (
                  <option key={`player-name-stat-${playerName}`} value={playerName}>
                    {playerName}
                  </option>
                ))}
              </Input>
              <button type="submit" className="btn-stat-player">See Stats</button>
            </form>
          </div>

        ) : (
          <PageErrorMessage
          title={"You do not have any saved player. Create a player, play a game and come back after."}
          >
            <Link to="/dart-scoring/" className="page-error__button">Go to home page</Link>
          </PageErrorMessage>
        )}

        {playerStats && (
          <StatsContainer 
            playerStats={playerStats} 
            classNameFor={'stats-page'}
            getChart={getChart}
            isStatsPage
          />
        )}
      </div>
    </Fragment>
  )
}

export default Stats
