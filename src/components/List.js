import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const List = () => {
  const [todo, setTodo] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggle, setToggle] = useState(true);
  const [isEdit, setIsEdit] = useState(null);

  const addSubmit = (e) => {
    setTodo(e.target.value);
  };

  const addKeyPress = (e) => {
    if (e.key === "Enter") {

      if (!todo) return;

      else if (todo && !toggle) {
        const updatedList = items.map((item) => {
          if (item.id === isEdit) return { ...item, name: todo };
          return item;
        });
        setItems(updatedList);
        setToggle(true);
        setTodo("");
        setIsEdit(null);
      } else {
        const taskName = {
          id: new Date().getTime().toString(),
          name: todo,
        };
        setItems([taskName, ...items]);
        setTodo("");
      }
    }
  };
  const addBtn = () => {
    if (!todo) return alert("Please add a task!");

    else if (todo && !toggle) {
      const updatedList = items.map((item) => {
        if (item.id === isEdit) return { ...item, name: todo };
        return item;
      });

      setItems(updatedList);
      setToggle(true);
      setTodo("");
      setIsEdit(null);
    } else {
      const taskName = { id: new Date().getTime().toString(), name: todo };
      setItems([taskName, ...items]);
      setTodo("");
    }
  };

  const deleteItems = (index) => {
    const newList = items.filter((item)=>index !== item.id);
    setItems(newList);
  };

  const editItems = (id) => {
    const editItem = items.find((item)=>id === item.id);
    setToggle(false);
    setTodo(editItem.name);
    setIsEdit(id);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <div className="container">
      <div className="box">
        <h1 className="heading">Todo list</h1>
        <input
          type="text"
          placeholder="Enter Your Task"
          value={todo}
          onKeyDown={addKeyPress}
          onChange={addSubmit}
        />
        {toggle ? (
          <button onClick={addBtn}>+</button>
        ) : (
          <button>
            <EditIcon onClick={addBtn} />
          </button>
        )}

        <ol className="sub-container">
          {items.map((item) => {
              const {id, name} = item;
            return (
              <div className="todo" key={id}>
                <DeleteIcon
                  className="deleteIcon icon"
                  onClick={() => deleteItems(id)}
                />
                <EditIcon
                  className="deleteIcon icon"
                  onClick={() => editItems(id)}
                />
                <li className="task-name">{name}</li>
              </div>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default List;
