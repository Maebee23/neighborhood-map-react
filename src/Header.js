import React, { Component } from 'react';
import './Header.css';

export default class extends Component {
  render() {
    return (
      <div>
        {/* toggle sidebar */}
        <nav className="navbar navbar-dark navbar-1">
          <h1 className="header">Viewing the skies of Texas</h1>
          <button
            className="navbar-toggler"
            type="button"
            aria-expanded={this.props.ariaSelect}
            aria-label="Toggle navigation"
            onClick={this.props.toggleSideNav}
          >
            <span class="navbar-toggler-icon" />
          </button>
        </nav>
      </div>
    );
  }
}
