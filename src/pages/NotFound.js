import React from 'react';
import NotFoundImg from '../assets/images/404NotFound.png';

class NotFound extends React.Component {
  render() {
    return (
      <div className="not-found-page">
        <img src={ NotFoundImg } alt="NotFound" />
      </div>
    );
  }
}

export default NotFound;
