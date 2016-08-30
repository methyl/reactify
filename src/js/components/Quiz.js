import React, { Component, PropTypes } from 'react';

function checkQuestionValidity(question, answer) {
  return question.correctChoice === answer
}


class Question extends Component {
  initialState = {
    selectedQuestion: -1,
    status: 'pending'
  }

  state = this.initialState

  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleQuestionSelect = this.handleQuestionSelect.bind(this)
  }

  componentWillReceiveProps() {
    this.setState(this.initialState)
  }

  handleFormSubmit(e) {
    e.preventDefault()
    if (this.isLocked()) {
      this.props.onProceed()
    } else {
      const isValid = checkQuestionValidity(this.props, this.state.selectedQuestion)
      const status = isValid ? 'valid' : 'invalid'
      this.setState({ status })
    }
  }

  handleQuestionSelect(event) {
    const question = Number(event.target.value)
    this.setState({ selectedQuestion: question })
  }

  isLocked() {
    return this.state.status !== 'pending'
  }

  renderStatus() {
    if (this.isLocked()) {
      return (
        <div>
          {
            this.state.status === 'valid'
              ? 'Yes, this is a correct answer'
              : 'You made a wrong choice'
          }
        </div>
      )
    }
  }

  renderSubmitButton() {
    if (this.isLocked()) {
      return (
        <button>Next question</button>
      )
    } else {
      return (
        <button>Submit answer</button>
      )
    }
  }

  render() {
    return (
      <div>
        <h2>{this.props.question}</h2>
        {this.renderStatus()}
        <form onSubmit={this.handleFormSubmit}>
          {this.renderChoices()}
          {this.renderSubmitButton()}
        </form>
      </div>
    )
  }

  renderChoices() {
    return this.props.choices.map((choice, i) => (
      <li key={i}>
        {choice}
        <input disabled={this.isLocked()} type="radio" name="choice" value={i} onClick={this.handleQuestionSelect} />
      </li>
    ))
  }
}

class ProgressBar extends Component {
  getFillingPercentage() {
    return (this.props.current / this.props.total) * 100
  }

  render() {
    return (
      <div className="progress-bar">
        <div className="progress-bar--progress" style={this.style()} />
      </div>
    )
  }

  style() {
    return {
      width: `${this.getFillingPercentage()}%`
    }
  }
}

export default class Quiz extends Component {
  constructor(props) {
    super(props)
    this.handleProceed = this.handleProceed.bind(this)
  }

  state = {
    currentQuestion: 0
  }

  handleProceed() {
    this.setState({ currentQuestion: this.state.currentQuestion + 1 })
  }

  isFinished() {
    return this.state.currentQuestion === this.props.quiz.length
  }

  renderQuiz() {
    return (
      <Question {...this.props.quiz[this.state.currentQuestion]} onProceed={this.handleProceed} />
    )
  }

  renderFinishPage() {
    return (
      <div>
        Good job! You scored ...
        <button onClick={this.props.onQuizFinish}>Proceed</button>
      </div>
    )
  }

  render() {
    return (
      <div className="quiz">
        <ProgressBar total={this.props.quiz.length} current={this.state.currentQuestion} />
        {this.isFinished() ? this.renderFinishPage() : this.renderQuiz()}
      </div>
    );
  }
}
