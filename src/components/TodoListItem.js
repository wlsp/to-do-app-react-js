import { RiCloseCircleLine } from "react-icons/ri";

const TodoItem = props => {
  return (
    <div
      className="to-do-item"
      style={{ textDecoration: props.data.isDone ? "line-through" : "" }}
    >
      <span>
        {props.data.toDoText}
      </span>
      <div className="icons-wrapper">
        <input
          defaultChecked={props.data.isDone}
          type="checkbox"
          onClick={() => props.handleCheckbox(props.data.id)}
        />
        <RiCloseCircleLine onClick={() => props.handleDelete(props.data.id)} />
      </div>
    </div>
  );
};

export default TodoItem;
