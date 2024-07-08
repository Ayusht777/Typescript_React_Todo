export type SetOnClickProps = {
    setOnClick: React.Dispatch<React.SetStateAction<boolean>>;
  };

  export type Task = {
    id: number | null;
    taskname: string | null;
    taskdesc: string | null;
    taskstatus: boolean;
  };
  