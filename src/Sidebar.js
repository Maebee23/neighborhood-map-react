import React, { Component } from 'react';
import List from './List';

class Sidebar extends Component {
  state = {
    showParkInfo: false
  };
  render() {
    const { displayedParks } = this.props;
    return (
      <div
        className="container"
        style={{
          width: '25%',
          height: '100vh',
          backgroundColor: '#2ba86a',
          zIndex: 10000,
          margin: 0,
          position: 'absolute',
          overflow: 'scroll'
        }}
      >
        <h1>View the stars of Texas</h1>
        <div
          style={{
            background: 'white',
            padding: '1rem',
            fontSize: '18px'
          }}
        >
          In 2001 John E Bortle created a 9 point numeric scale quantifying the
          effect of light pollution on the observability of celestial objects, 9
          being inner city, 5 being and 1 being considered "Excellent Dark Sky".
          Gour State Parks in Texas are certified Internations Dark Sky Parks
          and are considered to have exceptional or distinguished night skies.
          You can read more about IDSPs{' '}
          <a href="http://darksky.org/idsp/parks/">here</a> This map focuses on
          state parks in Texas that fall below the level of "suburban" light
          pollution.
        </div>
        <div className="form-group" mt="1rem">
          <label
            htmlFor="bortleScaleSelection"
            style={{ color: 'white', fontSize: ' 24px' }}
          >
            Bortle Scale Rating
          </label>
          <select
            className="form-control"
            name="ratin"
            id="bortleScaleSelection"
            onChange={e => this.props.filterMap(e.target.value)}
          >
            <option value="All"> All</option>
            <option value="1">1 Excellent Dark-Sky Site</option>
            <option value="2">2 Typical Truly dark Site</option>
            <option value="3">3 Rural Sky</option>
            <option value="4">4 Rural/Suburban Transition</option>
          </select>
        </div>
        <div>
          {displayedParks.map(venue => (
            <List
              bortleScale={venue.bortleScale}
              displayedParks={this.props.displayedParks}
              venue={venue}
              key={venue.id}
              id={venue.id}
              name={venue.name}
              fullName={venue.fullName}
              images={this.props.images}
              CenterControl={this.props.CenterControl}
            />
          ))}
        </div>
        <div>
          Icons made by{' '}
          <a href="http://www.freepik.com" title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>{' '}
          is licensed by{' '}
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
          >
            CC 3.0 BY
          </a>
        </div>
      </div>
    );
  }
}

export default Sidebar;
