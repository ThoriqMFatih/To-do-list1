import React from 'react';

function App() {
  const task = [{
    Title : "calculus class",
    desc : "attending the calculus class",
    date : "25 january",
    time : "10 AM",
    status : "Active"
  },
  {
    Title : "Physics class",
    desc : "attending the Physics class",
    date : "28 january",
    time : "10 AM",
    status : "Active"
  },
];

const divArray = [];

for (let i=0; i<task.length; i++ ){
let currentTask = task[i];
divArray.push (
            <div className="bg-slate-700 p-4 rounded-2xl shadow-lg flex-col">
              <p className="font-semibold text-2xl">{currentTask.Title}</p>

              <p className="text-base">{currentTask.desc}</p>

              <p>Date:{currentTask.date}</p>

              <p>Time: {currentTask.time}</p>

              <p>Status: {currentTask.status}</p>

              <p>hihahahahaa</p>

              <input type="checkbox" />
            </div>
);
}

  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-800 text-white">
      <header className="absolute top-0 text-xl p-5 bg-gray-600 w-full text-center rounded-lg">To-Do List App</header>

      <main className="pt-36 w-3/4">
        {/* User Prompt */}
        <div className="flex justify-center">
          <input className="bg-slate-700 p-4 rounded-2xl w-3/4 shadow-md" placeholder="Type your task here..." />
          <button className="pl-2 h-12 pt-2">
            <img src="/logo192.png" alt="enter" className="w-full h-full" />
          </button>
        </div>

        {/*spacing*/}
        <div className="p-6"></div>

        {/*To do List*/}
        <div className="flex justify-center">
          <div className="w-[85%] flex flex-col gap-y-4">
            <p className="font-semibold text-xl">Your To-Do List</p>
            <hr />

            {divArray}
           
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
