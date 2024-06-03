import { useEffect, useState } from "react";

import { MdClose } from "react-icons/md";
import { AddTaskError } from "../lib/constants";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Link, useHistory } from "react-router-dom";
import CustomButton from "../components/reusable/CustomButton";
import FormField from "../components/reusable/FormField";

enum CustomDate {
  TODAY,
  TOMORROW,
}

export default function AddTask() {
  const history = useHistory();
  const [deadline, setDeadline] = useState<Dayjs | null>(null);

  const [customButtonDate, setCustomButtonDate] = useState<CustomDate | null>(null);
  const [author, setAuthor] = useState("");
  const [taskName, setTaskName] = useState<string>("");
  const [taskNameError, setTaskNameError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);
  const [authorError, setAuthorError] = useState(false);

  const isTaskNameValid = taskName.length >= 3;
  const isAuthorValid = author.length >= 3;
  const isDeadlineValid = deadline !== null;

  function setErrors() {
    setTaskNameError(!isTaskNameValid);
    setAuthorError(!isAuthorValid);
    setDeadlineError(!isDeadlineValid);
  }
  useEffect(() => {
    setTaskNameError(taskName.length > 0 && !isTaskNameValid);
    setAuthorError(author.length > 0 && !isAuthorValid);
  }, [taskName, author]);

  useEffect(() => {
    if (customButtonDate === null) {
      setDeadline(null);
    } else {
      setDeadline(customButtonDate === CustomDate.TODAY ? dayjs() : dayjs().add(1, "day"));
      setDeadlineError(false);
    }
  }, [customButtonDate]);

  async function addNewTaskToServer() {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify({
        title: taskName,
        author,
        deadline: deadline?.toString(),
      }),
    });

    return response;
  }

  async function handleSaveClick() {
    if (isTaskNameValid && isAuthorValid && isDeadlineValid) {
      const response = await addNewTaskToServer();

      if (response.ok) {
        history.push("/");
      }
    } else {
      setErrors();
    }
  }
  function handleCustomButtonClick(date: CustomDate) {
    setCustomButtonDate((prevValue) => (prevValue === date ? null : date));
  }
  return (
    <section>
      <div className="flex justify-between items-center p-4">
        <Link to="/">
          <MdClose size={24} />
        </Link>

        <h1 className="text-xl">Create new task</h1>
        <button className="text-primary font-bold" onClick={handleSaveClick}>
          Save
        </button>
      </div>
      <form className="flex flex-col gap-10 my-6 px-5">
        <FormField
          label="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          error={taskNameError && AddTaskError.TASK_NAME}
        />
        <FormField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          error={authorError && AddTaskError.AUTHOR}
        />

        <div>
          <CustomButton
            isActive={customButtonDate === CustomDate.TODAY}
            onClick={() => handleCustomButtonClick(CustomDate.TODAY)}
          >
            Today
          </CustomButton>
          <CustomButton
            isActive={customButtonDate === CustomDate.TOMORROW}
            onClick={() => handleCustomButtonClick(CustomDate.TOMORROW)}
          >
            Tomorrow
          </CustomButton>
        </div>
        <p>or select your date</p>
        <DatePicker
          value={customButtonDate !== null ? null : deadline}
          onChange={(date) => {
            setDeadline(date);
          }}
          onOpen={() => setCustomButtonDate(null)}
          format="DD/MM/YYYY"
        />
        {deadlineError && <p>{AddTaskError.DEADLINE}</p>}
      </form>
    </section>
  );
}
