import sortObjectData from '../sortObjectData';
const {
  doubleOutSortedHighToLow,
  scoreRangesSortedHighLow,
  checkoutScoresSortedHighLow,
  sectionHitSortedByValueHightLow
} = sortObjectData;

describe("doubleOutSortedHighToLow return what's expected", () => {
  const doubleOut = {
    25: {total: 2, miss: 0, hit: 2},
    1: {total: 4, miss: 2, hit: 2},
    8: {total: 10, miss: 8, hit: 2},
    4: {total: 1, miss: 1, hit: 0},
    12: {total: 5, miss: 3, hit: 2},
    16: {total: 8, miss: 4, hit: 4},
    20: {total: 9, miss: 0, hit: 7}
  }
  const doubleOutArrSorted = doubleOutSortedHighToLow(doubleOut);
  const sortedKeys = Object.keys(doubleOut);
  
  it('return array sorted by key', () => {
    for(let i = 1; i< doubleOutArrSorted.length; i++) {
      expect(doubleOutArrSorted[i].name).toBe(`D${sortedKeys[i]}`);
    }  
  });

  it('value return in expected form', () => {
    expect(doubleOutArrSorted[0].value).toBe('2 /4 (50%)'); //D1
    expect(doubleOutArrSorted[1].value).toBe('0 /1 (0%)'); // D4
  });

});

describe("scoreRangesSortedHighLow return what's expected", () => {
  const scoreRanges = {
    ZERO: 1,
    '40-59': 7,
    '180': 2,
    '100-119': 10,
  }
  const totalThrow = 20;
  const scoreRangeArrSorted = scoreRangesSortedHighLow(scoreRanges, totalThrow);
  const scoreRangesKeySorted = ['180', '100-119', '40-59', 'ZERO'];

  it('return array sorted by key', () => {
    for(let i = 1; i< scoreRangeArrSorted.length; i++) {

      expect(scoreRangeArrSorted[i].name).toEqual(scoreRangesKeySorted[i]);
    }  
  });

  it('value return in expected form', () => {
    expect(scoreRangeArrSorted[0].value).toBe('2 (10%)'); //180
    expect(scoreRangeArrSorted[1].value).toBe('10 (50%)'); // 100-119
  });
});

describe("checkoutScoresSortedHighLow return what's expected", () => {

  const checkoutScores = {
    3: 5,
    120: 1,
    12: 3,
    9: 7, 
    42: 42,
    100: 2
  }

  const checkoutScoreArrSorted = checkoutScoresSortedHighLow(checkoutScores);
  const checkoutScoreKeySorted = Object.keys(checkoutScores).sort((a,b) => Number(a) < Number(b));

  it('return array sorted by key Highest to Lowest', () => {
    for(let i = 1; i< checkoutScoreArrSorted.length; i++) {

      expect(checkoutScoreArrSorted[i].name).toEqual(checkoutScoreKeySorted[i]);
    }  
  });


  it('value return in expected form', () => {
    expect(checkoutScoreArrSorted[0].value).toBe('1 time'); //120
    expect(checkoutScoreArrSorted[1].value).toBe('2 times'); // 100
  });

})


describe("sectionHitSortedByValueHightLow return what's expected", () => {
  const sectionsHit = {
    T20: 6,
    D25: 2,
    S9: 8,
    Missed: 4,
  }
  const totalThrow = 20;
  const sectionsHitArrSorted = sectionHitSortedByValueHightLow(sectionsHit, totalThrow);
  const sectionsHitKeysSortedFromValues = ['S9', 'T20', 'Missed', 'D25']; //sorted

  it('return array sorted by value highest to lowest', () => {
    for(let i = 1; i< sectionsHitArrSorted.length; i++) {

      expect(sectionsHitArrSorted[i].name).toEqual(sectionsHitKeysSortedFromValues[i]);
    }  
  });

  it('value return in expected form', () => {
    expect(sectionsHitArrSorted[0].value).toBe('8 (40%)'); //S9
    expect(sectionsHitArrSorted[1].value).toBe('6 (30%)'); // T20
  });
});