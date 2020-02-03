import React from 'react';

import MatchesNumberInfo from '../components/MatchesNumberInfo';
import AveragesAndBestScoreInfos from '../components/AveragesAndBestScoreInfos';
import StatsObjectData from '../components/StatsObjectData';

const StatsContainer = props => {
  const {
    name,
    nbrOfMatches,
    matchesWon,
    soloGames,
    averages,
    bestThreeDarts,
    scoreRanges,
    hit,
    doubleOut,
    checkoutScores
  } = props.playerStats;
  return (
    <div>
      <h2>{name}</h2>
      <MatchesNumberInfo nbrOfMatches={nbrOfMatches} matchesWon={matchesWon} soloGames={soloGames}/>
      <AveragesAndBestScoreInfos averages={averages} bestThreeDarts={bestThreeDarts}/>
      <div>
        <StatsObjectData title={'Score ranges:'} object={scoreRanges} />
        <StatsObjectData title={'Sections hit:'} object={hit} />
        <StatsObjectData title={'Double Out success rate:'} object={doubleOut} isDoubleOut/>
        <StatsObjectData title={'Successful checkout score:'} object={checkoutScores} />
      </div>
    </div>
  )
}

export default StatsContainer
