import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import NewGame from './newGame/NewGame';
import Game from './game/pages/Game';

import GameState from './context/gameContext/GameState';

function App() {
	return (
		<GameState>
			<Router>
				<MainNavigation />
				<main>
					<Switch>
						<Route path="/" exact>
							<NewGame />
						</Route>
						<Route path="/game" exact>
							<Game />
						</Route>
					</Switch>
				</main>
			</Router>
		</GameState>
	);
}

export default App;
