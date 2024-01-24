import Button from "./Button";
import classes from "./AddTodoModal.module.css";
import ReactDOM from "react-dom";
import React, { useContext, useRef } from "react";
import { CartContext } from "../store/context";

const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};
const AddTodo = ({ isEdit, closeTodoList, itemId }) => {
  const Cartax = useContext(CartContext);

  const selectRef = useRef();
  const inputRef = useRef();

  const updatedItemIndex = Cartax.items.findIndex((item) => item.id === itemId);
  const item = Cartax.items[updatedItemIndex];

  function onSubmitHandler() {
    // event.preventDefault();
    const selectValue = selectRef.current.value;
    const inputValue = inputRef.current.value;

    if (inputValue.trim() !== "") {
      if (isEdit) {
        if (
          item.inputValue === inputValue &&
          item.selectValue === selectValue
        ) {
          return Cartax.setIsSubmitError("NO Change Made");
        } else {
          const items = { selectValue, inputValue, id: itemId };
          Cartax.editItem(items);
          closeTodoList();
          return Cartax.setIsSubmit("Task Updated Successfully");
        }
      } else {
        const item = {
          inputValue,
          selectValue,
          id: Math.random(),
        };
        const items = [item];
        Cartax.addItems(items);
        Cartax.setIsSubmit("Task Added Successfully");
        closeTodoList();
      }
      //enteredItems not empty will transfer
    } else {
      Cartax.setIsSubmitError("Please enter a title.");
    }
  }

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      onSubmitHandler();
    }
  };
  return (
    <div>
      <div className={classes.addBox}>
        <button className={classes.close} onClick={closeTodoList}>
          X
        </button>
        <h2>{isEdit ? "Update ToDo" : "Add ToDo"}</h2>
        <form>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            ref={inputRef}
            defaultValue={isEdit ? item.inputValue : ""}
            onKeyDown={onKeyDownHandler}
          />
          <label htmlFor="status">Status</label>
          <select
            id="status"
            className={classes.status}
            ref={selectRef}
            defaultValue={isEdit ? item.selectValue : "incomplete"}
          >
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
          <div>
            <Button className="addBut" type="submit" onClick={onSubmitHandler}>
              {isEdit ? "Update Task" : "Add Task"}
            </Button>
            <Button className="cancelBtn" onClick={closeTodoList}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AddTodoModal = ({
  closeTodoList,
  onAddSuccesNotification,
  onEmptyTextNotificiation,
  isEdit,
  itemId,
}) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <AddTodo
          closeTodoList={closeTodoList}
          onAddSuccesNotification={onAddSuccesNotification}
          onEmptyTextNotificiation={onEmptyTextNotificiation}
          isEdit={isEdit}
          itemId={itemId}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default AddTodoModal;
