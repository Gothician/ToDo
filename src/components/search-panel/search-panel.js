import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    search: ''
  };

  onSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    this.setState({ search: term })
    this.props.onSearch(term);
  }

  render() {
    return (
      <input type="text"
        className="form-control search-input"
        onChange={this.onSearchChange}
        value={this.state.search}
        placeholder="type to search" />
    );
  }
}

// const SearchPanel = ({ onSearch }) => {

//   const onSearchChange = (e) => {
//     onSearch(e.target.value.toLowerCase());
//   }

//   return (
//     <input type="text"
//       className="form-control search-input"
//       onChange={onSearchChange}
//       placeholder="type to search" />
//   );
// };

// export default SearchPanel;
