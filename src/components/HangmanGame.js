import React, {Component} from 'react'
import dictionary from './Dictionary'
import hangmanDrawing from './HangmanDrawing';
import './HangmanGame.css';

// STILL HAVE TO:
// > SORT GUESSED LETTERS BY CORRECT AND INCORRECT (PROBABLY ONLY USE THE LATTER)
// > STOP THE GAME WHEN PLAYER HAS LOST OR WON

class HangmanGame extends Component {

  // Default properties for this component
  static defaultProps = {
    maxWrongGuesses: 6
  }

  // Initial states for the game
  constructor(props) {
    super(props);
    this.state = {
      secretWord: randomWord(),
      numberOfWrongGuesses: 0,
      guessed: new Set([])
    }
  }

  // Guessing zone
  generateGuessingZone() {
    // A local const for the broken-up secret word
    let secretWordUpper = this.state.secretWord.toUpperCase().split("");
    // Make a button for each constituent letter
    return secretWordUpper.map(letter => (
      <button className="purple-square">
        {this.state.guessed.has(letter)? letter: ' '}
      </button>
    ));
  }

  // Alphabetical buttons
  generateKeyboard() {
    // A local const for the broken-up alphabet
    let letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
    // Make a button for each constituent letter
    return letters.map(letter => (
      <button 
        className="yellow-square"
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        style={this.state.guessed.has(letter) ? {background:'red'} : {} }
        // disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  // Put clicked letters into the guessed array
  handleGuess = e => {
    // Determine the letter being guessed
    let letter = e.target.value;
    let adder = this.state.secretWord.toUpperCase().includes(letter) ? 0 : 1;
    // Update some states based on this letter guess
    this.setState(st => ({
      // Add this letter to the list of guessed letters
      guessed: st.guessed.add(letter),
      // Possibly update the wrong guess counter
      numberOfWrongGuesses: st.numberOfWrongGuesses + adder
    }))
  }

  // Reset the game
  resetButton = () => {
    this.setState({
      secretWord: randomWord(),
      numberOfWrongGuesses: 0,
      guessed: new Set([])
    })
  }

  // This is the game itself
  render() {
    // Game is lost if too many mistakes are made
    const gameLost = this.state.numberOfWrongGuesses >= this.props.maxWrongGuesses;
    // Game is won if every letter is correctly guessed
    // const gameWon = [...this.state.guessed].join("") === this.state.secretWord.toUpperCase();
    const gameWon = checkAllLettersHaveBeenGuessed(this.state.guessed,this.state.secretWord);
    // const gameWon = numberOfLettersLeftToFind === 0? true : false;
    // Input-output button clicker
    let guessingZone = this.generateGuessingZone();
    // Input-output button clicker
    let alphabetClicker = this.generateKeyboard();
    // The correct answer written in a string
    let answerMessage = "Correct answer: " + this.state.secretWord;
    // Messages when the game ends
    let endOfGame = '';
    if(gameWon) {
      endOfGame = "Winner winner!"
    }
    if(gameLost) {
      endOfGame = "Ya lost m8."
    }

    // This is what's displayed on the browser
    return (
      <div className="hangman-container">
        <div className="hangman-heading">
          Hangman app
        </div>
        <div className="hangman-body">
          <div classname="hangman-controls">
            <br/>
            {guessingZone}
            <br/><br/><br/>
            <h1 className="message">
              Wrong guesses: {this.state.numberOfWrongGuesses} of {this.props.maxWrongGuesses}
            </h1>
            <br/>
            <p>
              {alphabetClicker}
            </p>
            <button className="reset-button" onClick={this.resetButton}>
              Reset
            </button>
          </div>
          <div classname="hangman-consequences">
            <div className="hangman-drawing">
              {hangmanDrawing(5-this.state.numberOfWrongGuesses)}
            </div>
            <div className="messages">
              <div className="message">
                <p>
                  {[...this.state.guessed]}
                  {/* {this.state.secretWord.map(letter => ([...this.state.guessed].has(letter)? letter: ' '))} */}
                </p>
              </div>
              <div className="message">
                <p>
                  {gameLost ? answerMessage : ''}
                </p>
              </div>
              <div className="message">
                <p>
                  {endOfGame}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

// Generate a random index from dictionary
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Generate a random word from the dictionary
function randomWord() {
  var dictionaryLength = dictionary.length;
  var randomIndex = getRandomInt(dictionaryLength);
  return dictionary[randomIndex];
}

// 
function checkAllLettersHaveBeenGuessed(guessed,secretWord) {
  for (var i=0; i<secretWord.length; i++) {
    var letter = secretWord[i];
    // check if letter is in "guessed" set -- if it isn't, add to the counter
    if(!guessed.has(letter)) {
      return false;
    }
  }
  return true;
}

export default HangmanGame;