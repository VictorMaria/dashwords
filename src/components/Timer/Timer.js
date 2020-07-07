import React from "react";
import PropTypes from "prop-types";

const Timer = ({ time, isActive }) => {
  const formatToTwoDigits = (figure) => {
    return figure > 9 ? "" + figure : "0" + figure;
  }
  const formatToHHMMSS = seconds => {
    const hour = formatToTwoDigits(Math.floor(seconds / 3600));
    const minute = formatToTwoDigits(Math.floor((seconds % 3600) / 60));
    const second = formatToTwoDigits(Math.floor((seconds % 3600) % 60));

    if (parseInt(hour, 10) > 0) {
      return `${hour}:${minute}:${second}`;
    } else {
      return `${minute}:${second}`;
    }
  };

  const remainingTime = formatToHHMMSS(time);
  return (
    <div className="TimeDisplay">
      <h2
        className={`TimeDisplay-time ${
          isActive && time <= 10 ? "blinking" : ""
        } ${isActive && time <= 20 ? "red" : ""}`}
      >
        Time Left: {remainingTime}
      </h2>
    </div>
  );
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default Timer;