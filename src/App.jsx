import React, { useState } from 'react';

function App() {
  const [task, setTasks] = useState([
    {
      Title: 'calculus class',
      desc: 'attending the calculus class',
      date: '25 january',
      time: '10 AM',
      status: 'Active',
      completed: false,
    },
    {
      Title: 'Physics class',
      desc: 'attending the Physics class',
      date: '28 january',
      time: '10 AM',
      status: 'Active',
      completed: false,
    },
    {
      Title: 'Physics class',
      desc: 'attending the Physics class',
      date: '28 january',
      time: '10 AM',
      status: 'Active',
      completed: false,
    },
    {
      Title: 'calculus class',
      desc: 'attending the calculus class',
      date: '25 january',
      time: '10 AM',
      status: 'Active',
      completed: false,
    },
    {
      Title: 'Physics class',
      desc: 'attending the Physics class',
      date: '28 january',
      time: '10 AM',
      status: 'Active',
      completed: false,
    },
    {
      Title: 'Physics class',
      desc: 'attending the Physics class',
      date: '28 january',
      time: '10 AM',
      status: 'Active',
      completed: false,
    },
  ]);

  const divArray = task.map((currentTask, index) => (
    <div key={index} className="bg-white p-4 rounded-2xl shadow-lg flex-col text-black basis-[48.5%] m-[0.75%]">
      <p className="font-semibold text-2xl">{currentTask.Title}</p>
      <p className="text-base">{currentTask.desc}</p>
      <p>Date: {currentTask.date}</p>
      <p>Time: {currentTask.time}</p>
      <p>Status: {currentTask.status}</p>

      <input
        className="mr-[100%]"
        type="checkbox"
        checked={currentTask.completed}
        onChange={() => handletoggleCompleted(index)}
      />

      <button className="bg-red-500 text-white px-4 py-2 rounded mt-1" onClick={() => handleRemoveTask(index)}>
        Remove Task
      </button>
    </div>
  ));

  const [newTask, setNewTask] = useState('');

  const handleInputChange = (e) => setNewTask(e.target.value);

  function handleAddTask() {
    if (newTask === '') {
      alert('Task cannot be empty');
      return;
    }
    const now = new Date();
    const tasktoAdd = {
      Title: newTask,
      desc: 'New task added',
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      status: 'Active',
      completed: false,
    };
    setTasks([...task, tasktoAdd]);
    setNewTask('');
  }

  function handletoggleCompleted(index) {
    const updatedTasks = task.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task));
    setTasks(updatedTasks);
  }

  function handleRemoveTask(index) {
    const updatedTasks = task.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  return (
    <div className="flex justify-center w-full min-h-screen bg-red-700 text-white p-5">
      <header className="shadow-lg absolute top-0 text-xl p-5 bg-red-600 w-full text-center font-BBH italic">
        To-Do List App
      </header>

      <main className="pt-36 w-3/4">
        {/* User Prompt */}
        <div className="flex justify-center">
          <input
            className="bg-white p-4 rounded-2xl w-3/4 shadow-md text-black"
            placeholder="Type your task here..."
            value={newTask}
            onChange={handleInputChange}
          />
          <button className="pl-2 h-12 pt-2" onClick={handleAddTask}>
            <img src="/Tomboll.png" alt="enter" className="size-full" />
          </button>
        </div>

        {/*spacing*/}
        <div className="p-6"></div>

        {/*To do List*/}
        <div className="flex justify-center">
          <div className="w-[85%] flex flex-col gap-y-4">
            <p className="font-bold text-xl font-sans text-center">Your To-Do List</p>
            <hr />

            <div className="flex flex-row flex-wrap">{divArray}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
