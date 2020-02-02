import React, { useContext, useState, useEffect, Fragment } from 'react';

import Input from '../../shared/components/form/Input';
import Spinner from '../../shared/components/UIElement/Spinner';
import GameContext from '../../context/gameContext/gameContext';

import './CurrentPlayer.css';

const CurrentPlayer = () => {
	const {
		match,
		updateCurrentThrowManual,
		onClickValidateThrow,
		getCurrentThrowScore,
		loading,
		error,
		resetError
	} = useContext(GameContext);
	const [ score, setScore ] = useState(match.matchPlayerInfo[match.players[match.currentPlayerTurn]].score);

	useEffect(() => {
    let totalScore = getCurrentThrowScore();

    let currentPlayer = match.players[match.currentPlayerTurn];
    let currentPlayerScore = match.matchPlayerInfo[currentPlayer].score;

    let newCurrentScore = currentPlayerScore - totalScore;
    setScore(newCurrentScore);

    // eslint-disable-next-line
  },[ match.currentThrow ]);

	useEffect(() => {
    setTimeout(() => {
      resetError();
    }, 12000);
    // eslint-disable-next-line
  },[ error ]);

	const onChange = (e) => {
		let throwIndex = Number(e.target.name.split('-')[1]) - 1;
		if (throwIndex > 0) {
			for (let i = 0; i < throwIndex; i++) {
				if (match.currentThrow[i] === '') {
					console.log('erreur need previous dart score');
					return;
				}
			}
		}

		updateCurrentThrowManual(e.target.value, throwIndex);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		onClickValidateThrow(score);
	};

	return (
		<div>
			{match.hasWinner && <p>{match.players[match.currentPlayerTurn]}</p>}
			{!match.hasWinner && (
				<Fragment>
					<div>
						<h2>It's your Turn</h2>
						<h3>{match.players[match.currentPlayerTurn]}</h3>
						<p>{score === 1 || score < 0 ? 'BUST' : score}</p>
						<div>
							<p>Checkout</p>
							<ul>
								<li>T20 - T19 - D9</li>
								<li>T20 - T19 - D9</li>
							</ul>
						</div>
					</div>
					<div>
						<form onSubmit={onSubmit}>
							<h2>
								Click on the dartboard <br />or<br /> enter your score manualy <span>?</span>
							</h2>
							<div>
								<Input
									element="input"
									type="text"
									name="dart-1"
									htmlFor="dart-1"
									label="Dart 1"
									value={match.currentThrow[0]}
									placeholder="Enter score"
									onChange={onChange}
								/>
							</div>
							<div>
								{((score !== 1 && score > 0) ||
									match.currentThrow[1].trim() !== '' ||
									(match.currentThrow[1].trim() === '' && match.currentThrow[2].trim() !== '')) && (
									<Input
										element="input"
										type="text"
										name="dart-2"
										htmlFor="dart-2"
										label="Dart 2"
										value={match.currentThrow[1]}
										placeholder="Enter score"
										onChange={onChange}
									/>
								)}
							</div>
							<div>
								{((score !== 1 && score > 0) || match.currentThrow[2].trim() !== '') && (
									<Input
										element="input"
										type="text"
										name="dart-3"
										htmlFor="dart-3"
										label="Dart 3"
										value={match.currentThrow[2]}
										placeholder="Enter score"
										onChange={onChange}
									/>
								)}
							</div>
							{loading.validateThrow ? (
								<Spinner
									spinnerContClassName={'spinner-cont-large'}
									spinnerImgClassName={'spinnerSmall'}
								/>
							) : (
								<button type="submit">Validate</button>
							)}

							{error && error.errorFor === 'throw-validation' && <p>{error.message}</p>}
						</form>
					</div>
				</Fragment>
			)}

			<div>
				<h2>Player Stats</h2>
			</div>
		</div>
	);
};

export default CurrentPlayer;
