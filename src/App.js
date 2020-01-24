import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import NewGame from './newGame/NewGame';

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch >
          <Route path="/" exact>
					  <NewGame />
				  </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
