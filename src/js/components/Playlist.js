import React, { Component, PropTypes } from 'react'

export default class Playlist extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  state = {
    viewIndex: 0
  }

  handleVideoClick = (chapterId) => () =>
    this.props.onVideoClick(chapterId)

  handleQuizClick = (chapterId) => () =>
    this.props.onQuizClick(chapterId)

  handleChallengeClick = (chapterId) => () =>
    this.props.onChallengeClick(chapterId)

  renderChapter(chapter) {
    console.log(chapter)
    return (
      <li>
        <ul>
          <li onClick={this.handleVideoClick(chapter.id)}>{chapter.video.title}</li>
          <li onClick={this.handleQuizClick(chapter.id)}>Quiz</li>
          <li onClick={this.handleChallengeClick(chapter.id)}>Coding challenge</li>
        </ul>
      </li>
    )
  }

  render() {
    return (
      <ul>
        {this.props.chapters.map(this.renderChapter.bind(this))}
      </ul>
    )
  }
}
