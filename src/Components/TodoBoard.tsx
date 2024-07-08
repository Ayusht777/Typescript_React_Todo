import { Plus ,CircleCheck ,Pencil} from "lucide-react";
import { useState } from "react";
import { SetOnClickProps, Task } from "../lib/TypesTodo";
import AddTaskCard from "./AddTaskCard";

type TaskItemProps = {
  id: number | null;
  taskname: string | null;
  taskdesc: string | null;
  taskstatus: boolean;
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
};

const AddTaskButtonCard = ({ setOnClick }: SetOnClickProps) => {
  return (
    <div className=" aspect-square bg-primary border-2 border-border rounded-xl ">
      <button
        className="size-full flex items-center justify-center"
        onClick={() => setOnClick((prev: boolean) => !prev)}
      >
        <Plus className=" size-16 text-text" />
      </button>
    </div>
  );
};

const TaskItem = ({ id, taskname, taskdesc,taskstatus ,setTaskList}:TaskItemProps ) => {
  const handleTaskStatusChange = () => {
    setTaskList((prevTasks: Task[]) =>
      prevTasks.map((task:Task) =>
        task.id === id ? { ...task, taskstatus: !task.taskstatus } : task
      )
    );
  };
  return (
    <div
      key={id}
      className="aspect-square bg-primary border-2 border-border rounded-xl px-2.5 py-1 group cursor-pointer relative flex items-center flex-col"
    >
      <h1 className="text-text text-3xl w-full overflow-hidden text-ellipsis">
        {taskname}
      </h1>
      <hr className="my-0.5 border-border" />
      <p className="text-text2 group-hover:text-text w-full max-h-min overflow-hidden text-ellipsis">
        {taskdesc}
      </p>
      <div className="w-[calc(100%-10px)]  h-8 absolute bottom-2 px-1">
        <div className="h-full bg-Bg rounded-md border-border flex justify-center items-center gap-x-2">
        <button className={`${taskstatus ? "text-green-500": "text-text2"}`} onClick={handleTaskStatusChange}><CircleCheck/></button>
        <button className={``}><Pencil/></button>
        </div>
      </div>
    </div>
  );
};

const TaskBoard = () => {
  const [isAddTaskCardOpen, setIsAddTaskCardOpen] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<Task[]>([]);

  console.log(taskList);

  return (
    <div className="w-full p-4 relative ">
      <div className="mb-2.5">
        <h1 className="text-3xl font-semibold text-text ">Notes</h1>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-x-3 gap-y-3">
        <AddTaskButtonCard setOnClick={setIsAddTaskCardOpen} />
        {taskList.map((item) => {
          return (
            <TaskItem
              key={item.id}
              id={item.id}
              taskname={item.taskname}
              taskdesc={item.taskdesc}
              taskstatus={item.taskstatus}
              setTaskList={setTaskList}
            />
          );
        })}
      </div>
      {isAddTaskCardOpen ? (
        <AddTaskCard
          setOnClick={setIsAddTaskCardOpen}
          setTaskList={setTaskList}
        />
      ) : null}
    </div>
  );
};

export default TaskBoard;
