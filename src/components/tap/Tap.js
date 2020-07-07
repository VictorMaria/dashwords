import React from 'react';

const Tap = ({ children, onClick, className }) => {
    return (
        <button>
           <span className={className} onClick={onClick}>
           {children}
           </span> 
        </button>
    )
};

export default Tap;