import React from 'react';
import './fetchingLabel.css';

export const FetchingLabel = ({text}) => {
    return (
        <label className="fetching-label">
            {text}
        </label>    
    )
}