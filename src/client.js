import domready from 'domready';
import { render, createElement } from 'preact';
import App from './components/App';

domready(() => {
  const root = document.getElementById('app');
  render(createElement(App), document.body, root);
});
