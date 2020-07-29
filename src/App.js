import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import NewGame from './newGame/NewGame';
import Game from './game/pages/Game';
import Stats from './stats/page/Stats';
import About from './about/pages/About';

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
						<Route path="/dart-scoring/" exact>
							<NewGame />
						</Route>
						<Route path="/dart-scoring/game" exact>
							<Game />
						</Route>
						<Route path="/dart-scoring/stats" exact>
							<Stats />
						</Route>
						<Route path="/dart-scoring/about" exact>
							<About />
						</Route>
					</Switch>
				</main>
			</Router>
		</GameState>
	);
}

export default App;
