import React, { Fragment, useState } from 'react';

import PlayersList from '../components/PlayersList';
import CurrentPlayer from '../components/CurrentPlayer';
import DartBoard from '../components/DartBoard';

import './Game.css'

const Game = () => {
 
  const game = {
    isSoloGame: false,
    hasWinner:false,
    sets: 3,
    legs: 1,
    order: {
      startingPlayer: 1,
      currentPlayerTurn: 1,
      players: []
    },
    currentLegThrows: [{playerName: 'Julien', throws: []}],
    matchInfo: {
      julien : {
        currentLegScore: 501,
        setWon:0,
        currentSetLegWon: 0
      },
      dugdi : {
        currentLegScore: 501,
        setWon:0,
        currentSetLegWon: 0
      },
      bosco : {
        currentLegScore: 501,
        setWon:0,
        currentSetLegWon: 0
      },
      vivien : {
        currentLegScore: 501,
        setWon:0,
        currentSetLegWon: 0
      },
    },
    currentLegStats: {
      julien: {
        hit: {
          // empty object that will fill up as the game goes, the number displayed is the number of time it hit a spot:
          totalThrow: 31,
          T20: 8,
          S20: 23,
          miss: 12,
        },
        throw: [{
          // we keep the score so we will be able to check if it's end game or not in the starts
          startingScore: 501,
          darts: []
        }],
        doubleOut: {
          D1: {
            miss: 5,
            hit: 1
          }
        }
      },
      bosco: {
        hit: {
          // empty object that will fill up as the game goes, the number displayed is the number of time it hit a spot:
          totalThrow: 31,
          T20: 8,
          S20: 23,
          miss: 12,
        },
        throw: [{
          // we keep the score so we will be able to check if it's end game or not in the starts
          startingScore: 501,
          darts: []
        }],
        doubleOut: {
          D1: {
            miss: 5,
            hit: 1
          }
        }
      },
      dugdi: {
        hit: {
          // empty object that will fill up as the game goes, the number displayed is the number of time it hit a spot:
          totalThrow: 31,
          T20: 8,
          S20: 23,
          miss: 12,
        },
        throw: [{
          // we keep the score so we will be able to check if it's end game or not in the starts
          startingScore: 501,
          darts: []
        }],
        doubleOut: {
          D1: {
            miss: 5,
            hit: 1
          }
        }
      },
      vivien: {
        hit: {
          // empty object that will fill up as the game goes, the number displayed is the number of time it hit a spot:
          totalThrow: 31,
          T20: 8,
          S20: 23,
          miss: 12,
        },
        throw: [{
          // we keep the score so we will be able to check if it's end game or not in the starts
          startingScore: 501,
          darts: []
        }],
        doubleOut: {
          D1: {
            miss: 5,
            hit: 1
          }
        }
      }
    },
    matchStats: {
      julien: {
        hasWonMatch: false,
        //canDoubleOut: false,
        //canCheckout: false,
        hit: {
          // empty object that will fill up as the game goes, the number displayed is the number of time it hit a spot:
          totalThrow: 31,
          T20: 8,
          S20: 23,
          miss: 12,
        },
        throws: [{
          // we keep the score so we will be able to check if it's end game or not in the starts

            startingScore: 501,
            scores: [20,40,60]
          },
          {
            startingScore: 501,
            scores: [30,50,10]

        }],
        doubleOut: {
          D1: {
            total: 5,
            hit: 1
          },
          D16: {
            total: 8,
            hit: 7
          },
          D6: {
            total: 5,
            hit: 1
          },
        }
      },
      bosco: {
        hasWonMatch: false,
        //canDoubleOut: false,
        //canCheckout: false,
        hit: {
          // empty object that will fill up as the game goes, the number displayed is the number of time it hit a spot:
          totalThrow: 31,
          T20: 8,
          S20: 23,
          miss: 12,
        },
        throws: [{
          // we keep the score so we will be able to check if it's end game or not in the starts

            startingScore: 501,
            scores: [20,40,60]
          },
          {
            startingScore: 501,
            scores: [30,50,10]

        }],
        doubleOut: {
          D1: {
            total: 5,
            hit: 1
          },
          D16: {
            total: 8,
            hit: 7
          },
          D6: {
            total: 5,
            hit: 1
          },
        }
      },
      dugdi: {
        hasWonMatch: false,
        //canDoubleOut: false,
        //canCheckout: false,
        hit: {
          // empty object that will fill up as the game goes, the number displayed is the number of time it hit a spot:
          totalThrow: 31,
          T20: 8,
          S20: 23,
          miss: 12,
        },
        throws: [{
          // we keep the score so we will be able to check if it's end game or not in the starts

            startingScore: 501,
            scores: [20,40,60]
          },
          {
            startingScore: 501,
            scores: [30,50,10]

        }],
        doubleOut: {
          D1: {
            total: 5,
            hit: 1
          },
          D16: {
            total: 8,
            hit: 7
          },
          D6: {
            total: 5,
            hit: 1
          },
        }
      },
      vivien: {
        hasWonMatch: false,
        //canDoubleOut: false,
        //canCheckout: false,
        hit: {
          // empty object that will fill up as the game goes, the number displayed is the number of time it hit a spot:
          totalThrow: 31,
          T20: 8,
          S20: 23,
          miss: 12,
        },
        throws: [{
          // we keep the score so we will be able to check if it's end game or not in the starts

            startingScore: 501,
            scores: [20,40,60]
          },
          {
            startingScore: 501,
            scores: [30,50,10]

        }],
        doubleOut: {
          D1: {
            total: 5,
            hit: 1
          },
          D16: {
            total: 8,
            hit: 7
          },
          D6: {
            total: 5,
            hit: 1
          },
        }
      }
    }
    
  }



  return (
    <Fragment>
      <div className="game-container">
        <DartBoard />
        <CurrentPlayer />
        <PlayersList playersInfo={game.matchInfo} playersStat={game.matchStats}/>
      </div>
      <div className="game-stats-container">
        stats
      </div>
    </Fragment>
  )
}

export default Game
