import React from 'react';

import './StatsObjectData.css';

const StatsObjectData = props => {
  const { title, object, isDoubleOut, totalThrow, displayPercentage } = props;

  if(isDoubleOut) {
    return (
      <div className="stats-object-cont">
        <h3 className="stats-object-cont__title">{title}</h3>
        {Object.entries(object).map(([key, value]) => (
          <div key={`stat-${object}-${key}`} className="stats-object-cont__data-cont">
            <p>D{key}:</p>
            <p>{value.hit} /{value.total} ({Math.round(value.hit * 100 / value.total)}%)</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="stats-object-cont">
      <h3 className="stats-object-cont__title">{title}</h3>
      {Object.entries(object).map(([key, value]) => (
        <div key={`stat-${object}-${key}`} className="stats-object-cont__data-cont">
          <p>{key}:</p>
          <p>{value} {displayPercentage ? `(${Math.round(value * 100 / totalThrow)}%)` : `time${value > 1 ? 's' : ''}`}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsObjectData
