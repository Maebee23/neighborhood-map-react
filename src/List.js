import React, { Component } from 'react';

class List extends Component {
  render() {
    const { venue, id } = this.props;

    return (
      <div>
        <div style={{ background: 'white' }}>
          {' '}
          {venue.name}
          {/* <i
              onClick={() =>
                this.setState({
                  showParkInfo: !this.state.showParkInfo
                })
              }
              className="fa fa-plus-square-o"
              style={{
                display: 'inline',
                float: 'right',
                color: '#252f69',
                cursor: 'pointer',
                margin: '0'
              }}
            /> */}
          <p>{venue.location.address}</p>
          <button onClick={() => this.props.CenterControl(id)}>
            View Park!
          </button>
        </div>
      </div>
    );
  }
}

export default List;
