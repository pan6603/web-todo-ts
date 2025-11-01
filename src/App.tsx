
import { useEffect, useState } from 'react'
import './App.css'
import type { Todo } from './types'
import Todoform from './componets/Todoform'
import TodoItem from './componets/TodoItem'
import * as S from './store';

const KEY = 'todos:v1';

function load(): Todo[]{
  const raw = localStorage.getItem(KEY)
  return raw ? (JSON.parse(raw) as Todo[]):[];
}

function save(todos:Todo[]) {
  localStorage.setItem(KEY, JSON.stringify(todos));
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => load());

  useEffect(() => { // todos 변경되면 로컬 스토리지에 값을 저장 
      save(todos)
  },[todos])

  return (
    <>
      <h1>Todo List</h1>
      <Todoform onAdd={(title: string, due?: string)=>setTodos((prev)=> S.add(prev,{title, due}))}/>
      <hr />
      <ul>
        {todos.map((t) => 
          <TodoItem 
            todo={t} 
            key={t.id}
            onToggle={()=>setTodos((prev=> S.toggle(prev, t.id)))}
            onDelete={()=>setTodos((prev=> S.remove(prev, t.id)))}
            onEdit={patch=>setTodos((prev=> S.update(prev, t.id, patch)))}
            key={t.id}
          />
        )}
      </ul>
    </>
  )
}

export default App
