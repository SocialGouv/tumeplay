/* 
Shamelessly taken from "react-native-web-modal"" : as "fixed" does not work on web
due to relative upper containers, we extract component and set it on body.
*/

import {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Portal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    portalClass: PropTypes.string,
  };

  state = {
    el: null,
    target: null,
  };

  componentDidMount() {
    this.setState(
      {el: document.createElement('div'), target: document.body},
      () => {
        this.state.el.className = this.props.portalClass; //'web-quizz-button';
        this.state.target.appendChild(this.state.el);
      },
    );
  }

  componentWillUnmount() {
    this.state.target && this.state.target.removeChild(this.state.el);
  }

  render() {
    const {children} = this.props;

    if (this.state.el) {
      return ReactDOM.createPortal(children, this.state.el);
    }

    return null;
  }
}
