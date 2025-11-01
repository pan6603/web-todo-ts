import type { Todo, TodoCreate, TodoUpdate } from "./types";


export function add(todos: Todo[], input: TodoCreate): Todo[] {
    // const id = todos.length ? todos[todos.length - 1].id + 1 : 1;
    const id:number = todos.length ? Math.max(...todos.map(t=> t.id)) + 1  : 1;
    const now = new Date().toISOString();
    const newTodo: Todo = { 
            id, 
            title: input.title.trim(),
            done: false,
            due: input.due,
            createdAt: now
        }
    return [...todos, newTodo]    
}

// 할일 체크 전환 함수
export function toggle(todos: Todo[], id: number) {
    return todos.map(t=> t.id === id ? {...t, done:!t.done, updateAt:new Date().toISOString()}: t);
 
}

// 수정 함수 
export function update(todos: Todo[], id: number, patch:TodoUpdate) {
    // 수정할일 포함 모든 배열 반환
    return todos.map(t=> t.id === id ? {...t, ...patch, updateAt:new Date().toISOString()}: t);
}

// 삭제 함수 
export function remove (todos: Todo[], id: number): Todo[]{
    return todos.filter(t=> t.id !== id);
}
