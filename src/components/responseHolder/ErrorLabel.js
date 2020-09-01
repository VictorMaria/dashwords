import React from 'react';
import './errorLabel.css';

export const ErrorLabel = ({text}) => {
    return (
        <label className="error-label">
            {text}
        </label>    
    )
}