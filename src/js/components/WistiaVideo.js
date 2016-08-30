import React, { Component, PropTypes } from 'react';

export default class WistiaVideo extends Component {
  static defaultProps = {
    onVideoEnd: () => {},
  }

  componentDidMount() {
    const container = this.refs.container
    window._wq = window._wq || [];
    // Wistia loads asynchronously, so we push to the queue in order to wait for it
    _wq.push(function(W) {
      // W is our Wistia instance. We hop through all of the videos and find the one
      // which belongs to this component by comparing the container reference
      const video = W.api.all().filter(video => video.container === container)[0]
      this.setState({ videoHandler: video })
      video.bind("end", function() {
        this.props.onVideoEnd()
      }.bind(this));
    }.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    // if videoId changed, we need to replace the video in the player
    if (nextProps.videoId !== this.props.videoId)
      this.state.videoHandler.replaceWith(nextProps.videoId)
  }

  render() {
    return (
      <div
        ref="container"
        className={`wistia_embed wistia_async_${this.props.videoId}`}
        style={{width: 640, height: 320}}
      >
        &nbsp;
      </div>
    )
  }

  style() {
    return {
      border: 'none',
      width: '100%'
    }
  }
}
