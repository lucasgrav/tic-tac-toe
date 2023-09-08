import style from "./SquareTourns.module.css";
const Square = ({ children, isSelected }) => {
 
  const styleFunction = () => {
    if (isSelected) {
      return style.squareSelected;
    } else {
      return style.square;
    }
  };

  const className = styleFunction();
  return (
    <div  className={className}>
      {children}
    </div>
  );
};

export default Square;
