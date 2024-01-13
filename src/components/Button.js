import classes from "./Button.module.css";

const Button = ({ type, children, className, ...rest }) => {
  return (
    <div
      type={type === "submit" ? "submit" : "button"}
      className={`${classes.button} ${classes[className]}`}
      {...rest}
    >
      {children}
    </div>
  );
};
export default Button;
