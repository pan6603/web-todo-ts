import { useState } from "react"

interface Props {
    onAdd: (title: string, due?: string ) => void
}

export default function Todoform({onAdd}: Props) {
    const [title, setTitle] = useState('');
    const [due, setDue] = useState('');

    function submit(e: React.FormEvent) {
        e.preventDefault();
        if(!title.trim()) return;
        onAdd(title, due || undefined);
        setTitle('');
        setDue('');
    }

    return (
        <form onSubmit={submit}>
            <input 
                type="text" 
                placeholder="할일을 입력해주세요."
                value={title}
                onChange={e=> setTitle(e.target.value)}
            />
            <input 
                type="date"
                value={due}
                onChange={e=> setDue(e.target.value)}    
            />
            <button>추가</button>
        </form>
    )
}