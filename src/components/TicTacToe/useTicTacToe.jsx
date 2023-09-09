import { useState } from "react";
import confetti from "canvas-confetti";

const useTicTacToe = () => {
  const [computer, setComputer] = useState(false);

  // TURNO CORRESPONDIENTE
  const TURNS = {
    X: "X",
    O: "O",
  };

  // TODOS LOS COMBOS POSIBLES PARA GANAR
  const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // BOARD INICIAL, CON ESTO RENDERIZA LOS CUBOS, TAMBIEN REVISO SI HAY UNA PARTIDA EN EL LOCAL STORAGE
  const [board, setBoard] = useState(Array(9).fill(null));

  // TURNOS CORRESPONDIENTES, REVISO EN EL LOCAL STORAGE SI HAY ALGUN TURNO GUARDADO
  const [turn, setTurn] = useState(TURNS.X);

  //ESTADO LOCAL QUE GUARDA SI HAY UN GANADOR
  const [winner, setWinner] = useState(null);

  //FUNCION PARA CHEQUEAR SI HAY UN GANADOR USANDO EL ARRAY DE COMBOS, RETORNA EL BOARD GANADOR, SINO RETORNA NULL
  const checkWinner = (boardToCheck) => {
    for (const combo of COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  //CHECKEA SI EL JUEGO TERMINO Y NO HAY GANADOR
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  //FUNCION PARA IR ACTUALIZANDO EL BOARD
  const updateBoard = async (index) => {
    //! CHEQUEO QUE ESTE ENCENDIDO EL JUGAR CONTRA EL "BOT" Y NO VA A PODER CLICKEAR EL TURNO DEL BOT
    if (computer && turn === TURNS.O) return;

    //! SI EL SQUARE CONTIENE ALGO O SI HAY UN GANADOR NO PERMITE VOLVER A REESCRIBIR
    if (board[index] || winner) return;

    const newBoard = [...board];

    //! COLOCO EL TURNO CORRESPONDIENTE EN EL SQUARE DEL BOARD CORRESPONDIENTE
    newBoard[index] = turn;

    //! ACTUALIZO EL BOARD
    setBoard(newBoard);

    //! CAMBIO DE TURNO
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //! CHEQUEO SI HAY UN GANADOR O SI HAY EMPATE
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    } else {
      if (computer) {
        await new Promise((resolve) =>
          setTimeout(() => {
            tournComputer(newTurn, newBoard);
            resolve();
          }, 500)
        );
      }
    }
  };


// FUNCION CON LA LOGICA DEL "BOT"
  const tournComputer = (newTurn, board) => {
    const emptySquares = board.reduce((acc, value, index) => {
      if (!value) {
        acc.push(index);
      }
      return acc;
    }, []);
    let indexRandom;
    let posibilities = [];

    do {
      indexRandom = Math.floor(Math.random() * 9);
      posibilities = emptySquares.find((index) => index === indexRandom);
    } while (posibilities === undefined);

    const newBoard = [...board];
    newBoard[indexRandom] = newTurn;
    setBoard(newBoard);
    const newTurnComputer = newTurn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurnComputer);

    indexRandom = null;
    posibilities = [];

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  // FUNCION PARA RESETEAR EL JUEGO
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  return {
    TURNS,
    updateBoard,
    winner,
    board,
    resetGame,
    turn,
    setComputer,
    computer,
  };
};
export default useTicTacToe;
