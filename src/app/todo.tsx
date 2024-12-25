"use client";

import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<
    { text: string; completed: boolean; completedAt?: string }[]
  >([]);
  const [input, setInput] = useState("");

  // Add Task
  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([
        ...tasks,
        { text: input, completed: false },
      ]);
      setInput("");
    }
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

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

      {}
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {}
      <div className="flex w-full max-w-md mb-8">
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Pending Tasks</h2>
          <ul className="list-none">
            {pendingTasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b p-2"
              >
                <span>{task.text}</span>
                <div className="flex gap-2">
                  <button
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    onClick={() => toggleTaskCompletion(index)}
                  >
                    Done
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
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

      {}
      <div className="flex w-full max-w-md">
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Completed Tasks</h2>
          <ul className="list-none">
            {doneTasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b p-2 bg-green-100"
              >
                <span>{task.text}</span>
                <span className="text-gray-500 text-sm">
                  {task.completedAt} {}
                </span>
                <div className="flex gap-2">
                  <button
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                    onClick={() => toggleTaskCompletion(index)}
                  >
                    Undo
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
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
