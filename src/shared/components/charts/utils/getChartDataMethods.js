const getChartData = (statName, playerStat) => {
  let chartData;

  if(statName === 'matchResult') {
    chartData = [{name: 'Win', value: playerStat.matchesWon}, 
    {name: 'Loss', value: playerStat.nbrOfMatches - playerStat.matchesWon}];

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
    return { value: match[statName]};
  })
}

const getAverageData = (statName ,playerStat) => {
  let period = statName === 'averageOverall' ? 'overall' : 
    statName === 'averageBegMidGame' ? 'begMidGame' : 'endGame';

  return [...playerStat.matches].map(match => {
    if(match.averages[period] === 0) return null;
    return { value: Math.round(match.averages[period])};
  }).filter(stat => stat !== null);
}

export default getChartData;