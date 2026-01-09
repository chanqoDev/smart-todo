function TodoItem({ id, text, completed, onToggle, onEdit, onDelete }) {
    return(
    <li className="flex justify-space-between">
        <input 
        type="checkbox"
        checked={completed}
        onChange={()=> onToggle(id)}
        className="mr-2"
        />

        <input 
            type="text"
            value={text}
            onChange={(e) => onEdit(id, e.target.value)}
            id="todoItem" 
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-[650px] shadow-xs placeholder:text-body" placeholder="Enter Todo Item" required
        /> 

        <button onClick={() => onDelete(id)}  
        className="border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft mx-2.5"
>Delete</button>
    </li>
    ); 
}    
export default TodoItem; 