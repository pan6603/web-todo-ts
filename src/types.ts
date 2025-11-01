export interface Todo {
    id: number;
    title: string;
    done: boolean; // 완료 여부
    due?: string; // 만기일, 옵션
    createdAt:string; // 생성일
    updatedAt?:string; // 수정일
}


export type TodoCreate = Pick<Todo, 'title' | 'due'>
export type TodoUpdate = Partial<Omit<Todo, 'id' | 'createdAt'>>