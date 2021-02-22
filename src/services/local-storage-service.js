export default class LocalStorageService {

    getTodoData = () => {
        // Get data from localStorage
        const item = localStorage.getItem('todoData');
        // Parse JSON
        console.log(JSON.parse(item));
        // If there were data - return them, else - return void array
        if (item) return JSON.parse(item).todoData;
        return [];
    }

    putTodoData = (todoData) => {
        // Put data into localStorage
        localStorage.setItem('todoData', JSON.stringify(todoData));
    }
}