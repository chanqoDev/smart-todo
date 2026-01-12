import { useEffect, useRef } from "react";
import { MdDeleteForever } from "react-icons/md";


function TodoItem({ id, text, completed, onToggle, onEdit, onDelete, onAdd, shouldFocus, onRequestFocus, prevId, nextId, isLast}) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (shouldFocus && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [shouldFocus])

    return (
        <li className="flex justify-space-between" id={id}>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => onToggle(id)}
                className="mr-2"
                onFocus={() => onRequestFocus(id)}
            />
            <input
                type="text"
                value={text}
                ref={inputRef}
                onChange={(e) => onEdit(id, e.target.value)}
                onKeyDown={(e) => {
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
