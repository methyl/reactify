import React, { Component, PropTypes } from 'react';
import ViewManager from './ViewManager';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div className="page-container">
        <ViewManager />
      </div>
    );
  }
}
