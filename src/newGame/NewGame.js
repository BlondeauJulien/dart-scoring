import React, { Fragment, useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import Input from '../shared/components/form/Input';
import inputsValues from '../shared/components/form/utils/newGameInputsValues';
import PageErrorMessage from '../shared/components/UIElement/PageErrorMessage';
import Modal from '../shared/components/UIElement/Modal';
import Spinner from '../shared/components/UIElement/Spinner';
import localStorageMethods from '../utils/localStorageMethods';
import dataModels from '../utils/dataModels';
import GameContext from '../context/gameContext/gameContext';

import './NewGame.css';
import localStorageMethod from '../utils/localStorageMethods';

const NewGame = () => {
	const history = useHistory()
	const gameContext = useContext(GameContext);
	const {gameTypeValues, setOptionsValues, legOptionsValues, numberOfPlayers} = inputsValues;
	const [showAddPlayer, setShowAddPlayer] = useState(false);
	const [newPlayerName, setNewPlayerName] = useState('');
	const [createPlayerSuccessMsg, setCreatePlayerSuccessMsg] = useState(null);
	const [ error, setError ] = useState(null);
	const [gameForm, setGameForm] = useState({
		gameType: 501,
		sets: 1,
		legs: 1,
		numberOfPlayers: 2,
		players: ['','']
	});

	useEffect(() => {
		new Set(gameForm.players).size === gameForm.players.length && setError(null);
		let clearErrorTimout = setTimeout(() => {
			setError(null);
		}, 10000);

		return () => {
			clearTimeout(clearErrorTimout);
		}
	}, [error, gameForm.players]);

	useEffect(() => {
		let clearMessage = setTimeout(() => {
			setCreatePlayerSuccessMsg(null);
		}, 3000);

		return () => {
			clearTimeout(clearMessage);
		}
	}, [createPlayerSuccessMsg])

	const handleChange = e => {
		if(e.target.name === 'numberOfPlayers') {
			setGameForm({...gameForm, numberOfPlayers: Number(e.target.value) , players: Array(Number(e.target.value)).fill('')})
		} else {
			setGameForm({...gameForm, [e.target.name]: Number(e.target.value)});
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

	const onStartGame = e => {
		e.preventDefault();

		const playersArrHasDuplicate = new Set(gameForm.players).size !== gameForm.players.length;
		if(playersArrHasDuplicate){
			setError('Each player should be unique.');
			return
		}

		let newGameForm = {...gameForm};
		newGameForm.isSoloGame = Number(newGameForm.numberOfPlayers) === 1;
		newGameForm.gameIsRunning = true;
		newGameForm.matchPlayerInfo = {}
		newGameForm.players.forEach(player => {
			let playerDataModel = {...dataModels.playerMatchModel};
			playerDataModel.score = Number(newGameForm.gameType);
			newGameForm.matchPlayerInfo[player] = playerDataModel;
		})
		
		gameContext.initNewGame(newGameForm);
		history.push('/game');

	}

	const onCreatePlayer = e => {
		e.preventDefault();
		let playerExist = localStorageMethod.getAllPlayersName().find(name => name === newPlayerName);
		if(playerExist) {
			setCreatePlayerSuccessMsg(newPlayerName + " already exist!");
			return
		}
		localStorageMethods.createPlayer(newPlayerName);
		if(localStorageMethod.getSinglePlayerData(newPlayerName)) {
			setCreatePlayerSuccessMsg(newPlayerName + " has been added");
		} else {
			setCreatePlayerSuccessMsg("There was an error, please try again");
		}
		setNewPlayerName('');
	}

	if(gameContext.match.gameIsRunning && !gameContext.loading.initGameLoading) {
		return (
			<PageErrorMessage
				title={"A game is running"}
			>
				<Link to="/game" className="page-error__button">Go to the game</Link>
				<button onClick={gameContext.resetGame} type="button" className="page-error__button page-error__button-danger">Cancel the game</button>
			</PageErrorMessage>
		)
	}

	if(gameContext.loading.initGameLoading) {
		return <Spinner spinnerContClassName={"spinner-cont-large"} spinnerImgClassName={"spinnerSmall"}/>
	}

	return (
		<Fragment>
			{showAddPlayer && (
				<Modal 
					isForm
					header={'Add a new player'}
					onSubmit={onCreatePlayer}
					onClickModalBackground={() => setShowAddPlayer(false)}
					contentClass={"modal__content-text-input-inline-cont"}
					footer={(
						<Fragment>
							<button className="modal-btn" type="submit">Create Player</button>
							<button className="modal-btn" onClick={() => setShowAddPlayer(false)}>Go Back</button>
						</Fragment>
					)}
				>
					<Input 
						element="input"
						type="text"
						name="newPlayerName"
						value={newPlayerName}
						htmlFor={"newPlayerName"}
						label={"Player Name:"}
						onChange={e => setNewPlayerName(e.target.value)}
						minLength={2}
						maxLength={12}
						required
					/>
					{createPlayerSuccessMsg && (
						<p className="create-player-msg">{createPlayerSuccessMsg}</p>
					)}
				</Modal>
			)}
			<h2 className="start-game-title">START A NEW GAME</h2>
			<form className="start-game-form" onSubmit={onStartGame}>
				<div className="start-game-form__game-type-cont">
					<label className="start-game-form__section-title">Game type</label>
					<div className="start-game-form__game-type-cont__inputs-radio-cont">
						{gameTypeValues.map((value) => (
							<Input
								key={`game-type-${value}`}
								id={value}
								element="input"
								type="radio"
								name="gameType"
								value={value}
								htmlFor={value}
								label={value}
								checked={Number(gameForm.gameType) === Number(value)}
								onChange={handleChange}
								classNameLabel={`label-radio-clickable ${Number(value) === gameForm.gameType && "label-radio-btn-selected"}`}
								classNameInput={"isHidden"}
								required
							/>
						))}
					</div>
				</div>

				<div className="start-game-form__sets-legs-cont">
					<div className="start-game-form__sets-legs-cont__item-cont">
						<Input element="select" name="sets" htmlFor="set" label="First to" value={gameForm.sets} onChange={handleChange}>
							{setOptionsValues.map((value) => (
								<option key={`set-option-${value}`} value={value}>
									{value} set{value > 1 && 's'}
								</option>
							))}
						</Input>
						<p>win the match</p>
					</div>

					<div className="start-game-form__sets-legs-cont__item-cont">
						<Input element="select" name="legs" htmlFor="leg" label="First to" value={gameForm.legs} onChange={handleChange}>
							{legOptionsValues.map((value) => (
								<option key={`leg-option-${value}`} value={value}>
									{value} leg{value > 1 && 's'}
								</option>
							))}
						</Input>
							<p>win the set</p>
					</div>
				</div>

				<div>
					<label className="start-game-form__section-title">Number of players</label>
					<div className="start-game-form__game-type-cont__inputs-radio-cont">
						{numberOfPlayers.map((value) => (
							<Input
								key={`player-nbr-${value}`}
								id={value}
								element="input"
								type="radio"
								name="numberOfPlayers"
								value={value}
								htmlFor={value}
								label={value === 1 ? 'Solo' : value }
								checked={Number(gameForm.numberOfPlayers) === Number(value)}
								onChange={handleChange}
								classNameLabel={ `label-radio-clickable ${Number(value) === gameForm.numberOfPlayers && "label-radio-btn-selected"}`}
								classNameInput={"isHidden"}
								required
							/>
						))}
					</div>
				</div>
				
				<div className="start-game-form__select-player-cont">
					<label className="start-game-form__section-title">Who is playing?</label>
					{gameForm.players.map((player, i) => {
						return (
							<div key={`player-${i+1}`} className="start-game-form__select-player-cont__element-cont">
									<Input element="select" name="players-names" htmlFor="playersNames" label={`Player ${i+1}:`} value={gameForm.players[i]} onChange={e => updatePlayer(e.target.value ,i)}>
										<option value={''} >Pick Player {i+1}</option>
									{localStorageMethods.getAllPlayersName().map((existingPlayer) => (
										<option key={`player-name-${existingPlayer}`} value={existingPlayer}>
											{existingPlayer}
										</option>
									))}
									</Input>
							</div>
						)
					})}
				</div>

				<div className="start-game-form__add-new-player-cont">
					<h3 className="start-game-form__section-title">New Player or not in the list?</h3>
					<button className='start-game-form__btn btn-add-player' type="button" onClick={() => setShowAddPlayer(true)}>Create a new player</button>
				</div>

				{error && (
					<div className="start-game-form__error-cont">
						<p>{error}</p>
					</div>
				)}

				<button type="submit" className="start-game-form__btn">START</button>
				
			</form>
		</Fragment>
	);
};

export default NewGame;
