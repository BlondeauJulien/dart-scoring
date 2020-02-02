import dataModels from './dataModels';

const localStorageDataExist = dataName => localStorage.getItem(dataName);

const getLocalStorageData = () => JSON.parse(localStorage.getItem('darts501scoring'));

const setLocalStorageData = data => localStorage.setItem('darts501scoring', JSON.stringify(data));

const createPlayer = name => {
  let data = getLocalStorageData();
  data[name] = dataModels.playerModel;
  setLocalStorageData(data);
}

const updatePlayer = (name, playerData) => {
  let data = getLocalStorageData();
  data[name] = playerData;
  setLocalStorageData(data);
}

const getAllPlayersName = () => {
  if(!localStorageDataExist('darts501scoring')) {
    setLocalStorageData({});
  }
  let data = getLocalStorageData();
  let playersName = Object.keys(data);
  return playersName;
}

const getSinglePlayerData = playerName => {
  let players = getLocalStorageData();
  return players[playerName];
}

const localStorageMethod = {
  createPlayer,
  updatePlayer,
  getAllPlayersName,
  getSinglePlayerData
}

export default localStorageMethod