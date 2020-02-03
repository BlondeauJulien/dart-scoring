import React, { useState, useEffect } from 'react';

import StatsContainer from '../components/StatsContainer';
import Input from '../../shared/components/form/Input';
import localStorageMethod from '../../utils/localStorageMethods';
import Spinner from '../../shared/components/UIElement/Spinner';

import './Stats.css';

const Stats = () => {
  const {getAllPlayersName, getSinglePlayerData} = localStorageMethod;
  const [form, setForm] = useState({playerName: undefined});
  const [playerStats, setPlayerStats] = useState(undefined);
  const [playerNameList, setPlayerNameList] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const onSubmit = e => {
    e.preventDefault();
    setPlayerStats(getSinglePlayerData(form.playerName));
  }
  return (
    <div>
      {playerNameList && playerNameList.length ? (
        <div>
          <form onSubmit={onSubmit}>
            <Input element="select" 
              name="playerName" 
              htmlFor="playerName" 
              label="Pick a player" 
              value={form.playerName} 
              onChange={handleChange}
            >
              {playerNameList.map((playerName) => (
                <option key={`player-name-stat-${playerName}`} value={playerName}>
                  {playerName}
                </option>
              ))}
            </Input>
            <button type="submit">See Stats</button>
          </form>
        </div>

      ) : (

        <h2>You do not have any saved player. Create one play a game and come back after.</h2>
      )}

      {playerStats && (<StatsContainer playerStats={playerStats}/>)}
    </div>
  )
}

export default Stats
