const getChartData = (statName, playerStat) => {
  let chartData;

  if(statName === 'matchResult') {
    chartData = getWinLoss(playerStat);
    return chartData;
  } 

  if(statName === 'bestThreeDarts') chartData = getBestThreeDartsData(statName, playerStat);
  if(statName === 'averageOverall' || 
  statName === 'averageBegMidGame' || 
  statName === 'averageEndGame') chartData = getAverageData(statName, playerStat);
  
  chartData = chartData.map((matchData, i) => {
    matchData.name = i+1;
    return matchData;
  });
  

  return chartData;
}

const getBestThreeDartsData = (statName, playerStat) => {
  return [...playerStat.matches].map(match => {
    if(match[statName] === 0) return null;
    return { value: match[statName]};
  }).filter(stat => stat !== null);
}

const getAverageData = (statName ,playerStat) => {
  let period = statName === 'averageOverall' ? 'overall' : 
    statName === 'averageBegMidGame' ? 'begMidGame' : 'endGame';

  return [...playerStat.matches].map(match => {
    if(match.averages[period] === 0) return null;
    return { value: Math.round(match.averages[period])};
  }).filter(stat => stat !== null);
}

const getWinLoss = (playerStat) => {
  let chartData = [
    {name: 'Win', value: playerStat.matchesWon, color: '#14B431'}, 
    {name: 'Loss', value: playerStat.nbrOfMatches - playerStat.matchesWon, color: '#DF0202'}
  ];

  return chartData;
}

export default getChartData;