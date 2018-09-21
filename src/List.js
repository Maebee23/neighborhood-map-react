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
    const darkSkyPark = 'This is a Cartified International Dark Sky Park.';

    return (
      <div>
        <Card
          reverse
          style={{
            background: 'white',
            marginBottom: '1rem',
            textAlign: 'center',
            maxHeigh: '400px'
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
                  // width="100%"
                  height="200px"
                />
                <figcaption>
                  Photo by {artistName}, view on
                  <a href={userProfile}> Flickr</a>
                </figcaption>
              </div>
            );
          })}
          <CardBody cascade>
            <CardTitle style={{ font: 'bold', margin: '1rem' }}>
              {' '}
              {fullName}
            </CardTitle>
            <CardText>{venue.isIDSP === 'True' ? darkSkyPark : null}</CardText>
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
