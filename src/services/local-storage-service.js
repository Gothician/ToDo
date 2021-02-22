export default class LocalStorageService {

    getTodoData = () => {
        const item = localStorage.getItem('todoData');

        console.log(JSON.parse(item));
        if (item) return JSON.parse(item).todoData;
        return [];
        // return [
        //     { id: 1, label: 'Drink Coffee', important: false, done: false },
        //     { id: 2, label: 'Learn React', important: true, done: false },
        //     { id: 3, label: 'Make Awesome App', important: false, done: false }
        // ]
    }

    putTodoData = (todoData) => {
        localStorage.setItem('todoData', JSON.stringify(todoData));
    }
}