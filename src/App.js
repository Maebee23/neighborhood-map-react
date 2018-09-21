import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import tent from './camping2.png';

class App extends Component {
  state = {
    venues: [],
    markersArray: [],
    images: [],
    displayedParks: [],
    parknames: [],
    map: {}
  };
  componentDidMount() {
    this.getVenues();
    this.getImages();
    this.renderMap();
  }

  // render map
  renderMap = () => {
    loadScript(
      'https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyCFK8xmuYaHuWbtX1USmrmA_QSYDKiRRDo&callback=initMap'
    );

    window.initMap = this.initMap;
  };

  // fetch images from flickr
  getImages = () => {
    let url =
      'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=dabd9a1d8e221d07b58e1ecfeb2499a2&gallery_id=72157701441489725&extras=owner_name&format=json&nojsoncallback=1';
    axios
      .get(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        credentials: 'include'
      })
      .then(response => {
        console.log('dat', response);
        console.log(response.data);
        this.setState({
          images: response.data.photos.photo
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  // fetch(
  //   ' https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=288cccc2c3acff978c00c12650c7882d&gallery_id=72157701441489725&format=json&nojsoncallback=1'
  // )
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data);
  //     this.setState({ images: data.photos.photo });
  //   })
  //   .catch(error => console.log(error));
  // };

  // retrieve parks from local parks.json
  getVenues = () => {
    fetch('parks.json')
      .then(res => res.json())
      .then(data => {
        console.log(data.data);
        this.setState({ venues: data.data });
      })

      .catch(error => {
        console.log(error);
      });
  };

  // filter map markers based on bortle scale ratings
  filterMap = value => {
    console.log(value);

    this.hideMarkers();
    const filtered = [];
    if (value !== 'All') {
      this.state.markersArray
        .filter(marker => marker.bortleScale === value)
        .map(marker => {
          marker.setMap(this.state.map);
          this.state.map.setCenter(marker.getPosition());
        });
      this.state.venues.filter(venue => venue.bortleScale === value).map(
        venue => filtered.push(venue),

        this.setState({ displayedParks: filtered })
      );
    } else {
      // If All is selected, make sure all markers are displayed
      this.showMarkers();
      this.state.venues.map(venue => filtered.push(venue));
      this.setState({ displayedParks: filtered });
      this.state.map.setCenter({ lat: 31.169621, lng: -99.683617 });
      this.state.map.setZoom(7);
    }
    console.log(this.state.displayedParks);
  };

  // hide markers
  hideMarkers = () => {
    this.state.markersArray.map(marker => marker.setMap(null));
  };

  // show markers
  showMarkers = () => {
    this.state.markersArray.map(marker => marker.setMap(this.state.map));
  };

  // control map marker animation and map center on "View Park!" click event
  CenterControl = id => {
    console.log(id);
    this.state.markersArray.map(marker => marker.setAnimation(null));

    this.state.markersArray
      .filter(marker => marker.id === id && marker.getAnimation() === null)
      .map(marker => {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        this.state.map.setCenter(marker.getPosition());
        this.state.map.setZoom(10);
      });
  };

  // initialize maps, markers, and infowindows
  initMap = () => {
    let park = [];
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 31.169621, lng: -99.683617 },
      zoom: 10,
      mapTypeId: 'terrain'
    });

    const infoWindow = new window.google.maps.InfoWindow();
    const bounds = new window.google.maps.LatLngBounds();

    // Create Markers dynamically by mapping over parks
    let markers = this.state.venues.map(venue => {
      let contentStr = `<div><h2>${venue.fullName}</h2>\
                   <p>${venue.address}</p>\
                    <h6>Clear Sky Chart Cloud Cover and Transparency</h6>
                    <img alt="${venue.fullName} clear sky chart" src=${
        venue.img
      }/>\
                    <figcaption>Detailed information including descriptions of chart values can be viewed <a href=${
                      venue.link
                    }> here</a></figcaption>
                   </div>`;

      // if (venue.fullName) {
      //   contentStr = `${venue.fullName}`;
      // } else if (venue.name && !venue.address) {
      //   contentStr = `${venue.name} No address available!`;
      // } else {
      //   contentStr = '<h1>No information available</h1>';
      // }

      const marker = new window.google.maps.Marker({
        position: {
          lat: venue.location.lat,
          lng: venue.location.lng
        },
        map: map,
        id: venue.id,
        title: venue.name,
        icon: tent,
        bortleScale: venue.bortleScale,
        animation: null
      });

      marker.addListener('click', function() {
        infoWindow.setContent(contentStr);
        infoWindow.open(map, marker);
        map.setZoom(14);
        map.setCenter(marker.getPosition());
        marker.setAnimation(null);
      });

      map.addListener('click', function() {
        marker.setAnimation(null);
        map.setZoom(8);
      });

      bounds.extend(marker.position);
      park.push(venue);
      return marker;
    });

    this.setState({ displayedParks: park });
    this.setState({ markersArray: markers });
    this.setState({ map });
    map.fitBounds(bounds);
  };

  render() {
    return (
      <div className="app">
        <Sidebar
          venues={this.state.venues}
          images={this.state.images}
          displayedParks={this.state.displayedParks}
          CenterControl={this.CenterControl}
          filterMap={this.filterMap}
        />

        <div id="map">loading map....</div>
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
