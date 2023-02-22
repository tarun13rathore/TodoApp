import React, { useState, useEffect } from "react";
import "./Todo.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (inputValue) {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
        isChecked: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleEditTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const handleClearLocalStorage = () => {
    setTodos([]);
  };

  // const onChecked = (id) => {
  //   const arr = todos.map((todo) => {
  //     if (todo.isChecked === false) {
  //       let r = [...todo];
  //       r.push([todo.id]);
  //       console.log("r", r);
  //     }
  //     return todo;
  //   });
  //   console.log("arr", arr);
  // };

  return (
    <>
      <div className="mainDiv">
        <div className="main">
          <h1 className="heading">Add Your Today & Tomorrow Plan</h1>
          <form className="form_st" onSubmit={handleAddTodo}>
            <div className="form_st1">
              <input
                className="td_field"
                placeholder="✍ Add Items..."
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
              <button className="add" type="submit">
                Add
              </button>
            </div>
          </form>
          <div className="data">
            <div>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onEdit={handleEditTodo}
                  onDelete={handleDeleteTodo}
                  // onClear={onChecked}
                />
              ))}
              {todos.length !== [] ? (
                <>
                  <button
                    className="add"
                    onClick={() => {
                      handleClearLocalStorage();
                    }}
                  >
                    Delete All Item
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TodoItem = ({ todo, onEdit, onDelete, onClear }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(todo.id, editedText);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedText(todo.text);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(todo.id);
  };

  return (
    <>
      {isEditing ? (
        <>
          <div className="data_value">
            <input
              className="td_field"
              type="text"
              value={editedText}
              onChange={(event) => setEditedText(event.target.value)}
            />
            <button className="add" onClick={handleSaveClick}>
              Save
            </button>
            <button className="add" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="data_value">
            {/* <input
              type="checkbox"
              className="checkBox"
              onClick={() => onClear(todo.id)}
            ></input> */}
            <span className="data_value1">{todo.text}</span>
            <button className="add" onClick={handleEditClick}>
              Edit
            </button>
            <button className="add" onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default TodoApp;
