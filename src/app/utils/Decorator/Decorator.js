import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export const withStyle = (...styles) => (ComposedComponent) => (
  class WithStyle extends PureComponent {
    static displayName = `withStyle(${ComposedComponent.displayName})`;

    static contextTypes = {
      insertCss: PropTypes.func.isRequired,
    };

    constructor(props, context) {
      super(props, context);
      this.removeCss = styles.map((style) => this.context.insertCss(style));
    }

    componentWillUnmount = () => {
      setTimeout(() => this.removeCss.forEach((remove) => remove()), 0);
    };

    render = () => (
      React.createElement(ComposedComponent, this.props)
    );
  }
);
