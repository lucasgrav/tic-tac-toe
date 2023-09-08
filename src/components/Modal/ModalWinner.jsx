import style from "./Modal.module.css";
import {AiOutlineReload} from "react-icons/ai"
import { motion } from "framer-motion";
const ModalWinner = ({ winner, resetGame}) => {
  return (
    <>
      {winner !== null && (
        <section className={style.msgContainer}>
          <div className={style.msgCard}>
            <h2>{winner === false ? "¡It's a tie!" : `¡${winner} WON!`}</h2>
            <button onClick={resetGame}><AiOutlineReload/></button>
          </div>
        </section>
        
      )}
    </>
  );
};

export default ModalWinner;
