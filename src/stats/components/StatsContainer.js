import React, {Fragment} from 'react';

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
    checkoutScores,
    totalThrow
  } = props.playerStats;
  const {playerName, isMatchStats, isStatsPage} = props;
  return (
    <div>
      {isStatsPage && (
        <Fragment>
          <h2>{name}</h2>
          <MatchesNumberInfo nbrOfMatches={nbrOfMatches} matchesWon={matchesWon} soloGames={soloGames}/>
        </Fragment>
      )}

      {isMatchStats && <h2>{playerName}</h2>}

      <AveragesAndBestScoreInfos averages={averages} bestThreeDarts={bestThreeDarts}/>
      <div>
      {Object.keys(scoreRanges).length > 0 && (
        <StatsObjectData title={'Score ranges:'} object={scoreRanges} totalThrow={totalThrow.rounds} displayPercentage/>
      )}
      {Object.keys(hit).length > 0 && (
        <StatsObjectData title={'Sections hit:'} object={hit} totalThrow={totalThrow.darts} displayPercentage/>
      )}
      {Object.keys(doubleOut).length > 0 && (
        <StatsObjectData title={'Double Out success rate:'} object={doubleOut} isDoubleOut/>
      )}
      {Object.keys(checkoutScores).length > 0 && (
        <StatsObjectData title={'Successful checkout score:'} object={checkoutScores}  />
      )}
      </div>
    </div>
  )
}

export default StatsContainer
