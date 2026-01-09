import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'
import TodoList from './components/TodoList'
import Header from './components/Header';


function App() {
    const [todos, setTodos] = useState([{ id: 1, text: "", completed: false }]);

  const onToggle = (id) =>
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );

  const onEdit = (id, text) =>
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)));

  const onDelete = (id) => setTodos((prev) => prev.filter((todo) => todo.id !== id));

  return (
    <>
    <Header /> 
    <main className='flex justify-center align-center h-auto max-w-full'>
      <TodoList todos={todos} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} /> 
    </main>
    </>
  )
}

export default App
