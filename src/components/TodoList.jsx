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
  return (
    <ul className="w-full max-w-4xl p-6 mt-[126px] border rounded">
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
