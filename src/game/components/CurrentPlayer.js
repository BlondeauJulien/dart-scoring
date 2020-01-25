import React from 'react';

import Input from '../../shared/components/form/Input';

import './CurrentPlayer.css';

const CurrentPlayer = () => {
  return (
    <div>
      <div>
        <h2>It's your Turn</h2>
        <h3>Julien</h3>
        <p>501</p>
        <div>
          <p>Checkout</p>
          <ul>
            <li>T20 - T19 - D9</li>
            <li>T20 - T19 - D9</li>
          </ul>
        </div>
      </div>
      <div>
        <form>
          <h2>Click on the dartboard <br />or<br /> enter your score manualy <span>?</span></h2>
          <div>
            <Input
              element="input"
              type="text"
              name="dart-1"
              htmlFor="dart-1"
              label="Dart 1"
              value=""
              placeholder="Enter score"
            />
           </div>
           <div>
           <Input
              element="input"
              type="text"
              name="dart-2"
              htmlFor="dart-2"
              label="Dart 2"
              value=""
              placeholder="Enter score"
            />
           </div>
           <div>
           <Input
              element="input"
              type="text"
              name="dart-3"
              htmlFor="dart-3"
              label="Dart 3"
              value=""
              placeholder="Enter score"
            />
           </div>
           <button type="submit">Validate</button>
        </form>
      </div>
      <div>
        <h2>Player Stats</h2>
      </div>
    </div>
  )
}

export default CurrentPlayer
