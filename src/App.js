import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    venues: [],
    markersArray: []
  };
  componentDidMount() {
    // this.renderMap();
    this.getVenues();
  }

  renderMap = () => {
    loadScript(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCFK8xmuYaHuWbtX1USmrmA_QSYDKiRRDo&callback=initMap'
    );

    window.initMap = this.initMap;
  };

  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
    const parameters = {
      client_id: 'WK3OI54YBJAMMAQVOGLY4MXEBHYX1MOXZ4IXAOVOQOGQOO1P',
      client_secret: 'KHU5ZT5V3UD1X5IFAWYBTBXLLBIQSOSQBYEU2HL4RU2AQPNU',
      query: 'outdoor',
      limit: 7,
      near: 'Tx',
      categoryId: '4bf58dd8d48988d1e4941735',
      v: 20180911
    };
    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(res => {
        console.log(res.data);
        this.setState(
          { venues: res.data.response.groups[0].items },
          this.renderMap()
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  CenterControl = id => {
    console.log(id);
    this.setState({ selectedLocationId: id });
  };

  initMap = () => {
    const center = { lat: 32.7767, lng: -96.797 };
    // const { selectedLocationlat } = this.state;
    // const { selectedLocationlng } = this.state;
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 8
    });

    const infoWindow = new window.google.maps.InfoWindow();
    const bounds = new window.google.maps.LatLngBounds();
    let markers = this.state.venues.map(venue => {
      let contentStr = '';
      // let animation = this.state.markersArray.filter(
      //   marker =>
      //     marker === this.state.selectedId
      //       ? (animation = window.google.maps.Animation.BOUNCE)
      //       : null
      // );

      const animation = window.google.maps.Animation.BOUNCE;

      if (venue.venue.name && venue.venue.location.address) {
        contentStr = `${venue.venue.name} Address: ${
          venue.venue.location.address
        }`;
      } else if (venue.venue.name && !venue.venue.location.address) {
        contentStr = `${venue.venue.name} No address available!`;
      } else {
        contentStr = '<h1>No information available</h1>';
      }

      const marker = new window.google.maps.Marker({
        position: {
          lat: venue.venue.location.lat,
          lng: venue.venue.location.lng
        },

        map: map,
        title: venue.venue.name,
        icon:
          'https://ss3.4sqi.net/img/categories_v2/parks_outdoors/campground_bg_44.png',
        id: venue.venue.id,
        animation: this.id === this.state.selectedId ? animation : null
      });

      marker.addListener('click', function() {
        infoWindow.setContent(contentStr);
        infoWindow.open(map, marker);
        map.setZoom(14);
        map.setCenter(marker.getPosition());
        console.log(marker.id);
      });

      // if (
      //   marker.getAnimation() === null &&
      //   marker.id === this.state.selectedId
      // ) {
      //   marker.setAnimation(window.google.maps.Animation.BOUNCE);
      // } else {
      //   marker.setAnimation(null);
      // }

      bounds.extend(marker.position);
      this.state.markersArray.push(marker.id);

      return markers;
    });

    map.fitBounds(bounds);
  };

  render() {
    return (
      <div className="app">
        <Sidebar
          venues={this.state.venues}
          CenterControl={this.CenterControl}
        />

        <div id="map" />
      </div>
    );
  }
}

// function from Yahya Elharony
function loadScript(url) {
  // first script tag selected
  const index = window.document.getElementsByTagName('script')[0];
  // script tag created
  const script = window.document.createElement('script');
  // define source
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
