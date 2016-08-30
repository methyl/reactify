import React, { Component, PropTypes } from 'react';
import Quiz from './Quiz';
import Challenge from './Challenge';
import WistiaVideo from './WistiaVideo';
import Playlist from './Playlist';

const views = ['video', 'quiz'];

const chapters = [
  {
    id: 1,
    video: {
      id: 'wuvk0jc0t1',
      title: 'Whatever'
    },
    quiz: [
      {
        question: 'Do you like React?',
        choices: [
          'Yes', 'Of course', 'Most certainly'
        ],
        correctChoice: 0
      },
      {
        question: 'Do you like Redux?',
        choices: [
          'Sure', 'Yeah', '...'
        ],
        correctChoice: 1
      },
    ],
    challenge: {},
  },
  {
    id: 2,
    video: {
      id: 'q71p9v72sx',
      title: 'Another whatever',
    },
    quiz: {},
    challenge: {},
  }
]

function findChapter(chapters, id) {
  return chapters.filter(chapter => chapter.id === id)[0]
}

export default class ViewManager extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  state = {
    view: 'video',
    currentChapterId: 1,
  }

  handleVideoEnd = () =>
    this.setState({
      view: 'video'
    })

  handleQuizFinish = () =>
    this.setState({
      view: 'challenge'
    })

  renderCurrentView() {
    const chapter = findChapter(chapters, this.state.currentChapterId)
    if (this.state.view === 'video') {
      return (
        <WistiaVideo
          videoId={chapter.video.id}
          onVideoEnd={this.handleVideoEnd}
        />
      )
    } else if (this.state.view === 'quiz') {
      return (
        <Quiz quiz={chapter.quiz} onQuizFinish={this.handleQuizFinish} />
      )
    } else {
      return (
        <Challenge />
      )
    }
  }

  handleVideoClick = (chapterId) => {
    this.setState({ currentChapterId: chapterId, view: 'video' })
  }

  handleQuizClick = (chapterId) => {
    this.setState({ currentChapterId: chapterId, view: 'quiz' })
  }

  handleChallengeClick = (chapterId) => {
    this.setState({ currentChapterId: chapterId, view: 'challenge' })
  }

  render() {
    return (
      <div>
        {this.renderCurrentView()}
        <Playlist
          chapters={chapters}
          onVideoClick={this.handleVideoClick}
          onQuizClick={this.handleQuizClick}
          onChallengeClick={this.handleChallengeClick}
        />
      </div>
    );
  }
}
