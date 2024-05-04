import "./widgetbox.scss";
import { IoIosTrendingDown } from "react-icons/io";
import { IoIosTrendingUp } from "react-icons/io";

interface Widgetprops {
  name: string;
  value: number;
  amount: boolean;
  percentage: number;
  color: string;
}
function WidgetBox({ name, value, amount, percentage, color }: Widgetprops) {
  return (
    <div className="widgetbox">
      <div className="left">
        <p className="name">{name}</p>
        <h3>{amount ? `$${value}` : value}</h3>
        {percentage > 0 ? (
          <p className="green">
            <IoIosTrendingUp /> {`+ ${percentage}%`}
          </p>
        ) : (
          <p className="red">
            <IoIosTrendingDown /> {`${percentage}%`}
          </p>
        )}
      </div>

      <div
        className="right"
        style={{
          color,
          background: `conic-gradient(${color} ${
            (Math.abs(percentage) * 360) / 100
          }deg, white 0)`,
        }}
      >
        <div className="percentage">
          {percentage > 0 ? `+ ${percentage}%` : `${percentage}%`}
        </div>
      </div>
    </div>
  );
}

export default WidgetBox;
