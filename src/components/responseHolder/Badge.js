import React from 'react';
import { MdDone } from 'react-icons/md';
import './badge.css';

export const Badge = () => {
    return (
        <label id='info'>
            <MdDone style={{ color: "#256188", fontSize: 45, backgroundColor: "black" }} />&nbsp;Connected&nbsp;
        </label>
    );
}