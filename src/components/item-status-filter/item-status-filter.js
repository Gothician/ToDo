import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  buttons = [
    { name: 'all', label: "All" },
    { name: 'active', label: "Active" },
    { name: 'done', label: "Done" }
  ];

  render() {
    const { activeFilter, onSelected } = this.props;

    const jsxButtons = this.buttons.map(({ name, label, className }) => {
      return (
        < button
          type="button"
          key={name}
          className={activeFilter === name
            ? "btn btn-info"
            : "btn btn-outline-secondary"}
          onClick={() => onSelected(name)} >
          {label}</ button >
      )
    });

    return (
      <div className="btn-group">
        {jsxButtons}
      </div>
    );
  }
} 