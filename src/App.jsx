import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [tasks, setTasks] = useState([
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

  const divArray = tasks.map((currentTask, index) => {
    const textStyle = currentTask.completed
    ? "line-through text-gray-400"
    : "text-black";

  return (
    <div key={index} className="bg-white p-4 rounded-2xl shadow-lg flex-col text-black basis-[48.5%] m-[0.75%]">
      <p className="font-semibold text-2xl">{currentTask.Title}</p>
      <div className={textStyle}>
      <p className="text-base">{currentTask.desc}</p>
      <p>Date: {currentTask.date}</p>
      <p>Time: {currentTask.time}</p>
      <p>Status: {currentTask.status}</p>
      </div>

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
  );
  });

  const [newTask, setNewTask] = useState('');

  const handleInputChange = (e) => setNewTask(e.target.value);

  const extractTime = (text) => {
    if (!text) return null;
    const timePatterns = [
      /(\d{1,2})\s*[:.]\s*(\d{2})\s*(AM|PM)?/i, // format 3:30, 3.30, 3:30 PM
      /(\d{1,2})\s*(AM|PM)/i,                   // format 3PM, 11 am
    ];

    for (const pattern of timePatterns) {
      const match = text.match(pattern);
      if (match) {
        let hours = parseInt(match[1]);
        let minutes = match[2] ? parseInt(match[2]) : 0; // default ke 0 jika tidak ada menit

        const meridian = (match[3] || match[2])?.toUpperCase?.() || '';

        if (meridian === 'PM' && hours < 12) hours += 12;
        if (meridian === 'AM' && hours === 12) hours = 0;

        if (isNaN(hours) || isNaN(minutes)) return null;

        return `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}`;
      }
    }
    return null;
  };

  const getNextDay = (dayName) => {
  const today = new Date();
  const currentDay = today.getDay();

  const dayMap = {
    "minggu": 0,
    "senin": 1,
    "selasa": 2,
    "rabu": 3,
    "kamis": 4,
    "jumat": 5,
    "sabtu": 6,
  };

  const targetDay = dayMap[dayName.toLowerCase()];
  if (targetDay === undefined) return today;

  const dayUntilTarget = (targetDay - currentDay + 7) % 7;
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + (dayUntilTarget === 0 ? 7 : dayUntilTarget));
  return nextDate;
};

const handleAddTask = async () => {
  if (newTask === '') {
    alert('Task cannot be empty');
    return;
  }

  const today = new Date();

  // Inisialisasi variabel utama
  let extractedTask = newTask;
  let extractedDate = today.toLocaleDateString('id-ID');
  let extractedTime = today.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  let taskTest = newTask.toLowerCase();

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: `
You are an intelligent task parser that extracts structured information from user input for a to-do list app.
Your job is to analyze natural language text and output only a valid JSON object with this schema:

{
  "task": "string",
  "date": "YYYY-MM-DD",
  "time": "HH:mm"
}

Now process this input:
"${newTask}"

Current date: ${today.toISOString().split('T')[0]} (${today.toLocaleDateString('en-US', { weekday: 'long' })})
Output only JSON.
`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.REACT_APP_GEMINI_API_KEY,
        },
      }
    );

    const aiText = response.data.candidates[0].content.parts[0].text.trim();
    const cleanJson = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    
    if (parsed.task) extractedTask = parsed.task;
    else extractedTask = newTask;

    if (parsed.date) {
      const parsedDate = new Date(parsed.date);
      if (!isNaN(parsedDate)) {
        extractedDate = parsedDate.toLocaleDateString('id-ID');
      }
    }

    
    if (parsed.time && /^\d{1,2}:\d{2}$/.test(parsed.time)) {
      extractedTime = parsed.time;
    }

  } catch (error) {
    console.error("AI API Failed");

    
    const now = new Date();
    extractedTask = newTask;
    extractedDate = now.toLocaleDateString('id-ID');
    extractedTime = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
    for (const day of days) {
      if (taskTest.includes(day)) {
        const nextDayDate = getNextDay(day);
        extractedDate = nextDayDate.toLocaleDateString('id-ID');
        break;
      }
    }
  }

  
  const localTime = extractTime(taskTest);
  if (localTime) extractedTime = localTime;

  
  const taskToAdd = {
    Title: extractedTask,
    date: extractedDate,
    time: extractedTime,
    status: 'Active',
    completed: false,
  };

if (!extractedTime || extractedTime.includes('NaN')) {
  extractedTime = today.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}
  setTasks([...tasks, taskToAdd]);
  setNewTask('');
};

  function handletoggleCompleted(index) {
    const updatedTasks = tasks.map((tasks, i) => (i === index ? { ...tasks, completed: !tasks.completed } : tasks));
    setTasks(updatedTasks);
  }

  function handleRemoveTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
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
