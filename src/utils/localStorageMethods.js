const localStorageDataExist = dataName => localStorage.getItem(dataName);

const getLocalStorageData = () => JSON.parse(localStorage.getItem('darts501scoring'));

const setLocalStorageData = data => localStorage.setItem('darts501scoring', JSON.stringify(data));

const createPlayer = name => {
  let data = getLocalStorageData();
  data[name] = [];
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

const localStorageMethod = {
  createPlayer,
  getAllPlayersName
}

export default localStorageMethod