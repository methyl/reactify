import React, { Component, PropTypes } from 'react'

export default class Challenge extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        This is a challenge.
      </div>
    )
  }
}
