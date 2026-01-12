import { useEffect, useRef } from "react";
import { MdDeleteForever } from "react-icons/md";


function TodoItem({ id, text, completed, onToggle, onEdit, onDelete, onAdd, shouldFocus, onRequestFocus, prevId, nextId, isLast }) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (shouldFocus && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [shouldFocus])

    return (
        <li className={`flex items-center gap-3 p-3 rounded-lg border transition
  ${shouldFocus ? "ring-2 ring-slate-900/20 border-slate-300" : "border-slate-200"}
  ${completed ? "bg-slate-50" : "bg-white"}`}
            id={id}>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => onToggle(id)}
                className="h-5 w-5 accent-slate-900"
                onFocus={() => onRequestFocus(id)}
            />
            <input
                type="text"
                value={text}
                ref={inputRef}
                onChange={(e) => onEdit(id, e.target.value)}
                onKeyDown={(e) => {
                    //blureffect
                    if (e.key === "Escape") {
                        e.preventDefault();
                        inputRef.current?.blur();
                        return;
                    }
                    
                    // move up
                    if (e.key === "ArrowUp") {
                        if (prevId) {
                            e.preventDefault();
                            onRequestFocus(prevId);
                        }
                        return;
                    }

                    // move down 
                    if (e.key === "ArrowDown") {
                        if (nextId) {
                            e.preventDefault();
                            onRequestFocus(nextId);
                        }
                        return;
                    }

                    // Enter -> finilize + add new row only from last
                    if (e.key === "Enter") {
                        const trimmed = text.trim();
                        if (!trimmed) return;

                        e.preventDefault();
                        onEdit(id, trimmed);

                        if (isLast) onAdd();
                        return;
                    }

                    // backspace on ' ' = delete N focus prev
                    if (e.key === "Backspace") {
                        if (text.trim() === "" && prevId) {
                            e.preventDefault();
                            onDelete(id);
                            onRequestFocus(prevId);
                        }
                    }
                }}
                onFocus={() => onRequestFocus(id)}
                id="todoItem"
                className={`w-full bg-transparent outline-none text-sm sm:text-base
                ${completed ? "line-through text-slate-400" : "text-slate-900"}
                placeholder:text-slate-400`}
                placeholder="Enter todo…"
                required
            />
            <button
                onClick={() => onDelete(id)}
                className="p-2 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
            ><MdDeleteForever />
            </button>
        </li>
    );
}
export default TodoItem;
