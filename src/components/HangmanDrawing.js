import React, { Component, PropTypes } from 'react';
import './HangmanDrawing.css';

class HangmanDrawing extends Component {
  render() {
    return (
      <svg width="500" height="550">
        <polyline points="400,500 100,500 150,500 150,100 320,100 320,150"
                  className="HangmanDrawing-post"/>
        {this._renderBody()}
        {this._renderLeftArm()}
        {this._renderRightArm()}
        {this._renderLeftLeg()}
        {this._renderRightLeg()}
        {this._renderHead()}
      </svg>
    );
  }

  _renderHead() {
    return this.props.body
        ? <circle cx="320" cy="190" r="40" className="HangmanDrawing-head" />
        : null;
  }

  _renderBody() {
    return this.props.body
      ? <line x1="320" y1="190" x2="320" y2="360" className="HangmanDrawing-character" />
      : null;
  }

  _renderLeftArm() {
    return this.props.leftArm
      ? <line x1="320" y1="260" x2="250" y2="230" className="HangmanDrawing-character" />
      : null;
  }

  _renderRightArm() {
    return this.props.rightArm
      ? <line x1="320" y1="260" x2="390" y2="230" className="HangmanDrawing-character" />
      : null;
  }

  _renderLeftLeg() {
    return this.props.leftLeg
      ? <line x1="320" y1="360" x2="250" y2="450" className="HangmanDrawing-character" />
      : null;
  }

  _renderRightLeg() {
    return this.props.rightLeg
      ? <line x1="320" y1="360" x2="390" y2="450" className="HangmanDrawing-character" />
      : null;
  }
}

HangmanDrawing.defaultProps = {
  body: false,
  leftArm: false,
  rightArm: false,
  leftLeg: false,
  rightLeg: false,
};

export default (attemptsLeft) => {
    let props = {
      body: attemptsLeft <= 4,
      leftArm: attemptsLeft <= 3,
      rightArm: attemptsLeft <= 2,
      leftLeg: attemptsLeft <= 1,
      rightLeg: attemptsLeft === 0,
    };
  
    return <HangmanDrawing {...props} />
};
