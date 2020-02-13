const doubleOutSortedHighToLow = object => {
  return Object.entries(object).map(([key, value]) => {
    return {
      name: `D${key}`,
      value: `${value.hit} /${value.total} (${Math.round(value.hit * 100 / value.total)}%)`
    }
  });
}

const scoreRangesSortedHighLow = (object, totalThrow) => {
  let scoreRangesInArray =  Object.entries(object).map(([key, value]) => {
    return {
      name: `${key}`,
      value: `${value} (${Math.round(value * 100 / totalThrow)}%)`
    }
  });

  return scoreRangesInArray.sort((a,b) => {
    return Number(a.name.split('-')[0]) < Number(b.name.split('-')[0]);
  })
}

const checkoutScoresSortedHighLow = (object) => {
  let checkoutScoreInArray =  Object.entries(object).map(([key, value]) => {
    return {
      name: `${key}`,
      value: `${value} time${value > 1 ? 's' : ''}`
    }
  });

  return checkoutScoreInArray.sort((a,b) => {
    return Number(a.name) < Number(b.name);
  })
}

const sectionHitSortedByValueHightLow = (object, totalThrow) => {
  let sectionHitInArray =  Object.entries(object).map(([key, value]) => {
    return {
      name: `${key}`,
      value: `${value} (${Math.round(value * 100 / totalThrow)}%)`,
      sortHelper: value
    }
  });

  return sectionHitInArray.sort((a,b) => {
    return Number(a.sortHelper) < Number(b.sortHelper);
  })
}



const sortObjectData = {
  doubleOutSortedHighToLow,
  scoreRangesSortedHighLow,
  checkoutScoresSortedHighLow,
  sectionHitSortedByValueHightLow
}


export default sortObjectData;