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
    todoData: [],
    filter: 'all',
    search: ''
  }

  componentDidMount() {
    //Get data from localStorage
    const todoData = this.localStorageService.getTodoData();
    // Set initial state
    this.setState({
      todoData
    });
    // Set data length
    this.todoQtty = todoData.length;
  }

  updateTodoDataState = (todoData) => {
    // Put data to localStorage
    this.localStorageService.putTodoData(todoData)
    // Update state from localStorage
    this.setState({
      todoData: this.localStorageService.getTodoData()
    });
  }

  createTodoItem(label) {
    // Set todo proterties and increment actual data length
    return {
      id: this.todoQtty++ + 1,
      label: label,
      done: false,
      important: false
    }
  }

  addItem = (label) => {
    // Call update state function with new data
    this.updateTodoDataState({
      todoData: [...this.state.todoData, this.createTodoItem(label)]
    });
  }

  deleteItem = (id) => {
    // Decrement actual data length
    this.todoQtty--;
    //return array of todo elements with ids is not equal deleted id
    const todoData = this.state.todoData.filter((el) => el.id !== id);
    // Call update state function with new data
    this.updateTodoDataState({ todoData });

  }

  toggleProperty = (arr, id, propName) => {
    // Return todos attay with toggled property
    return arr.map((el) => {
      if (el.id === id) el.[propName] = !el.[propName];
      return el;
    })
  }

  onToggleDone = (id) => {
    // Call function to toggle property
    const todoData = this.toggleProperty(this.state.todoData, id, 'done');
    // Update state
    this.updateTodoDataState({ todoData });
  }

  onToggleImportant = (id) => {
    // Call function to toggle property
    const todoData = this.toggleProperty(this.state.todoData, id, 'important');
    // Update state
    this.updateTodoDataState({ todoData });
  }

  onFilterSelected = (id) => {
    this.setState({ filter: id });
  }

  statusFilter = (data) => {
    // Make choose, what data will be displayed (all, done or not done)
    if (this.state.filter !== 'all') return (this.state.filter === 'done')
      ? data.filter((el) => el.done)
      : data.filter((el) => !el.done);

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
