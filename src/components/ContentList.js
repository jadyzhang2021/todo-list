import DeleteMark from "../icon/DeleteMark";
import classes from "./ContentList.module.css";
import EditMark from "../icon/EditMark";
import Mark from "../icon/Mark";
import { useContext } from "react";
import { CartContext } from "../store/context";

const ContentList = ({ onDeleteClick, onEditClick, item }) => {
  const { inputValue: title, selectValue, id } = item;
  const Cartax = useContext(CartContext);

  const onDeleteClickHandler = () => {
    onDeleteClick();
    Cartax.deleteItem(id);
  };

  const onClickHandler = () => {
    if (selectValue === "completed") {
      Cartax.editItem({ ...item, selectValue: "incomplete" });
    } else {
      Cartax.editItem({ ...item, selectValue: "completed" });
    }
  };
  return (
    <div>
      <li className={classes.box}>
        <div className={classes.checkbox}>
          <div className={classes.checkButton} onClick={onClickHandler}>
            {selectValue === "completed" ? <Mark /> : ""}
          </div>

          <div className={classes.item}>
            <p
              className={
                selectValue === "completed"
                  ? classes.titleDelete
                  : classes.title
              }
            >
              {title}
            </p>
            <p>2023.12.12 </p>
          </div>
        </div>
        <div className={classes.svgBox}>
          <DeleteMark
            className={classes.button}
            onClick={onDeleteClickHandler}
          />
          <EditMark className={classes.button} onClick={onEditClick} />
        </div>
      </li>
    </div>
  );
};

export default ContentList;
