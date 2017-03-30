import 'react-fastclick';
import skrollr from 'skrollr';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import style from './client.styl';
import Back from './image/bg.png';
import Elevator from './image/elevator.png';
import People from './image/people.png';
import Lattice from './image/lattice.png';

console.log(skrollr);

class App extends PureComponent {
  constructor(props, context) {
    super(props, context);
    style._insertCss();
  }

  componentDidMount = () => {
    skrollr.init();
  };

  render = () => (
    <div id='App'>
      <div id='AppBack'>
        <div id='AppBackGround' style={{ backgroundImage: `url(${Back})` }} data-0='background-position: 50% 40%' data-5000='background-position: 50% 60%' />
        <div id='AppBackElevator' style={{ backgroundImage: `url(${Elevator})` }} data-0='background-position: 50% 20%' data-5000='background-position: 50% 80%' />
        <div id='AppBackLattice' style={{ backgroundImage: `url(${Lattice})` }} />
        <div id='AppBackPeople' style={{ backgroundImage: `url(${People})` }} data-0='background-position: 50% 0%' data-5000='background-position: 50% 100%' />
      </div>
      <ul id='AppMenu'>
        <li className='AppMenu'>トップ</li>
        <li className='AppMenu'>ストーリー</li>
        <li className='AppMenu'>キャラクター</li>
        <li className='AppMenu'>テーマソング</li>
      </ul>
      <div id='AppMain'>
        ほげほげ
      </div>
    </div>
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('app'));
