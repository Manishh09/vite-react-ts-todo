import { ChangeEvent, useState } from "react";
import "./TaskForm.css";
 interface IProps {
  onAdd(value: string): void;
}
const TaskForm = (props: IProps) => {
  // State to hold the input value
  const [value, setValue] = useState<string>("");

  // // This effect will run whenever toBeEditedTask changes
  // useEffect(() => {
  //   if (props.toBeEditedTask) {
  //     setValue(props.toBeEditedTask);
     
  //   } else {
  //     // Reset form when toBeEditedTask is null
  //     setValue("");
  //    }
  // }, [props.toBeEditedTask]);



  // Function to handle input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // Function to handle form submission
  const handleAddTask = () => {
    console.log("Add Task:", value);
    props.onAdd(value); // Call the onAdd function passed from the parent component
    setValue(""); // Empty the State
  };

  return (
    <>
      <h2>Add Task: {value}</h2>
      <section className="input-container">
        <form>
          <label htmlFor="task" hidden>
            Task
          </label>
          <input
            className="input_task"
            id="task"
            name="task"
            type="text"
            placeholder="Enter your task"
            title="Task input"
            onChange={handleChange}
            value={value}
          />
        </form>
        <div className="actions">
          <button
            type="submit"
            className="btn-add"
            onClick={handleAddTask}
            disabled={!value}
          >
            Add
          </button>
          <button
            type="reset"
            className="btn-clear"
            onClick={() => setValue("")}
            disabled={!value}
          >
            Clear
          </button>
        </div>
      </section>
    </>
  );
};
export default TaskForm;
