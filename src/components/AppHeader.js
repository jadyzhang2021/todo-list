import AddTodoModal from "./AddTodoModal";
import classes from "./AppHeader.module.css";
import Notification from "./Notification";
import SuccessMark from "../icon/SucessMark";
import Button from "./Button";
import WrongMark from "../icon/WrongMark";

import { useState, useContext, useEffect } from "react";
import { CartContext } from "../store/context";

const AppHeader = () => {
  const [todoVisable, setTodoVisable] = useState(false);
  const [status, setStatus] = useState("all");
  const Cartax = useContext(CartContext);
  const items = Cartax.items;

  useEffect(() => {
    Cartax.filterItems(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const openTodoList = () => {
    return setTodoVisable(true);
  };

  const closeTodoListHandler = () => {
    return setTodoVisable(false);
  };

  const filterByStatus = (e) => {
    const status = e.target.value;
    setStatus(status);
    Cartax.filterItems(status);
  };

  return (
    <div>
      {todoVisable && (
        <AddTodoModal
          closeTodoList={closeTodoListHandler}
          // onAddSuccesNotification={onSuccesHandler}
          // onEmptyTextNotificiation={onEmptyHandler}
          isEdit={false}
        />
      )}

      <div className={classes.container}>
        <h1 className={classes.title}>TODO LIST</h1>
        <div className={classes.header}>
          <Button className="addButton" type="button" onClick={openTodoList}>
            Add Task
          </Button>
          <select onChange={filterByStatus} value={status}>
            <option value="all">All</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {Cartax.isSubmit && (
          <Notification
            text={Cartax.isSubmit}
            icon={<SuccessMark />}
            isVisible={true}
            setIsVisible={Cartax.setIsSubmit}
          />
        )}
        {Cartax.isSubmitError && (
          <Notification
            text={Cartax.isSubmitError}
            icon={<WrongMark />}
            isVisible={true}
            setIsVisible={Cartax.setIsSubmitError}
          />
        )}
      </div>
    </div>
  );
};

export default AppHeader;
