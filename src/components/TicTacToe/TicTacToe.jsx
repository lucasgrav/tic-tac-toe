import style from "./TicTacToe.module.css";
import useTicTacToe from "./useTicTacToe";
import Square from "../Square/Square";
import SquareTourns from "../Square/SquareTourns";
import ModalWinner from "../Modal/ModalWinner";
import { AiOutlineReload, AiOutlineRobot } from "react-icons/ai";

import { GiTicTacToe } from "react-icons/gi";
import { motion } from "framer-motion";
import Switch from "../Switch/Switch";

const TicTacToe = () => {
  const { TURNS, updateBoard, winner, board, resetGame, turn, computer, setComputer } = useTicTacToe();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <main className={style.board}>
        <div className={style.tittle}>
          <h2>
            <GiTicTacToe />
          </h2>
        </div>

        <div className={style.containerGame}>
          {/* SE RENDERIZAN LOS SQUARES (CUBOS O CASILLAS)*/}
       
            <Switch computer={computer} setComputer={setComputer} />
          
          <section className={style.game}>
            {board.map((square, index) => {
              return (
                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                  children={square}
                />
              );
            })}
          </section>
          {/* BOTON PARA RESETEAR EL GAME */}
          <button onClick={resetGame}>
            <AiOutlineReload />
          </button>
        </div>

        {/* MENSAJE DEL GANADOR O EL EMPATE */}
        <ModalWinner winner={winner} resetGame={resetGame} />
        <section className={style.containerTurns}>
          <SquareTourns isSelected={turn === TURNS.X}>{TURNS.X}</SquareTourns>
          <SquareTourns isSelected={turn === TURNS.O}>{TURNS.O}</SquareTourns>
        </section>
      </main>
    </motion.div>
  );
};

export default TicTacToe;
