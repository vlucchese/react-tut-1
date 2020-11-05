import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function SquareColumnRow(props) {
  return (
    <button className="squareColumnRow" >
      {props.value}
    </button>
  );
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    squares: Array(16).fill(null),
    xIsNext: true,
  };
}

renderSquare(i) {
  return (
    <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />
  );
}

renderSquareColumnRow(i) {
  return (
    <SquareColumnRow
      value={i}
    />
  );
}

render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquareColumnRow(' ')}
          {this.renderSquareColumnRow('a')}
          {this.renderSquareColumnRow('b')}
          {this.renderSquareColumnRow('c')}
          {this.renderSquareColumnRow('d')}
        </div>
        <div className="board-row">
          {this.renderSquareColumnRow('1')}
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
        {this.renderSquareColumnRow(2)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
        {this.renderSquareColumnRow(3)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
        <div className="board-row">
        {this.renderSquareColumnRow(4)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(16).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
      buttonClicked: Array(16).fill(null),
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const buttonClicked = this.state.buttonClicked.slice();

    if (calculateWinner(squares) || squares[i]) {
      console.log(squares[i]);
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    buttonClicked[this.state.stepNumber] = i;
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      buttonClicked : buttonClicked,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move
        + ' '
        + history[move].squares[this.state.buttonClicked[move-1]]
        + ' in '
        + calculateColRow(this.state.buttonClicked[move-1]) :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateColRow(square_select) {
    var myMap = new Map();
    myMap.set(0, 'a-1');
    myMap.set(1, 'b-1');
    myMap.set(2, 'c-1');
    myMap.set(3, 'd-1');
    myMap.set(4, 'a-2');
    myMap.set(5, 'b-2');
    myMap.set(6, 'c-2');
    myMap.set(7, 'd-2');
    myMap.set(8, 'a-3');
    myMap.set(9, 'b-3');
    myMap.set(10, 'c-3');
    myMap.set(11, 'd-3');
    myMap.set(12, 'a-4');
    myMap.set(13, 'b-4');
    myMap.set(14, 'c-4');
    myMap.set(15, 'd-4');
  return myMap.get(square_select);
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],

    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],

    [0, 5, 10, 15],
    [12, 9, 6, 3],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
    && squares[c] === squares[d]) {
      return squares[a];
    }
  }
  return null;
}
