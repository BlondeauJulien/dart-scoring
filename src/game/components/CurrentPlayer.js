import React, { useContext, useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import CurrentPlayerStats from './CurrentPlayerStats';
import Checkout from './Checkout';
import Input from '../../shared/components/form/Input';
import Spinner from '../../shared/components/UIElement/Spinner';
import Modal from '../../shared/components/UIElement/Modal';
import GameContext from '../../context/gameContext/gameContext';
import savePlayersData from '../../utils/savePlayerData';
import checkout from '../../utils/checkout';
import dataModels from '../../utils/dataModels';

import './CurrentPlayer.css';

const CurrentPlayer = () => {
	const history = useHistory();
	const {
		match,
		updateCurrentThrowManual,
		onClickValidateThrow,
		getCurrentThrowScore,
		onClickReturnToPreviousPlayer,
		resetGame,
		initNewGame,
		loading,
		error,
		resetError
	} = useContext(GameContext);
	const [ score, setScore ] = useState(match.matchPlayerInfo[match.players[match.currentPlayerTurn]].score);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const clickEnterSubmitForm = (e) => {
			if(e.key === 'Enter') {
				document.getElementById('submit-throws').click();
			}
		}

		document.addEventListener('keyup', clickEnterSubmitForm);

		return () => {
			document.removeEventListener('keyup', clickEnterSubmitForm);
		}
	}, [])

	useEffect(() => {
    let totalScore = getCurrentThrowScore();

    let currentPlayer = match.players[match.currentPlayerTurn];
    let currentPlayerScore = match.matchPlayerInfo[currentPlayer].score;

    let newCurrentScore = currentPlayerScore - totalScore;
    setScore(newCurrentScore);

    // eslint-disable-next-line
	},[ match.currentThrow ]);
	
	useEffect(() => {
		let currentPlayer = match.players[match.currentPlayerTurn];
		if(match.hasWinner) savePlayersData(match, currentPlayer)

		// eslint-disable-next-line
	}, [match.hasWinner])

	useEffect(() => {
    setTimeout(() => {
      resetError();
    }, 12000);
    // eslint-disable-next-line
	},[ error ]);

	const onChange = (e) => {
		let throwIndex = Number(e.target.name.split('-')[1]) - 1;
/* 		if (throwIndex > 0) {
			for (let i = 0; i < throwIndex; i++) {
				if (match.currentThrow[i] === '') {
					return;
				}
			}
		} */

		updateCurrentThrowManual(e.target.value, throwIndex);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		onClickValidateThrow(score);
	};

	const onFinishGame = e => {
		resetGame();
		history.push('/');
	}

	const onRestartGame = e => {
		let newMatchSetup = {...match};

		newMatchSetup.hasWinner = false;
		newMatchSetup.startingPlayerLeg = 0;
		newMatchSetup.startingPlayerSet = 0;
		newMatchSetup.currentPlayerTurn = 0;
		newMatchSetup.allLegsThrows = [];

		newMatchSetup.matchPlayerInfo = {};
		newMatchSetup.players.forEach(player => {
			let playerDataModel = {...dataModels.playerMatchModel};
			playerDataModel.score = Number(newMatchSetup.gameType);
			newMatchSetup.matchPlayerInfo[player] = playerDataModel;
		})
		initNewGame(newMatchSetup);
	}

	return (
		<Fragment>
			{showModal && (
				<Modal 
					isDiv
					contentClass={'modal__game-infos-text'}
					header={'How to manually add a dart score?'}
					footer={(
						<Fragment>
							<button className="modal-btn" onClick={() => setShowModal(false)}>GOT IT</button>
						</Fragment>
					)}
				>
					<p>If you missed, simply enter 0.</p>
					<p>For any other scores add:</p>
					<p>"S" (for a single), "D" (for a double)<br />
					or "T" (for a treble) before your score.<br />
					So "D10" scores 20 points, "T20" scores 60 ...</p>
					<p>Note that:</p>
					<p>The inner BULLSEYE (50 points) = "D25"<br /> 
					and the outer BULLSEYE (25 points) = "S25".</p>
					
				</Modal>
			)}

			<div>
				{match.hasWinner && (
					<Fragment>
						<p className="game__victory-message">
							{match.players[match.currentPlayerTurn]}<br />
							WIN<br />
							THE<br />
							GAME
						</p>
						<div className="game__ended-btn-cont">
							<button onClick={onRestartGame} className="game__new-game-btn">Play Again</button>
							<button onClick={onFinishGame} className="game__back-home-btn">Back Home</button>
						</div>
				</Fragment>
				)}
				{!match.hasWinner && (
					<div className="game__current-player">
						<div className="game__current-player-info-cont">
							<h2>It's your Turn</h2>
							<h3 className="game__current-player-info-cont__name">{match.players[match.currentPlayerTurn]}</h3>
							<p className="game__current-player-info-cont__score">{score === 1 || score < 0 ? 'BUST' : score}</p>
							{checkout[score] && (
								<Checkout score={score} />
							)}
						</div>
						<div>
							<form className="game__current-player__form" onSubmit={onSubmit}>
								<h2>
									Click on the dartboard <br />
									or<br />
									enter your score manualy{` `}
									<i onClick={() => setShowModal(true)} className="far fa-question-circle" style={{cursor: "pointer"}}></i>
								</h2>
								<div className="game__current-player__form__input-cont">
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
								<div className="game__current-player__form__input-cont">
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
								<div className="game__current-player__form__input-cont">
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
									<button id="submit-throws" type="submit">Validate</button>
								)}

								{error && error.errorFor === 'throw-validation' && <p className="game__throw-validaion-error">{error.message}</p>}
							</form>
						</div>
						{match.currentLegThrows.length !== 0 && (
							<button 
								onClick={onClickReturnToPreviousPlayer} 
								className="game__current-player__undo-btn" 
								type="button"
							>
								<i className="fas fa-undo-alt"></i>
								Previous player
							</button>
						)}
					</div>
				)}

				<div>
					<CurrentPlayerStats 
						currentPlayerInfos={match.matchPlayerInfo[match.players[match.currentPlayerTurn]]} 
						playerName={match.players[match.currentPlayerTurn]}
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default CurrentPlayer;
