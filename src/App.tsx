import { useState } from 'react';
import {
  Home,
  FolderKanban,
  Plus,
  Calendar,
  User,
  Bell,
  MoreVertical,
  ChevronLeft,
  Check,
  Settings,
  PieChart,
  Clock,
  ChevronDown,
  X,
} from 'lucide-react';

type Task = {
  id: number;
  title: string;
  category: string;
  time: string;
  completed: boolean;
  color: string;
  date: string;
};

type Subtask = {
  id: number;
  title: string;
  completed: boolean;
};

const initialTasks: Task[] = [
  { id: 1, title: 'Design Mobile App', category: 'UI/UX Design', time: '9:00 AM', completed: false, color: 'bg-green-100 text-green-700 border-green-500', date: '2024-04-18' },
  { id: 2, title: 'Team Meeting', category: 'Project Discussion', time: '11:00 AM', completed: true, color: 'bg-indigo-100 text-indigo-700 border-indigo-500', date: '2024-04-18' },
  { id: 3, title: 'Lunch Break', category: 'Break Time', time: '1:00 PM', completed: false, color: 'bg-orange-100 text-orange-700 border-orange-500', date: '2024-04-18' },
  { id: 4, title: 'Workout', category: 'Health & Fitness', time: '6:00 PM', completed: true, color: 'bg-rose-100 text-rose-700 border-rose-500', date: '2024-04-18' },
];

