import 'react-fastclick';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { provideContext, connectToStores } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';
import { withStyle } from '../../utils/Decorator';

@provideContext({ insertCss: PropTypes.func.isRequired })
@handleHistory()
@withStyle(require('./App.styl'))
@connectToStores(['RouteStore'], (context) => ({
  route: context.getStore('RouteStore').getRoute(),
  error: context.getStore('RouteStore').getError(),
}))
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
