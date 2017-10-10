import 'react-fastclick';
import React from 'react';
import ReactDOM from 'react-dom';
import app from './app';

app.rehydrate(window.dehydrated || {}, async (err, context) => {
  const container = document.getElementById('app');
  const componentContext = Object.assign(context.getComponentContext(), {
    insertCss: (...styles) => {
      const removeCss = styles.map(x => x._insertCss());
      return () => removeCss.forEach(f => f());
    },
  });

  ReactDOM.render(React.createElement(context.getComponent(), {
    context: componentContext,
  }), container);
});
