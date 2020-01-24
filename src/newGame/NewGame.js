import React from 'react';

import Input from '../shared/components/form/Input';

import './NewGame.css';

const NewGame = () => {
	const inputsValues = {
		gameTypeValues: [ 101, 301, 501, 701, 1001 ],
		setOptionsValues: [ 1, 3, 5, 7, 9, 11 ],
		legOptionsValues: [ 1, 3, 5, 7, 9, 11 ],
		numberOfPlayers: [ 1, 2, 3, 4 ]
	};

	return (
		<form className="start-game-form">
			<div className="input-cont">
				<label>Game</label>
				<div className="input-cont__type">
					{inputsValues.gameTypeValues.map((value) => (
						<Input
              key={`game-type-${value}`}
							element="input"
							type="radio"
							name="game-type"
							value={value}
							htmlFor={value}
							label={value}
						/>
					))}
				</div>
			</div>

			<div className="input-cont input-cont__sets">
				<Input element="select" name="game-set" htmlFor="set" label="First to win">
					{inputsValues.setOptionsValues.map((value) => (
						<option key={`set-option-${value}`} value={value}>
							{value} set{value > 1 && 's'}
						</option>
					))}
				</Input>

				<Input element="select" name="game-leg" htmlFor="leg" label="Of">
					{inputsValues.legOptionsValues.map((value) => (
						<option key={`leg-option-${value}`} value={value}>
							{value} leg{value > 1 && 's'}
						</option>
					))}
				</Input>
			</div>

			<div className="input-cont">
				<label>Number of players</label>
				<div className="input-cont__player-nbr">
					{inputsValues.numberOfPlayers.map((value) => (
						<Input
							key={`player-nbr-${value}`}
							element="input"
							type="radio"
							name="game-player-nbr"
							value={value}
							htmlFor={value}
							label={value === 1 ? 'Solo' : value + ' Players'}
						/>
					))}
				</div>
			</div>

			<div className="input-cont">
				<label>Who is playing?</label>
        {['','','',''].map((player, i) => {
          return (
            <div key={`player-${i+1}`}>
              <label>Player {i+1}</label>
            <div>
            <Input
							key={`player-nbr-${player}`}
							element="input"
							type="text"
							name={`player-${i+1}`}
							value={player}
							htmlFor={`player-${i+1}`}
							label={'New Player'}
						/>
            </div>
            <div>
              <Input element="select" name="players-names" htmlFor="playersNames" label="Or pick an existing player">
					{['julien', 'dugdi', 'vivien', 'bosco'].map((existingPlayer) => (
						<option key={`player-name-${existingPlayer}`} value={existingPlayer}>
							{existingPlayer}
						</option>
					))}
				</Input>
            </div>
          </div>
          )
        })}

			</div>
		</form>
	);
};

export default NewGame;
