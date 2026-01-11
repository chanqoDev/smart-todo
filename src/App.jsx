import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'
import TodoList from './components/TodoList'
import Header from './components/Header';

const STORAGE_KEY = 'smart-todo.todos';


function App() {
  // const [todos, setTodos] = useState([{ id: 1, text: "", completed: false }]);
  // lazy initializer
  const [todos, setTodos] = useState(() => {
    try {
      // saved item 
      const saved = localStorage.getItem(STORAGE_KEY); 
      return saved ? JSON.parse(saved) : [{ id: 1, text: "", completed: false }]; 
    }catch(err) {
      console.log('Failed to load todos from localStorage', err); 
      return [{ id: 1, text: "", completed: false }];
    }
  });

  useEffect(()=> {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); 
    }catch (err) {
      console.error('Failed to save todos to localStorage', err);
    }
  }, [todos])

  const onAdd = () => {
  setTodos((prev) => [
    ...prev,
    { id: Date.now(), text: "", completed: false }
  ]);
};
  const onToggle = (id) =>
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );

  const onEdit = (id, text) =>
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)));

  const onDelete = (id) => setTodos((prev) => {
        const filtered = prev.filter((todo) => todo.id !== id);

    // If user deleted the last remaining row,
    // keep one blank input row alive
    if (filtered.length === 0) {
      return [{ id: Date.now(), text: "", completed: false }];
    }

    return filtered;
  });

  return (
    <>
      <Header />
      <h2 className="mt-9 mb-2 text-[#23586a] text-4xl font-bold tracking-tighter text-center md:text-5xl lg:text-6xl">Todo List</h2>
      <main className='flex justify-center align-center text-center h-auto max-w-full'>
        <TodoList todos={todos} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} onAdd={onAdd} />
      </main>
    </>
  )
}

export default App
