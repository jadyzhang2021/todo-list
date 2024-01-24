import { createContext, useEffect, useReducer, useState } from "react";

export const CartContext = createContext({
  items: [],
  filteredItems: [],
  addItems: () => {},
  deleteItem: () => {},
  editItem: () => {},
  deleteAllItems: () => {},
  filterItems: () => {},
  isSubmit: "",
  setIsSubmit: () => {},
  isSubmitError: "",
  setIsSubmitError: () => {},
});

const todoItemsReducer = (state, action) => {
  if (action.type === "GET_ITEM") {
    const items = action.items;
    return { ...state, items: items };
  }

  if (action.type === "ADD_ITEM") {
    const items = [...state.items];
    const actionItems = [...action.items];
    const updatedItems = items.concat(actionItems);
    localStorage.setItem("Items", JSON.stringify(updatedItems));
    return { ...state, items: updatedItems, filteredItems: updatedItems };
  }

  if (action.type === "DELETE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.id
    );

    updatedItems.splice(updatedItemIndex, 1);
    localStorage.setItem("Items", JSON.stringify(updatedItems));
    return { ...state, items: updatedItems, filteredItems: updatedItems };
  }

  if (action.type === "EDIT_ITEM") {
    const updatedItems = [...state.items];
    console.log({ action });
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.item.id
    );
    const item = updatedItems[updatedItemIndex];

    item.inputValue = action.item.inputValue;
    item.selectValue = action.item.selectValue;
    localStorage.setItem("Items", JSON.stringify(updatedItems));
    return { ...state, items: updatedItems, filteredItems: updatedItems };
  }

  if (action.type === "FILTER_ITEM") {
    const updatedItems = [...state.items];

    if (action.status === "incomplete") {
      const items = updatedItems.filter(
        (item) => item.selectValue === "incomplete"
      );
      return { ...state, filteredItems: items };
    } else if (action.status === "completed") {
      const items = updatedItems.filter(
        (item) => item.selectValue === "completed"
      );
      return { ...state, filteredItems: items };
    } else {
      return { ...state, filteredItems: updatedItems };
    }
  }

  return state;
};

const CartContextProvider = ({ children }) => {
  const [isSubmit, setIsSubmit] = useState("");
  const [isSubmitError, setIsSubmitError] = useState("");
  const [todoItems, todoItemsDispatch] = useReducer(todoItemsReducer, {
    items: [],
    filteredItems: [],
  });

  function addItemHandler(items) {
    todoItemsDispatch({
      type: "ADD_ITEM",
      items: items,
    });
  }

  function deletItemHandler(id) {
    todoItemsDispatch({ type: "DELETE_ITEM", id: id });
  }

  function editItemHandler(item) {
    todoItemsDispatch({
      type: "EDIT_ITEM",
      item,
    });
  }

  function filterItemsHandler(status) {
    todoItemsDispatch({
      type: "FILTER_ITEM",
      status,
    });
  }

  function getItemsHandler(items) {
    todoItemsDispatch({
      type: "GET_ITEM",
      items,
    });
  }

  useEffect(() => {
    const storedItems = localStorage.getItem("Items");
    if (storedItems) {
      getItemsHandler(JSON.parse(storedItems));
    }
  }, []);

  const ctxValue = {
    items: todoItems.items,
    filteredItems: todoItems.filteredItems,
    addItems: addItemHandler,
    deleteItem: deletItemHandler,
    editItem: editItemHandler,
    filterItems: filterItemsHandler,
    isSubmit: isSubmit,
    setIsSubmit: setIsSubmit,
    isSubmitError: isSubmitError,
    setIsSubmitError: setIsSubmitError,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
