import React from 'react';
import { MdBackspace, MdModeEdit } from "react-icons/md";


const Rack = (props) => {
    return (
      <div id="word" key={props.index}>
      <span>{props.word}</span>
      <span className="delete" onClick={props.onClick}>
          <MdBackspace style={{ color: "#e15b64", fontSize: 24 }} />
      </span>
  </div>
    )
}

export default Rack;