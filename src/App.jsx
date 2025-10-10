import React from 'react';

function App() {
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
            {/*card*/}
            <div className="bg-slate-700 p-4 rounded-2xl shadow-lg flex-col">
              <p className="font-semibold text-2xl">Judul</p>

              <p className="text-base">Why did the chicken cross the road</p>

              <p>Date:</p>

              <p>Time:</p>

              <p>Status: anjay</p>

              <input type="checkbox" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
