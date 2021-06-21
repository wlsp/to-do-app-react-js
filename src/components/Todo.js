import React, { Component } from "react";
import TodoItem from "./TodoListItem";

class Todo extends Component {
  state = {
    inputField: "",
    toDoData: [],
  };
  componentDidMount() {
    const data = localStorage.getItem("data");
    if (data !== null) {
      this.setState({ toDoData: JSON.parse(data) });
    }
  }
  componentDidUpdate(prevProps) {
    // Immer wenn sich die Componente ändert wird jetzt localStorage aufgerufen!
    localStorage.setItem("data", JSON.stringify(this.state.toDoData));
  }
  handleInput = e => {
    this.setState({ inputField: e.target.value });
  };

  handleAddNew = e => {
    e.preventDefault();
    this.setState(
      {
        toDoData: [
          ...this.state.toDoData,
          {
            toDoText: this.state.inputField,
            id: Math.floor(Math.random() * 10000),
            isDone: false,
          },
        ],
      },
      () => this.setState({ inputField: "" })
    );
  };
  handleCheckbox = id => {
    let temp = [...this.state.toDoData];
    let temp2 = temp.map(el => {
      if (el.id === id) {
        return {
          ...el,
          isDone: !el.isDone,
        };
      } else {
        return el;
      }
    });
    this.setState({ toDoData: temp2 });
  };

  handleDelete = id => {
    let temp = [...this.state.toDoData];
    let toDoData = temp.filter(el => {
      if (el.id !== id) {
        return el;
      }
    });
    this.setState({ toDoData });
  };
  render() {
    return (
      <div className="to-do-wrapper">
        <h2>My TO-DO-List:</h2>
        <form>
          <input
            type="text"
            onChange={e => this.handleInput(e)}
            value={this.state.inputField}
            name="text"
            className="todo-input"
            placeholder="Add a todo.."
          />
          <button className="todo-button" onClick={this.handleAddNew}>
            Add
          </button>
        </form>
        {this.state.toDoData.map(el =>
          <TodoItem
            data={el}
            key={el.id}
            handleCheckbox={this.handleCheckbox}
            handleDelete={this.handleDelete}
          />
        )}
      </div>
    );
  }
}

export default Todo;
