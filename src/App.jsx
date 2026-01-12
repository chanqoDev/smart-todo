import { useEffect, useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import Header from './components/Header';

const STORAGE_KEY = 'smart-todo.todos';


function App() {
  // lazy initializer
  const [todos, setTodos] = useState(() => {
    try {
      // saved item 
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [{ id: 1, text: "", completed: false }];
    } catch (err) {
      console.log('Failed to load todos from localStorage', err);
      return [{ id: 1, text: "", completed: false }];
    }
  });
  const [focusId, setFocusId] = useState(null);
  const [filter, setFilter] = useState("all"); // all, active, completed

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (err) {
      console.error('Failed to save todos to localStorage', err);
    }
  }, [todos])


  const onAdd = () => {
    const newId = Date.now();
    setTodos((prev) => [...prev, { id: newId, text: "", completed: false }]);
    setFocusId(newId);
  };
  const onToggle = (id) =>
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );

  const onEdit = (id, text) => setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  const onDelete = (id) => setTodos((prev) => {
    const filtered = prev.filter((todo) => todo.id !== id);
    // If user deleted the last remaining row,
    // keep one blank input row alive
    if (filtered.length === 0) {
      return [{ id: Date.now(), text: "", completed: false }];
    }
    return filtered;
  });

  // filter: completed, active count, clear
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  useEffect(() => {
    if (focusId == null) return;
    const existsInVisible = visibleTodos.some(t => t.id === focusId);
    if (!existsInVisible && visibleTodos.length) {
      setFocusId(visibleTodos[visibleTodos.length - 1].id);
    }
  }, [filter, visibleTodos, focusId]);


  const clearCompleted = () => {
    setTodos((prev) => {
      const kept = prev.filter((todo) => !todo.completed);
      return kept.length ? kept : [{ id: Date.now(), text: "", completed: false }];
    });
  };

  return (
    <>
      <Header />
      <h2 className="mt-9 mb-2 py-20 text-[#23586a] text-4xl font-bold tracking-tighter text-center md:text-5xl lg:text-6xl">Today’s Focus</h2>
      <div className="mx-auto w-full max-w-4xl px-4 mt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onAdd}
              className="px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition"
            >
              + Add todo
            </button>

            <button
              type="button"
              onClick={clearCompleted}
              disabled={completedCount === 0}
              className="px-4 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Clear completed
            </button>
          </div>

          <div className="text-sm text-slate-600">
            Active: <span className="font-semibold text-slate-900">{activeCount}</span>{" "}
            • Completed: <span className="font-semibold text-slate-900">{completedCount}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          {["all", "active", "completed"].map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setFilter(k)}
              className={`px-3 py-1.5 rounded-full text-sm border transition ${filter === k
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
            >
              {k[0].toUpperCase() + k.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <main className='flex justify-center align-center text-center h-auto max-w-full'>
        <TodoList todos={visibleTodos} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} onAdd={onAdd} focusId={focusId} onRequestFocus={setFocusId} />
      </main>
      <footer className="mx-auto max-w-4xl px-4 mt-3 text-xs text-slate-500">
        Tips: ↑/↓ to navigate, Enter to add (last row), Backspace on empty to delete, Esc to blur.
      </footer>

    </>
  )
}

export default App
