import { useEffect } from "react";
import classes from "./Notitication.module.css";

const Notification = ({
  text,
  icon,
  className,
  showUpSecond,
  isVisible,
  setIsVisible,
}) => {
  useEffect(() => {
    const timeId = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => {
      clearTimeout(timeId);
    };
  }, [showUpSecond, isVisible, setIsVisible]);

  return (
    <div>
      <div className={`${classes.text} ${classes[className]}`}>
        <div style={{ marginRight: "8px" }}> {icon}</div>
        <div style={{ textAlign: "centre" }}>{text}</div>
      </div>
    </div>
  );
};

export default Notification;
