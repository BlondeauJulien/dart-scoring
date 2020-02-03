import React from 'react'

const StatsObjectData = props => {
  const { title, object, isDoubleOut, totalThrow, displayPercentage } = props;

  if(isDoubleOut) {
    return (
      <div>
        <h3>{title}</h3>
        {Object.entries(object).map(([key, value]) => (
          <div key={`stat-${object}-${key}`}>
            <p>D{key}:</p>
            <p>{value.hit} /{value.total} ({value.hit * 100 / value.total}%)</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h3>{title}</h3>
      {Object.entries(object).map(([key, value]) => (
        <div key={`stat-${object}-${key}`}>
          <p>{key}:</p>
          <p>{value} {displayPercentage && `(${Math.round(value * 100 / totalThrow)}%)`}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsObjectData
