import { ChangeEvent, useState } from "react";
import { ITask } from "./Task";
import "./TaskList.css";
interface IProps {
  list: ITask[];
  onEdit: (task: ITask) => void;
  onDelete: (task: ITask) => void;
  onUpdate: (task: ITask) => void;
}
const TaskList = (props: IProps) => {
  const { list } = props;

  // setEditingTaskTitle
  const [editingTask, setEditingTask] = useState<ITask | undefined>({
    id: 0,
    title: "",
  });

  // Function to handle edit task
  const handleEditTask = (task: ITask) => {
    console.log("Edit Task", task);
    props.onEdit(task);
    setEditingTask(task);
  };

  // Function to handle update task change event
  const handleUpdateTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("Update Task change", editingTask);
    if (editingTask) {
      // clone the task object to avoid mutating the original object
      const updatedTask: ITask = {
        ...editingTask,
        title: event.target.value, // Update the task title with the input value
      };
      setEditingTask(updatedTask);
    }
  };

  // Function to handle update task
  const handleUpdateTask = (task: ITask) => {
    console.log("Updated Task", task);
    if (task) {
      // Call the onUpdate function passed from the parent component
      props.onUpdate({ ...task });
    }
    // Reset the editing task state
    setEditingTask(undefined);
  };

  // Function to handle delete task
  const handleDeleteTask = (task: ITask) => {
    console.log("Delete Task", task);
    // Call the onDelete function passed from the parent component
    props.onDelete(task);
  };

  // Function to handle task map
  const handleTaskMap = (task: ITask) => {
    return (
      // Map through the task list and return a table row for each task
      // Using the task ID as the key for each row to avoid React warnings
      // and ensure each task is uniquely identified
      <tr key={task.id}>
        <td>{task.id}</td>
        <td>
          {editingTask?.id === task.id ? (
            // If editingTaskTitle is true, show the input field
            <>
            <div className="update-input-container">

              <span className="editing-task-title">
                <input
                  type="text"
                  name="edit-task"
                  id="edit-task"
                  value={editingTask.title}
                  onChange={handleUpdateTaskChange}
                  placeholder="Edit task title"
                />
              </span>
              <button
                name="update"
                id="update"
                type="button"
                onClick={() => handleUpdateTask(editingTask)}
              >
                Update
              </button>
            </div>
            </>
          ) : (
            // If editingTaskTitle is false, show the task title
            task.title
          )}
        </td>
        {/* Actions */}
        <td className="action-btns">
          {/* Edit */}
          <button
            type="button"
            className="btn-edit"
            name="edit"
            id="edit"
            disabled={editingTask?.id === task.id}
            // Disable the edit button if the task is already being edited
            onClick={() => handleEditTask(task)}
          >
            Edit
          </button>
           {/* Separator */}
          <span className="action-separator" />
          {/* Delete */}
          <button
            type="button"
            className="btn-delete"
            name="delete"
            id="delete"
            disabled={editingTask?.id === task.id}
            // Disable the delete button if the task is already being edited
            onClick={() => handleDeleteTask(task)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };

  return (
    <>
      <h2>Task List</h2>
      {list?.length ? (
        <section className="task-list-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                {/* Action */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{list.map(handleTaskMap)}</tbody>
          </table>
        </section>
      ) : (
        <section className="no-task-list-container">
          <p>No tasks available</p>
        </section>
      )}
    </>
  );
};

export default TaskList;
