import 'react-fastclick';
import classNames from 'classnames';
import React, { PureComponent } from 'react';

import { withStyle } from '../../utils/Decorator';

@withStyle({ style: require('./App.styl') })
export default class App extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = { loaded: false, count: 0 };
  }

  handleAssignNode = (node) => {
    this.node = node;
  };

  render = () => (
    <div id='App' ref={this.handleAssignNode} className={classNames({ mobile: this.state.mobile })}>
      アプリだよ
    </div>
  );
}
