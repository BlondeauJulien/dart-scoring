import React from 'react';

import sortObjectData from '../utils/sortObjectData';

import './StatsObjectData.css';

const StatsObjectData = props => {
  const { title, object, statName, totalThrow } = props;
  const { doubleOutSortedHighToLow, scoreRangesSortedHighLow, checkoutScoresSortedHighLow, sectionHitSortedByValueHightLow } = sortObjectData;

  let rowContent;

  if(statName === 'doubleOut') {
    rowContent = doubleOutSortedHighToLow(object);

    return (
      <div className="stats-object-cont">
        <h3 className="stats-object-cont__title">{title}</h3>
        {rowContent.reverse().map((stat) => (
          <div key={`stat-${stat.name}-${stat.key}`} className="stats-object-cont__data-cont">
            <p>{stat.name}:</p>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
    )
  } else {
    if(statName === 'scoreRanges') rowContent = scoreRangesSortedHighLow(object, totalThrow);
    if(statName === 'checkoutScores') rowContent = checkoutScoresSortedHighLow(object);
    if(statName === 'sectionHit') rowContent = sectionHitSortedByValueHightLow(object, totalThrow);

    return (
      <div className="stats-object-cont">
        <h3 className="stats-object-cont__title">{title}</h3>
        {rowContent.map((stat) => (
          <div key={`stat-${stat.name}-${stat.key}`} className="stats-object-cont__data-cont">
            <p>{stat.name}:</p>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
    )
  }

  
}

export default StatsObjectData


//Error: Objects are not valid as a React child (found: object with keys {total, miss, hit}). If you meant to render a collection of children, use an array instead. in p (at StatsObjectData.js:37) in div (at StatsObjectData.js:35) in div (at StatsObjectData.js:32) in StatsObjectData (at CurrentPlayerStats.js:24) in div (at CurrentPlayerStats.js:11) in CurrentPlayerStats (at CurrentPlayer.js:206) in div (at CurrentPlayer.js:205) in div (at CurrentPlayer.js:111) in CurrentPlayer (at Game.js:33) in div (at Game.js:31) in Game (at App.js:30) in Route (at App.js:26) in Switch (at App.js:25) in main (at App.js:24) in Router (created by BrowserRouter) in BrowserRouter (at App.js:22) in GameState (at App.js:21) in App (at src/index.js:7)