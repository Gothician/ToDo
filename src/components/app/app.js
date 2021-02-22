import React, { Component } from 'react';

import LocalStorageService from '../../services/local-storage-service';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from "../item-add-form";

import './app.css';

export default class App extends Component {
  localStorageService = new LocalStorageService();
  todoQtty = 0;

  state = {
    todoData: this.localStorageService.getTodoData(),
    filter: 'all',
    search: ''
  }

  componentDidMount() {
    const todoData = this.localStorageService.getTodoData();
    this.setState({
      todoData
    });
    this.todoQtty = todoData.length;
  }

  updateTodoDataState = (todoData) => {
    this.localStorageService.putTodoData(todoData)
    this.setState({
      todoData: this.localStorageService.getTodoData()
    });
  }

  createTodoItem(label) {
    return {
      id: this.todoQtty++ + 1,
      label: label,
      done: false,
      important: false
    }
  }

  addItem = (label) => {
    this.updateTodoDataState({
      todoData: [...this.state.todoData, this.createTodoItem(label)]
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      this.todoQtty--;
      return {
        //return array of todo elements with ids is not equal deleted id
        todoData: todoData.filter((el) => el.id !== id)
      }
    })

  }

  toggleProperty = (arr, id, propName) => {
    return arr.map((el) => {
      // if id is equal, toggle property
      if (el.id === id) el.[propName] = !el.[propName];
      // return todo element
      return el;
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }

  onFilterSelected = (id) => {
    this.setState({ filter: id });
  }

  statusFilter = (data) => {

    if (this.state.filter !== 'all') return (this.state.filter === 'done')
      ? data.filter((el) => el.done)
      : data.filter((el) => !el.done);

    /*switch (this.state.filter) {
      case 'done': return = data.filter((el) => el.done);
      case 'active': return data.filter((el) => !el.done);
      default: return data;
    }*/

    return data
  }

  searchFilter = (data) => {
    const term = this.state.search;
    if (term) {
      return data.filter((el) => el.label.toLowerCase().includes(term));
    }

    return data;
  }

  onSearch = (text) => {
    this.setState({ search: text });
  }

  render() {

    const todoDone = this.state.todoData ? this.state.todoData.filter((el) => el.done).length : 0;

    return (
      <div className="todo-app">
        <AppHeader toDo={this.todoQtty - todoDone} done={todoDone} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearch={this.onSearch} />
          <ItemStatusFilter
            activeFilter={this.state.filter}
            onSelected={this.onFilterSelected} />
        </div>

        <TodoList
          todos={
            this.statusFilter(
              this.searchFilter(this.state.todoData))
          }
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
          onDeleted={this.deleteItem} />
        <ItemAddForm
          onAdded={this.addItem} />
      </div>
    );
  }

}
