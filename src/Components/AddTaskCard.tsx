import { CircleX } from "lucide-react";
import { SetOnClickProps, Task } from "../lib/TypesTodo";
import { useState, useEffect, useRef } from "react";

type AddTaskCardProps = SetOnClickProps & {
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
};

type TaskData = {
  name: string;
  description: string;
};

const AddTaskCard = ({ setOnClick, setTaskList }: AddTaskCardProps) => {
  const [taskData, setTaskData] = useState<TaskData>({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState<TaskData>({ name: "", description: "" });
  const addTaskCardRef = useRef<HTMLDivElement | null>(null);
  const handleAddTask = () => {
    if (taskData.name.trim() !== "" && taskData.description.trim() !== "") {
      setTaskList((prev:Task[]) => [
        ...prev,
        {
          id: prev.length + 1,
          taskname: taskData.name,
          taskdesc: taskData.description,
          taskstatus: false, 
        },
      ]);
      setOnClick(false);
      setTaskData({ name: "", description: "" }); // Reset taskData after adding the task
    } else {
      // Set errors for empty fields
      setErrors({
        name: taskData.name.trim() === "" ? "Name is required" : "",
        description:
          taskData.description.trim() === "" ? "Description is required" : "",
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        addTaskCardRef.current &&
        !addTaskCardRef.current.contains(event.target as Node)
      ) {
        setOnClick(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOnClick]);

  return (
    <div className="w-full right-0 min-h-screen top-0 flex justify-center items-center absolute z-10">
      <div
        className="lg:min-w-[28rem] min-w-[22rem] bg-primary border-2 shadow-[rgba(250,_250,_250,_0.1)_0px_25px_45px_-12px] border-border rounded-xl p-3"
        ref={addTaskCardRef}
      >
        <div className="w-full text-text flex items-center flex-row justify-between">
          <h1 className="text-2xl font-semibold">Create New Task</h1>
          <button onClick={() => setOnClick(false)}>
            <CircleX />
          </button>
        </div>
        <div className="flex flex-col my-4">
          <label className="text-text text-lg mb-1.5">Name</label>
          <input
            type="text"
            className={`py-1 px-1.5 rounded-md bg-inherit border-2   focus:outline-none text-text placeholder:text2 ${
              errors.name !== ""
                ? "focus:border-red-500 border-red-500"
                : "focus:border-text border-border"
            }`}
            placeholder="Task Name"
            value={taskData.name}
            onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
          />
          {errors.name && <span className="text-red-500">{errors.name}</span>}

          <label className="text-text text-lg mb-1.5">Description</label>
          <textarea
            className={`py-1 px-1.5 rounded-md bg-inherit border-2 focus:outline-none text-text placeholder:text2 ${
              errors.name !== ""
                ? "focus:border-red-500 border-red-500"
                : "focus:border-text border-border"
            }`}
            placeholder="Task Description"
            rows={5}
            value={taskData.description}
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
          ></textarea>
          {errors.description && (
            <span className="text-red-500">{errors.description}</span>
          )}

          <button
            className="w-full bg-text mt-4 rounded-md py-1.5 hover:bg-text/90"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskCard;
