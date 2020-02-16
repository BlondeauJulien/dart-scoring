import React from 'react';
import { Router} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NewGame from '../NewGame';
import GameState from '../../context/gameContext/GameState';
import {render, fireEvent, cleanup} from '@testing-library/react';

describe("NewGame", () => {
  afterEach(cleanup)

  it('should be able to change game type', () => {
    const history = createMemoryHistory()
    const { getByLabelText } = render(
      <Router history={history}>
        <GameState>
          <NewGame />
        </GameState>
      </Router>
    );

    expect(getByLabelText(/501/i).checked).toBeTruthy();
    fireEvent.click(getByLabelText(/1001/i));
    expect(getByLabelText(/501/i).checked).toBeFalsy();
    expect(getByLabelText(/1001/i).checked).toBeTruthy();
  });

  it('should be able to change sets and legs', () => {
    const history = createMemoryHistory()
    const { getAllByLabelText } = render(
      <Router history={history}>
        <GameState>
          <NewGame />
        </GameState>
      </Router>
    );
    
    const selectSetsLegsArr = getAllByLabelText(/First to/i);
    const legsSelect = selectSetsLegsArr[0];
    const setsSelect = selectSetsLegsArr[1]
    
    expect(legsSelect.value).toBe('1');
    expect(setsSelect.value).toBe('1');
    fireEvent.change(legsSelect, {target: { value: '3'}});
    fireEvent.change(setsSelect, {target: { value: '5'}});
    expect(legsSelect.value).toBe('3');
    expect(setsSelect.value).toBe('5');

  });



  it('should be able to change numbers of player and display a playerName input for each', () => {
    const history = createMemoryHistory()
    const { getByLabelText, queryByLabelText } = render(
      <Router history={history}>
        <GameState>
          <NewGame />
        </GameState>
      </Router>
    );

    expect(getByLabelText(/^2$/i).checked).toBeTruthy();
    expect(getByLabelText(/Player 2:/i)).toBeTruthy();
    expect(queryByLabelText(/Player 3/i)).toBeFalsy();
    fireEvent.click(getByLabelText(/^3$/i));
    expect(queryByLabelText(/Player 3/i)).toBeTruthy();

  });

});