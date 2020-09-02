import React from 'react';
import "./beamingDot.css";
import "./redBeamingDot.css";

export const BeamingDot = () => {
  return (
    <div className="animation_main_div">
      <div className="circle"></div>
      <div className="circle-two"></div>
      <div className="circle-three"></div>
      <div className="circle-four"></div>
      <div className="logo">
      </div>
</div>
  );
}

export const RedBeamingDot = () => {
  return (
    <div className="red-animation_main_div">
      <div className="red-circle"></div>
      <div className="red-circle-two"></div>
      <div className="red-circle-three"></div>
      <div className="red-circle-four"></div>
      <div className="red-logo">
      </div>
</div>
  );
}