import React, { Component } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardImage,
  CardTitle,
  CardText
} from 'mdbreact';

class List extends Component {
  render() {
    const { id, images, fullName, name, venue } = this.props;
    const darkSkyPark = 'This is a Certified International Dark Sky Park.';

    return (
      <div>
        <Card
          reverse
          style={{
            background: 'white',
            marginBottom: '1rem',
            textAlign: 'center',
            maxHeigh: '400px',
            width: '100%'
          }}
        >
          {images.filter(image => image.title.includes(name)).map(image => {
            const path = `https://farm${image.farm}.staticflickr.com/${
              image.server
            }/${image.id}_${image.secret}.jpg`;
            const userProfile = `https://www.flickr.com/photos/${image.owner}`;
            const artistName = image.ownername;
            return (
              <div key={image.id}>
                <CardImage
                  cascade
                  className="img-fluid"
                  alt={venue.fullName}
                  src={path}
                  height="200px"
                  width="100%"
                  tabIndex="0"
                />
                <figcaption tabIndex="0">
                  Photo by {artistName}, view on
                  <a href={userProfile}> Flickr</a>
                </figcaption>
              </div>
            );
          })}
          <CardBody cascade>
            <CardTitle style={{ font: 'bold', margin: '1rem' }} tabIndex="0">
              {' '}
              {fullName}
            </CardTitle>
            <CardText style={{ fontSize: '1rem' }} tabIndex="0">
              {venue.isIDSP === 'True' ? darkSkyPark : null}
              <span>{venue.address}</span>
            </CardText>
            <Button
              color="success"
              onClick={() => this.props.CenterControl(id)}
            >
              View Park!
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default List;
