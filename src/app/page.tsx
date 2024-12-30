"use client";

import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<{ text: string; completed: boolean; completedAt?: string }[]>(
    []
  );

  const [input, setInput] = useState("");
  const [warning, setWarning] = useState("");
  const [editIndex, setEditIndex] = useState();
  console.log("editIndex", editIndex);
  const addTask = () => {
    // IF EDITINDEX IS TRUE
    // EDIT ARRAY ITEM WITH EDITINDEX
    // .....CODE....
    // RETURN NULL
    // if false continue
    if (editIndex !== undefined && editIndex !== null) {
      const updatedTasks = tasks.map((task, taskid) =>
        taskid === editIndex ? { ...task, text: input } : task
      );
      setTasks(updatedTasks);
      return;
    }
    const newTask = input.trim();

    if (newTask === "") {
      setWarning("Task cannot be empty!");
      return;
    }

    const isDuplicate = tasks.some((task) => task.text === newTask);
    if (isDuplicate) {
      setWarning("Duplicate task detected!");
      return;
    }

    setTasks([...tasks, { text: newTask, completed: false }]);
    setInput("");
    setWarning("");
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index
        ? {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toLocaleString() : undefined,
          }
        : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const pendingTasks = tasks.filter((task) => !task.completed);
  const doneTasks = tasks.filter((task) => task.completed);
  // condion ? true: false
  return (
    <div className='min-h-screen flex flex-col items-center p-8'>
      <h1 className='text-2xl font-bold mb-4'>To-Do List</h1>

      {}
      <div className='flex gap-2 mb-4'>
        <input
          className='border p-2 rounded'
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Add a new task...'
        />
        <button
          className={`${
            editIndex === undefined || editIndex === null
              ? "bg-green-500"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white p-2 rounded`}
          onClick={addTask}
        >
          {editIndex !== undefined && editIndex !== null ? "Save" : "Add"}
        </button>
      </div>

      {}
      {warning && <p className='text-red-500 italic mb-4'>{warning}</p>}

      {}
      <div className='flex w-full max-w-md mb-8'>
        <div className='w-full'>
          <h2 className='text-xl font-semibold mb-4'>Pending Tasks</h2>
          <ul className='list-none'>
            {pendingTasks.map((task, index) => (
              <li key={index} className='flex justify-between items-center border-b p-2'>
                <span>{task.text}</span>
                <div className='flex gap-2'>
                  <button
                    className='bg-green-500 text-white p-2 rounded hover:bg-green-600'
                    onClick={() => toggleTaskCompletion(index)}
                  >
                    Done
                  </button>

                  <button
                    className='bg-red-500 text-white p-2 rounded hover:bg-red-600'
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>

                  <button
                    className='bg-green-500 text-white p-2 rounded hover:bg-green-600'
                    onClick={() => {
                      setEditIndex(index);
                      setInput(tasks[index].text);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {}
      <div className='flex w-full max-w-md'>
        <div className='w-full'>
          <h2 className='text-xl font-semibold mb-4'>Completed Tasks</h2>
          <ul className='list-none'>
            {doneTasks.map((task, index) => (
              <li
                key={index}
                className='flex justify-between items-center border-b p-2 bg-green-100'
              >
                <span>{task.text}</span>
                <span className='text-gray-500 text-sm'>{task.completedAt}</span>
                <div className='flex gap-2'>
                  <button
                    className='bg-gray-500 text-white p-2 rounded hover:bg-gray-600'
                    onClick={() => toggleTaskCompletion(index)}
                  >
                    Undo
                  </button>
                  <button
                    className='bg-red-500 text-white p-2 rounded hover:bg-red-600'
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
