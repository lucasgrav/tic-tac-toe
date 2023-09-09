import style from "./Switch.module.css";
import { TbRobot, TbRobotOff } from "react-icons/tb";

const Switch = ({ computer, setComputer }) => {
  return (
    <div className={style.switchBot}>
      <label className={style.switch}>
        <input
          type="checkbox"
          checked={computer}
          onChange={() => setComputer(!computer)}
        />
      </label>
      {computer ? (
        <p>
          <TbRobot />
        </p>
      ) : (
        <p>
          <TbRobotOff />
        </p>
      )}
    </div>
  );
};

export default Switch;
