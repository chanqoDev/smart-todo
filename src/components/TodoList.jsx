import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onAdd,
  focusId,
  onRequestFocus,
}) {
  // Empty state 
  if (!todos.length) {
    return (
      <div className="w-full max-w-4xl mt-6 p-8 rounded-lg border bg-white text-slate-600 text-center">
        No todos to show. Try switching filters or add a new todo.
      </div>
    );
  }

  return (
    <ul className="w-full max-w-4xl p-4 mt-6 border rounded-lg bg-white shadow-sm space-y-3">
      {todos.map((t, idx) => {
        const prevId = todos[idx - 1]?.id ?? null;
        const nextId = todos[idx + 1]?.id ?? null;

        return (
          <TodoItem
            key={t.id}
            id={t.id}
            text={t.text}
            completed={t.completed}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            onAdd={onAdd}
            shouldFocus={t.id === focusId}
            onRequestFocus={onRequestFocus}
            prevId={prevId}
            nextId={nextId}
            isLast={idx === todos.length - 1}
          />
        );
      })}
    </ul>
  );
}
