import { useContext, useState } from "react";
import classes from "./AppContent.module.css";
import ContentList from "./ContentList";
import { CartContext } from "../store/context";
import Notification from "./Notification";
import SuccessMark from "../icon/SucessMark";
import AddTodoModal from "./AddTodoModal";

const AppContent = () => {
  const [isDeleted, setisDeleted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [itemId, setItemId] = useState("");

  const Cartax = useContext(CartContext);
  const filteredItems = Cartax.filteredItems;

  const onDeleteClickHandler = () => {
    setisDeleted(true);
  };

  const onEditHandler = (id) => {
    setItemId(id);
    return setIsEdit(true);
  };
  const closeTodoListHandler = () => {
    return setIsEdit(false);
  };

  return (
    <div className={classes.contentBox}>
      {isEdit && (
        <AddTodoModal
          closeTodoList={closeTodoListHandler}
          isEdit={true}
          itemId={itemId}
        />
      )}

      <ul>
        {filteredItems.length === 0 ? (
          <p className={classes.title}>No Todos</p>
        ) : (
          filteredItems.map((item) => {
            return (
              <ContentList
                // title={item.inputValue}
                // id={item.id}
                key={Math.random()}
                onDeleteClick={onDeleteClickHandler}
                onEditClick={() => onEditHandler(item.id)}
                // selectValue={item.selectValue}
                item={item}
              />
            );
          })
        )}
        {isDeleted && (
          <Notification
            text="Todo Deleted Successfully"
            icon={<SuccessMark />}
            isVisible={true}
            setIsVisible={setisDeleted}
          />
        )}
      </ul>
    </div>
  );
};

export default AppContent;
