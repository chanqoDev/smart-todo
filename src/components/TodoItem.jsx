import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";


function TodoItem({ id, text, completed, onToggle, onEdit, onDelete, onAdd }) {
    return (
        <li className="flex justify-space-between" id={id}>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => onToggle(id)}
                className="mr-2"
            />
            <input
                type="text"
                value={text}
                onChange={(e) => onEdit(id, e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        const trimmed = text.trim();
                        if (!trimmed) return; // don't add empty todos
                        onAdd();
                    }
                }}
                id="todoItem"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-[650px] shadow-xs placeholder:text-body py-3 px-3"
                placeholder="Enter Todo Item"
                required
            />
            <button
                onClick={() => onDelete(id)}
                className="border border-default-medium rounded-xs bg-[tomato] text-white bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
            ><MdDeleteForever />
            </button>
        </li>
    );
}
export default TodoItem;
