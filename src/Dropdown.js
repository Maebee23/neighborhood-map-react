import React, { Component } from 'react';

class Dropdown extends Component {
  render() {
    return (
      <React.Fragment>
        {/* change displayed parks in sidebar and map based on selection */}
        <div className="form-group" mt="1rem">
          <label
            htmlFor="bortleScaleSelection"
            style={{ color: 'white', fontSize: ' 24px' }}
          >
            Bortle Scale Rating
          </label>
          <select
            className="form-control"
            aria-label="bortle scale rating"
            role="listbox"
            aria-expanded="true"
            value={this.props.selectedValue}
            name="rating"
            id="bortleScaleSelection"
            onChange={e => this.props.filterMap(e.target.value)}
          >
            <option value="All" role="option">
              {' '}
              All
            </option>
            <option value="1" role="option">
              1 Excellent Dark-Sky Site
            </option>
            <option value="2" role="option">
              2 Typical Truly dark Site
            </option>
            <option value="3" role="option">
              3 Rural Sky
            </option>
            <option value="4" role="option">
              4 Rural/Suburban Transition
            </option>
          </select>
        </div>
      </React.Fragment>
    );
  }
}

export default Dropdown;
