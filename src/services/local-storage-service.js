export default class LocalStorageService {

    getTodoData = () => {
        const item = localStorage.getItem('todoData');
        if (item) return JSON.parse(item);
        return [];
    }

    putTodoData = (todoData) => {
        localStorage.setItem('todoData', JSON.stringify(todoData));
    }
}