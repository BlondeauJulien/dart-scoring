import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import NewGame from './newGame/NewGame';
import Game from './game/pages/Game';
import Stats from './stats/page/Stats';

import GameState from './context/gameContext/GameState';

function App() {

  useEffect(() => {
    if(!localStorage.getItem('darts501scoring')) {
      localStorage.setItem('darts501scoring', JSON.stringify({}))
    }
  }, [])


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
						<Route path="/stats" exact>
							<Stats />
						</Route>
					</Switch>
				</main>
			</Router>
		</GameState>
	);
}

export default App;
