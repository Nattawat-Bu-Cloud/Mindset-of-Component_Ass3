'use client'

import { useState, useEffect } from 'react';

export default function TodoListApp() {
  const [showSplash, setShowSplash] = useState(true);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Sleep', completed: false, dueDate: 'No due date' },
    { id: 2, text: 'Join React class', completed: true, dueDate: 'Completed' },
    { id: 3, text: 'Do react homework', completed: false, dueDate: 'Today' }
  ]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const addTask = () => {
    if (newTask.trim() === '') return;
    
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      dueDate: 'No due date'
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed, dueDate: !task.completed ? 'Completed' : 'No due date' }
        : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'done') return task.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;

  if (showSplash) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-slate-700 border-t-emerald-400 rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-400 text-2xl">✓</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto pt-12">
        
        <div className="mb-8 flex items-baseline gap-4">
          <h1 className="text-5xl font-black text-white tracking-tight">
            Tasks
          </h1>
          <span className="text-emerald-400 font-mono text-sm">{tasks.length} items</span>
        </div>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            className="w-full px-5 py-4 bg-slate-800 text-white text-lg border-2 border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500 placeholder-slate-500 transition-colors"
          />
          <button 
            onClick={addTask}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-emerald-500 text-slate-900 font-bold rounded-md hover:bg-emerald-400 transition-colors">
            +
          </button>
        </div>

        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div 
              key={task.id}
              className={`group flex items-start gap-4 p-5 bg-slate-800 border-l-4 ${
                task.completed ? 'border-emerald-500 bg-slate-800/50' : 'border-slate-700 hover:border-emerald-500'
              } transition-all duration-200`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="mt-1.5 w-5 h-5 rounded border-2 border-slate-600 bg-slate-900 checked:bg-emerald-500 checked:border-emerald-500 cursor-pointer"
              />
              <div className="flex-1">
                <p className={`text-lg font-medium ${task.completed ? 'text-slate-500 line-through' : 'text-white'}`}>
                  {task.text}
                </p>
                <span className={`text-sm ${task.completed ? 'text-emerald-500 font-mono' : 'text-slate-500'}`}>
                  {task.dueDate}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all px-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center text-sm text-slate-500">
          <span>{completedCount} of {tasks.length} completed</span>
          <div className="flex gap-4">
            <button 
              onClick={() => setFilter('all')}
              className={`hover:text-emerald-400 transition-colors ${filter === 'all' ? 'text-emerald-400 font-bold' : ''}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('active')}
              className={`hover:text-emerald-400 transition-colors ${filter === 'active' ? 'text-emerald-400 font-bold' : ''}`}
            >
              Active
            </button>
            <button 
              onClick={() => setFilter('done')}
              className={`hover:text-emerald-400 transition-colors ${filter === 'done' ? 'text-emerald-400 font-bold' : ''}`}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}