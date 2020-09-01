import React from 'react';
import { MdDone } from 'react-icons/md';
import './badge.css';

export const Badge = () => {
    return (
        <label>
            <span id='icon'><MdDone style={{ color: "#2196F3", fontSize: 45 }} /></span><label id='info'>Connected</label>
        </label>
    );
}