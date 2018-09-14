import React, { Component } from 'react';
import List from './List';

class Sidebar extends Component {
  state = {
    showParkInfo: false
  };
  render() {
    const venues = this.props;
    return (
      <div
        className="container"
        style={{
          width: '30%',
          height: '100vh',
          backgroundColor: '#2ba86a',
          zIndex: 10000,
          margin: 0,
          position: 'absolute'
        }}
      >
        <h1>Parks of Texas</h1>
        <select name="area" id="select-area">
          <option value="NORTH" />
          <option value="CENTRAL" />
          <option value="SOUTH" />
          <option value="WEST" />
          <option value="COAST" />
        </select>
        <div>
          {this.props.venues.map(venue => (
            <List
              venue={venue.venue}
              key={venue.venue.id}
              id={venue.venue.id}
              location={venue.venue.location}
              CenterControl={this.props.CenterControl}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Sidebar;
