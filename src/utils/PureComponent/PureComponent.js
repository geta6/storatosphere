import { Component } from 'preact';
import { is } from 'immutable';

const isEqual = (a = {}, b = {}) => (
  Object.keys({ ...a, ...b }).every((k) => is(a[k], b[k]))
);

const shouldComponentUpdate = (nextProps, nextState) => (
  isEqual(this.props, nextProps) || isEqual(this.state, nextState)
);

export default class PureComponent extends Component {
  shouldComponentUpdate = shouldComponentUpdate;
}
