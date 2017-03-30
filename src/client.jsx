import 'react-fastclick';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import style from './client.styl';
import bg from './image/bg.png';

class App extends PureComponent {
  constructor(props, context) {
    super(props, context);
    style._insertCss();
  }

  render = () => (
    <div id='App'>
      <div id='AppBack' style={{ backgroundImage: `url(${bg})` }} />
    </div>
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('app'));
