import React, { useContext, useState } from 'react';

import Input from '../shared/components/form/Input';
import inputsValues from '../shared/components/form/utils/newGameInputsValues';
import GameContext from '../context/gameContext/gameContext';

import './NewGame.css';

const NewGame = () => {
	const gameContext = useContext(GameContext);
	const {gameTypeValues, setOptionsValues, legOptionsValues, numberOfPlayers} = inputsValues;
	const [gameForm, setGameForm] = useState({
		gameType: 501,
		sets: 1,
		legs: 1,
		numberOfPlayers: 2,
		players: ['','']
	});

	const handleChange = e => {
		if(e.target.name === 'numberOfPlayers') {
			setGameForm({...gameForm, numberOfPlayers: e.target.value , players: Array(Number(e.target.value)).fill('')})
		} else {
			setGameForm({...gameForm, [e.target.name]: e.target.value});
		}
	}

	const updatePlayer = (newValue, i) => {
		const newPlayersList = [...gameForm.players].map((player, j) => {
			if(j === i) {
				return newValue;
			} else {
				return player;
			}
		})
		setGameForm({...gameForm, players: newPlayersList});
	}

	const onsubmit = e => {
		e.preventDefault();
		console.log(gameForm);
	}

	if(gameContext.gameIsRunning) {
		return (
			<p>A game is running</p>
		)
	}

	return (
		<form className="start-game-form" onSubmit={onsubmit}>
			<div className="input-cont">
				<label>Game</label>
				<div className="input-cont__type">
					{gameTypeValues.map((value) => (
						<Input
              key={`game-type-${value}`}
							element="input"
							type="radio"
							name="gameType"
							value={value}
							htmlFor={value}
							label={value}
							checked={Number(gameForm.gameType) === Number(value)}
							onChange={handleChange}
						/>
					))}
				</div>
			</div>

			<div className="input-cont input-cont__sets">
				<Input element="select" name="sets" htmlFor="set" label="First to win" value={gameForm.sets} onChange={handleChange}>
					{setOptionsValues.map((value) => (
						<option key={`set-option-${value}`} value={value}>
							{value} set{value > 1 && 's'}
						</option>
					))}
				</Input>

				<Input element="select" name="legs" htmlFor="leg" label="Of" value={gameForm.legs} onChange={handleChange}>
					{legOptionsValues.map((value) => (
						<option key={`leg-option-${value}`} value={value}>
							{value} leg{value > 1 && 's'} (to win)
						</option>
					))}
				</Input>
			</div>

			<div className="input-cont">
				<label>Number of players</label>
				<div className="input-cont__player-nbr">
					{numberOfPlayers.map((value) => (
						<Input
							key={`player-nbr-${value}`}
							element="input"
							type="radio"
							name="numberOfPlayers"
							value={value}
							htmlFor={value}
							label={value === 1 ? 'Solo' : value + ' Players'}
							checked={Number(gameForm.numberOfPlayers) === Number(value)}
							onChange={handleChange}
						/>
					))}
				</div>
			</div>
			
			<div className="input-cont">
				<label>Who is playing?</label>
				<div>
					<h3>New Player or not in the list?</h3>
					<button>Create a new player</button>
        </div>
        {gameForm.players.map((player, i) => {
          return (
            <div key={`player-${i+1}`}>
							<div>
								<Input element="select" name="players-names" htmlFor="playersNames" label={`Player ${i+1}`} value={gameForm.players[i]} onChange={e => updatePlayer(e.target.value ,i)}>
									<option value={''} > - Pick Player {i+1} - </option>
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
			<button type="submit" >START</button>
		</form>
	);
};

export default NewGame;
