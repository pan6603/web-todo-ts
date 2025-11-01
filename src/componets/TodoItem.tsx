import { useState } from "react";
import type { Todo, TodoUpdate } from "../types"

interface Props {
    todo: Todo;
    onToggle: ()=> void;
    onDelete: ()=> void;
    onEdit: (patch: TodoUpdate)=> void;
}

export default function TodoItem({todo, onToggle, onDelete, onEdit}: Props) {
    const [editing, setEditing] = useState(false); // 수정모드 여부
    const [title, setTitle] = useState(todo.title);
    // const [done, setDone] = useState<boolean>(todo.done);
    const [due, setDue] = useState<string>(todo.due ?? '')

    function saveEdit() {
        const patch:TodoUpdate = {title: title.trim(), due: due || undefined}
        onEdit(patch);
        setEditing(false);
    }


    return (
        <li>
            {!editing ? 
                <>
                    <input type="checkbox" checked={todo.done} id={`todo-${todo.id}`} onChange={onToggle}/>
                    <label htmlFor={`todo-${todo.id}`} className={todo.done ? 'done' : ''}>{todo.title}</label>
                    
                    <button onClick={()=> setEditing(true)}>수정</button>
                    <button onClick={onDelete}>삭제</button>
                </>
                : 
                <>
                    <input type="text" value={title} onChange={e=>setTitle(e.target.value)}/>
                    <input type="date" value={due} onChange={e=>setDue(e.target.value)}/>

                    <button onClick={saveEdit}>저장</button>
                    <button onClick={()=> setEditing(false)}>취소</button>
                </>    
            }
            
        </li>
    )
}