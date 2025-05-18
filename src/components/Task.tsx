import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./Task.css";
export interface ITask {
  id: number;
  title: string;
}
const Task = () => {
  // State to hold the list of tasks
  const [taskList, setTaskList] = useState<ITask[]>([]);

  // Function to add a new task
  const addNewTask = (value: string) => {
    const newTask: ITask = {
      id: taskList.length + 1,
      title: value,
    };
    // check if the task already exists
    const taskExists = taskList.some((task) => task.title === value);
    if (taskExists) {
      alert("Task already exists");
      return;
    }
    setTaskList([...taskList, newTask]);
  };

  // Function to delete a task
  const deleteTask = (toBeDeletedTask: ITask) => {
    const updatedTaskList = taskList.filter(
      (task) => task.id !== toBeDeletedTask.id
    );
    setTaskList(updatedTaskList);
  };

  // Function to handle sending the edit value to child component
  // State to track the task being edited
  //const [editingTaskTitle, setEditingTaskTitle] = useState<string>("");

  // Function to edit a task
  const editTask = (toBeEditedTask: ITask) => {
    const clonedTaskList = [...taskList];
    const task = clonedTaskList.find((task) => task.id === toBeEditedTask.id);
    if (task) {
      const updatedTaskList = clonedTaskList.map((t) =>
        t.id === task.id ? { ...t, title: task.title } : t
      );
      setTaskList(updatedTaskList);
    }
  };

  // Function to handle the updated task value
  const updateTask = (task: ITask) => {
    // Update the task title in the task list using map
    const clonedTaskList = [...taskList];
    const updatedTaskList = clonedTaskList.map((t) =>
      t.id === task.id ? { ...t, title: task.title } : t
    );
    setTaskList(updatedTaskList);
  };

  return (
    <>
      <div className="header-container">
        <h1>Task Management</h1>
      </div>

      <div className="task-container">
        <div className="task-form">
          <TaskForm onAdd={addNewTask} />
        </div>
        <div className="task-list">
          <TaskList
            list={taskList}
            onDelete={deleteTask}
            onEdit={editTask}
            onUpdate={updateTask}
          />
        </div>
      </div>
    </>
  );
};

export default Task;
