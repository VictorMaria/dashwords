import React, { Component } from 'react';
import './rackAndScore.css';

class RackAndScore extends Component {
    render() {
        const { scoredRack, currentRackScore } = this.props;
        return (
            <div className="scored-rack">
              <div>
                {scoredRack}
              </div>
              <div>{currentRackScore}</div>
            </div>
        )
    }
}

export default RackAndScore;