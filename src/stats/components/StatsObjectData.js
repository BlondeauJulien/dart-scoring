import React from 'react'

const StatsObjectData = props => {
  const { title, object, isDoubleOut } = props;

  if(isDoubleOut) {
    return (
      <div>
        <h3>{title}</h3>
        {Object.entries(object).map(([key, value]) => (
          <div key={`stat-${object}-${key}`}>
            <p>D{key}:</p>
            <p>{value.hit} /{value.total} ({value.total * 100 / value.hit}%)</p>
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
          <p>{value}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsObjectData
