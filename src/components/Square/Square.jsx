import style from "./Square.module.css";

const Square = ({ children, updateBoard, index }) => {
  const handleClick = () => {
    updateBoard(index);
  };
  
  return (
    <div onClick={handleClick} className={style.square}>
    
     
      {children}
  
    </div>
  );
};

export default Square;
