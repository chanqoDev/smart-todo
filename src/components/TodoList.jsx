import TodoItem from "./TodoItem"; 

export default function TodoList({todos, onToggle, onDelete, onEdit}){
return (
  <ul className="w-full max-w-4xl p-6 border rounded">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          id={t.id}
          text={t.text}
          completed={t.completed}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          className="h-auto max-w-full bg-neutral-primary-soft block p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium"
        />
      ))}
    </ul>
)
}