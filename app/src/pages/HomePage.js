import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class MasterPage extends Component {
  render() {
    return (
      <div className="overview-page tg-centered-container">
        <div className="tg-card">
          <Link to="/overview">Game Master</Link>
          <br/>
          <Link to="/player">Player</Link>
        </div>
      </div>
    );
  }
}