const mockSubtasks: Subtask[] = [
  { id: 101, title: 'Research & Analysis', completed: true },
  { id: 102, title: 'Wireframing', completed: true },
  { id: 103, title: 'UI Design', completed: false },
  { id: 104, title: 'Prototyping', completed: false },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'insights' | 'calendar' | 'profile'>('home');
  const [activeScreen, setActiveScreen] = useState<'main' | 'details'>('main');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const toggleTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
    setSelectedTask((prevSelected) => prevSelected && prevSelected.id === id ? { ...prevSelected, completed: !prevSelected.completed } : prevSelected);
  };

  const openTaskDetails = (task: Task) => {
    setSelectedTask(task);
    setActiveScreen('details');
  };

  const goBack = () => {
    setActiveScreen('main');
    setSelectedTask(null);
  };

  const addNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = String(formData.get('title') ?? '').trim();
    const category = String(formData.get('category') ?? 'Work');
    const time = String(formData.get('time') ?? '09:00');
    if (!title) return;

    const newTask: Task = {
      id: Date.now(),
      title,
      category,
      time,
      completed: false,
      color: 'bg-violet-100 text-violet-700 border-violet-500',
      date: new Date().toISOString().slice(0, 10),
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setIsAddModalOpen(false);
  };

  const HomeScreen = () => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
      <div className="flex-1 overflow-y-auto pb-24 px-6 pt-12 bg-[#F8F9FE]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Hi, Alex <span className="text-2xl">👋</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Let's Plan Your Day</p>
          </div>
          <div className="relative">
            <button className="p-2 bg-white rounded-full shadow-sm">
              <Bell size={20} className="text-gray-700" />
            </button>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
        </div>

        <div className="bg-violet-600 rounded-3xl p-6 mb-8 text-white relative overflow-hidden shadow-lg shadow-violet-200">
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <p className="text-violet-200 text-sm font-medium mb-1">Today's Progress</p>
              <h2 className="text-4xl font-bold">{progress}%</h2>
              <p className="text-violet-200 text-xs mt-1">Great Progress!</p>
            </div>
            <div className="bg-violet-500/50 px-3 py-1 rounded-full flex items-center gap-1 text-xs backdrop-blur-sm">
              Weekly <ChevronDown size={14} />
            </div>
          </div>

          <svg className="absolute w-full h-24 bottom-16 left-0 opacity-50 pointer-events-none" viewBox="0 0 100 30" preserveAspectRatio="none">
            <path d="M0,15 Q10,5 25,15 T50,15 T75,15 T100,5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="50" cy="15" r="2" fill="white" />
            <circle cx="75" cy="15" r="2" fill="#FCD34D" />
          </svg>

          <div className="flex justify-between mt-8 relative z-10 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
            <div className="text-center">
              <p className="text-xl font-bold">{total}</p>
              <p className="text-violet-200 text-xs">Tasks</p>
            </div>
            <div className="w-px h-8 bg-violet-400/50"></div>
            <div className="text-center">
              <p className="text-xl font-bold">{completed}</p>
              <p className="text-violet-200 text-xs">Completed</p>
            </div>
            <div className="w-px h-8 bg-violet-400/50"></div>
            <div className="text-center">
              <p className="text-xl font-bold">{pending}</p>
              <p className="text-violet-200 text-xs">Pending</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Today's Tasks</h3>
          <button className="text-sm text-violet-600 font-medium">See All</button>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => openTaskDetails(task)}
              className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${task.color.split(' ')[0]} ${task.color.split(' ')[1]}`}>
                  <FolderKanban size={18} />
                </div>
                <div>
                  <h4 className={`font-semibold ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{task.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{task.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400 font-medium">{task.time}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTask(task.id);
                  }}
                  className={`w-6 h-6 rounded flex items-center justify-center border-2 ${task.completed ? 'bg-violet-600 border-violet-600' : 'border-gray-300'}`}
                >
                  {task.completed && <Check size={14} className="text-white" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CalendarScreen = () => {
    return (
      <div className="flex-1 overflow-y-auto pb-24 px-6 pt-12 bg-[#F8F9FE]">
        <div className="flex justify-between items-center mb-8">
          <button className="p-2"><ChevronLeft size={24} className="text-gray-800" /></button>
          <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            April 2024 <ChevronDown size={16} />
          </h1>
          <button className="p-2"><Calendar size={24} className="text-gray-800" /></button>
        </div>

        <div className="flex justify-between mb-8 overflow-x-auto hide-scrollbar gap-2">
          {['15', '16', '17', '18', '19', '20', '21'].map((day, index) => {
            const isToday = day === '18';
            const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            return (
              <div key={day} className={`flex flex-col items-center p-3 rounded-2xl min-w-[3.5rem] ${isToday ? 'bg-violet-600 text-white shadow-md shadow-violet-200' : 'bg-transparent text-gray-500'}`}>
                <span className="text-xs mb-1 font-medium">{daysOfWeek[index]}</span>
                <span className={`text-lg font-bold ${isToday ? 'text-white' : 'text-gray-900'}`}>{day}</span>
              </div>
            );
          })}
        </div>

        <h3 className="text-md font-bold text-gray-900 mb-4">Thursday, 18 April</h3>

        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          {tasks.map((task) => (
            <div key={task.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                {task.completed ? <Check size={16} className="text-green-500" /> : <Clock size={16} />}
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                <div className={`p-4 rounded-2xl border-l-4 ${task.color.split(' ')[0]} ${task.color.split(' ')[2]} shadow-sm`}>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className={`font-bold text-sm ${task.color.split(' ')[1]}`}>{task.title}</h4>
                    <span className="text-xs font-medium text-gray-500">{task.time}</span>
                  </div>
                  <p className="text-xs text-gray-500">{task.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const InsightsScreen = () => {
    return (
      <div className="flex-1 overflow-y-auto pb-24 px-6 pt-12 bg-[#F8F9FE]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Insights</h1>
          <div className="bg-white px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1 text-sm font-medium border border-gray-100">
            This Week <ChevronDown size={16} />
          </div>
        </div>

        <div className="bg-violet-600 rounded-3xl p-6 text-white mb-8 shadow-lg shadow-violet-200">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-violet-200 text-sm mb-1">Tasks Completed</p>
              <h2 className="text-4xl font-bold">28</h2>
              <p className="text-xs text-emerald-300 mt-1 flex items-center gap-1">↑ +12% from last week</p>
            </div>
            <button className="p-2 bg-white/10 rounded-full">
              <X size={16} />
            </button>
          </div>

          <div className="flex justify-between items-end h-32 gap-2 mt-4">
            {[40, 60, 30, 80, 50, 90, 70].map((value, index) => {
              const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
              const isMax = value === 90;
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full relative flex justify-center flex-1 items-end">
                    <div className={`w-full max-w-[20px] rounded-t-sm ${isMax ? 'bg-emerald-400' : 'bg-white/30'}`} style={{ height: `${value}%` }}></div>
                  </div>
                  <span className={`text-[10px] mt-2 ${isMax ? 'text-white font-bold' : 'text-violet-200'}`}>{days[index]}</span>
                </div>
              );
            })}
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'conic-gradient(#8b5cf6 0% 45%, #ec4899 45% 70%, #f59e0b 70% 90%, #10b981 90% 100%)' }}>
            <div className="absolute w-16 h-16 bg-white rounded-full"></div>
          </div>

          <div className="space-y-3 flex-1 ml-8">
            {[
              { color: 'bg-violet-500', label: 'Work', value: '45%' },
              { color: 'bg-pink-500', label: 'Personal', value: '25%' },
              { color: 'bg-amber-500', label: 'Health', value: '20%' },
              { color: 'bg-emerald-500', label: 'Study', value: '10%' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${item.color}`}></span><span className="text-gray-600">{item.label}</span></div>
                <span className="font-bold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ProfileScreen = () => {
    return (
      <div className="flex-1 overflow-y-auto pb-24 px-6 pt-12 bg-[#F8F9FE]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <button className="p-2 bg-white rounded-full shadow-sm"><Settings size={20} className="text-gray-700" /></button>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-violet-200 border-4 border-white shadow-md mb-4 overflow-hidden flex items-center justify-center text-violet-500">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <circle cx="50" cy="40" r="20" />
              <path d="M20 90 Q50 60 80 90 Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Alex Johnson</h2>
          <p className="text-sm text-gray-500">alex@example.com</p>
        </div>

        <div className="bg-violet-600 rounded-3xl p-6 text-white flex justify-between items-center mb-8 shadow-lg shadow-violet-200">
          <div>
            <p className="text-violet-200 text-sm mb-1">Overview</p>
            <h3 className="text-2xl font-bold mb-1">128</h3>
            <p className="text-xs text-violet-200">Total Tasks</p>
          </div>
          <div className="w-px h-12 bg-violet-400/50"></div>
          <div>
            <p className="text-violet-200 text-sm mb-1 invisible">Overview</p>
            <h3 className="text-2xl font-bold mb-1">85</h3>
            <p className="text-xs text-violet-200">Completed</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {[
            { icon: <PieChart size={20} />, label: 'My Statistics' },
            { icon: <FolderKanban size={20} />, label: 'Categories' },
            { icon: <Bell size={20} />, label: 'Reminders' },
            { icon: <Settings size={20} />, label: 'Settings' },
            { icon: <User size={20} />, label: 'Help & Support' },
          ].map((item, index, arr) => (
            <div key={item.label} className={`flex items-center justify-between p-4 px-6 active:bg-gray-50 cursor-pointer ${index !== arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <div className="flex items-center gap-4 text-gray-700">
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronLeft size={20} className="text-gray-400 rotate-180" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const TaskDetailsScreen = () => {
    if (!selectedTask) return null;

    return (
      <div className="absolute inset-0 bg-[#F8F9FE] z-20 flex flex-col h-full overflow-hidden slide-in">
        <div className="flex justify-between items-center p-6 pt-12 bg-[#F8F9FE] z-10 relative">
          <button onClick={goBack} className="p-2 bg-white rounded-full shadow-sm"><ChevronLeft size={24} className="text-gray-800" /></button>
          <h1 className="text-lg font-bold text-gray-900">Task Details</h1>
          <button className="p-2 bg-white rounded-full shadow-sm"><MoreVertical size={20} className="text-gray-800" /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-24">
          <div className="flex flex-col items-center mb-8 pt-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${selectedTask.color.split(' ')[0]} ${selectedTask.color.split(' ')[1]}`}>
              <FolderKanban size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">{selectedTask.title}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedTask.color.split(' ')[0]} ${selectedTask.color.split(' ')[1]}`}>
              {selectedTask.category}
            </span>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Create a beautiful and user-friendly interface for the task tracker app. Ensure all screens from the wireframes are implemented accurately with high fidelity.
            </p>
          </div>

          <div className="flex gap-4 mb-8">
            <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <Calendar className="text-violet-500" size={20} />
              <div>
                <p className="text-xs text-gray-400">Due Date</p>
                <p className="font-semibold text-sm text-gray-900">{selectedTask.date}</p>
              </div>
            </div>
            <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <Clock className="text-violet-500" size={20} />
              <div>
                <p className="text-xs text-gray-400">Time</p>
                <p className="font-semibold text-sm text-gray-900">{selectedTask.time}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Subtasks</h3>
            <div className="space-y-3">
              {mockSubtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border-2 ${subtask.completed ? 'bg-violet-600 border-violet-600' : 'border-gray-300'}`}>
                    {subtask.completed && <Check size={12} className="text-white" />}
                  </div>
                  <span className={`text-sm font-medium ${subtask.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{subtask.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-white via-white to-transparent pt-12">
          <button
            onClick={() => {
              if (selectedTask) toggleTask(selectedTask.id);
            }}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-colors ${selectedTask.completed ? 'bg-gray-400' : 'bg-violet-600 shadow-violet-200'}`}
          >
            {selectedTask.completed ? 'Mark as Incomplete' : 'Complete Task'}
          </button>
        </div>
      </div>
    );
  };

  const AddTaskModal = () => {
    if (!isAddModalOpen) return null;

    return (
      <div className="absolute inset-0 bg-gray-900/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 backdrop-blur-sm animate-fade-in">
        <div className="bg-white w-full sm:w-[90%] rounded-t-3xl sm:rounded-3xl p-6 pb-12 sm:pb-6 transform transition-transform animate-slide-up">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Add New Task</h2>
            <button onClick={() => setIsAddModalOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={20} /></button>
          </div>
          <form onSubmit={addNewTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
              <input
                name="title"
                required
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                placeholder="E.g. Project Meeting"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Study">Study</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                name="time"
                required
                type="time"
                defaultValue="09:00"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
              />
            </div>
            <button type="submit" className="w-full bg-violet-600 text-white font-bold py-4 rounded-xl mt-6 shadow-lg shadow-violet-200 active:scale-[0.98] transition-transform">
              Create Task
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        .animate-fade-in { animation: fadeIn 0.2s ease-out; }
        .animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .slide-in { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
      ` }} />

      <div className="w-full max-w-[400px] h-[850px] max-h-[95vh] bg-white rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col ring-8 ring-gray-900">
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
          <div className="w-32 h-7 bg-black rounded-b-3xl"></div>
        </div>

        {activeScreen === 'main' && (
          <>
            {activeTab === 'home' && <HomeScreen />}
            {activeTab === 'insights' && <InsightsScreen />}
            {activeTab === 'calendar' && <CalendarScreen />}
            {activeTab === 'profile' && <ProfileScreen />}
          </>
        )}

        {activeScreen === 'details' && <TaskDetailsScreen />}

        {activeScreen === 'main' && (
          <div className="absolute bottom-0 w-full bg-white pb-6 pt-2 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-3xl border-t border-gray-50 flex justify-between items-center z-40">
            <button
              onClick={() => setActiveTab('home')}
              className={`p-2 flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-violet-600' : 'text-gray-400'}`}
            >
              <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
              <span className="text-[10px] font-medium">Home</span>
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`p-2 flex flex-col items-center gap-1 transition-colors ${activeTab === 'insights' ? 'text-violet-600' : 'text-gray-400'}`}
            >
              <PieChart size={24} strokeWidth={activeTab === 'insights' ? 2.5 : 2} />
              <span className="text-[10px] font-medium">Insights</span>
            </button>
            <div className="relative -top-6">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-14 h-14 bg-violet-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-300 text-white transform transition-transform active:scale-95 hover:bg-violet-700"
              >
                <Plus size={28} strokeWidth={3} />
              </button>
            </div>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`p-2 flex flex-col items-center gap-1 transition-colors ${activeTab === 'calendar' ? 'text-violet-600' : 'text-gray-400'}`}
            >
              <Calendar size={24} strokeWidth={activeTab === 'calendar' ? 2.5 : 2} />
              <span className="text-[10px] font-medium">Calendar</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`p-2 flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-violet-600' : 'text-gray-400'}`}
            >
              <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
              <span className="text-[10px] font-medium">Profile</span>
            </button>
          </div>
        )}

        <AddTaskModal />

        <div className="absolute bottom-2 inset-x-0 flex justify-center z-50 pointer-events-none">
          <div className="w-1/3 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
