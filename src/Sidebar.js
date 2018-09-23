import React, { Component } from 'react';
import List from './List';
import Dropdown from './Dropdown';
import './Sidebar.css';

class Sidebar extends Component {
  state = {
    showParkInfo: false
  };
  render() {
    const { displayedParks } = this.props;
    return (
      <div>
        {/* if sidebar is active open, show content */}
        {this.props.isActive ? (
          <div id="container">
            <div id="description" tabIndex="0">
              In 2001 John E Bortle created a 9 point numeric scale quantifying
              the effect of light pollution on the observability of celestial
              objects, 9 being inner city, 5 being suburban, and 1 being
              considered "Excellent Dark Sky". Four State Parks in Texas are
              Certified International Dark Sky Parks and are considered to have
              exceptional or distinguished night skies and environments
              culltivated for night sky viewing. You can read more about IDSPs{' '}
              <a href="http://darksky.org/idsp/parks/">here</a>. This map
              focuses on state parks in Texas that fall below the level of
              "suburban" light pollution.
            </div>
            <Dropdown
              filterMap={this.props.filterMap}
              selectedValue={this.props.selectedValue}
              ariaSelect={this.props.ariaSelect}
            />
            <div>
              {/* loop through displayed parks */}
              {displayedParks.map(venue => (
                <List
                  bortleScale={venue.bortleScale}
                  displayedParks={this.props.displayedParks}
                  venue={venue}
                  key={venue.id}
                  id={venue.id}
                  name={venue.name}
                  address={venue.address}
                  fullName={venue.fullName}
                  images={this.props.images}
                  CenterControl={this.props.CenterControl}
                />
              ))}
            </div>
            <div tabindex="0">
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
        ) : null}
      </div>
    );
  }
}

export default Sidebar;
