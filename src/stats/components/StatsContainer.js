import React, {Fragment} from 'react';

import MatchesNumberInfo from '../components/MatchesNumberInfo';
import AveragesAndBestScoreInfos from '../components/AveragesAndBestScoreInfos';
import StatsObjectData from '../components/StatsObjectData';

import './StatsContainer.css';

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

  const {
    playerName,
    isMatchStats, 
    isStatsPage,
    classNameFor,
    getChart
  } = props;

  return (
    <div className={`stats__stats-cont__${classNameFor}`}>
      {isStatsPage && (
        <Fragment>
          <h2 className="statscont__player-name">{name}</h2>
          <MatchesNumberInfo 
            nbrOfMatches={nbrOfMatches} 
            matchesWon={matchesWon} 
            soloGames={soloGames}
            getChart={getChart}
          />
        </Fragment>
      )}

      {isMatchStats && <h2 className="statscont__player-name">{playerName}</h2>}

      <AveragesAndBestScoreInfos averages={averages} bestThreeDarts={bestThreeDarts} getChart={getChart} classNamePage={'stats-page'}/>

      <div className={`stats__objects-stats-cont__${classNameFor}`}>
        {Object.keys(scoreRanges).length > 0 && (
          <StatsObjectData title={'Score ranges:'} object={scoreRanges} totalThrow={totalThrow.rounds} statName={'scoreRanges'} displayPercentage/>
        )}
        {Object.keys(doubleOut).length > 0 && (
          <StatsObjectData title={'Double Out success rate:'} object={doubleOut} statName={'doubleOut'}/>
        )}
        {Object.keys(checkoutScores).length > 0 && (
          <StatsObjectData title={'Checkout scores cleared:'} object={checkoutScores}  statName={'checkoutScores'}/>
        )}
        {Object.keys(hit).length > 0 && (
          <StatsObjectData title={'Sections hit:'} object={hit} totalThrow={totalThrow.darts} statName={'sectionHit'} displayPercentage/>
        )}
      </div>
    </div>
  )
}

export default StatsContainer
