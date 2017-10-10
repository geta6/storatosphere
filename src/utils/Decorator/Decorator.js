import noop from 'lodash/noop';
import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

export const withStyle = ({ style }) => (ComposedComponent) => (
  class WithStyle extends PureComponent {
    static displayName = `withStyle(${ComposedComponent.displayName})`;

    constructor(props, context) {
      super(props, context);
      this.removeCss = style._insertCss();
    }

    componentWillUnmount = () => {
      setTimeout(this.removeCss, 0);
    };

    render = () => (
      React.createElement(ComposedComponent, this.props)
    );
  }
);
