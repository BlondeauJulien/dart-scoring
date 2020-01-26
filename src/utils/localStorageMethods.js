const getLocalStorageData = () => JSON.parse(localStorage.getItem('darts501scoring'));

const setLocalStorageData = data => localStorage.setItem('darts501scoring', JSON.stringify(data));

const createPlayer = name => {
  let data = getLocalStorageData();
  data[name] = [];
  setLocalStorageData(data);
}

const localStorageMethod = {
  createPlayer
}

export default localStorageMethod