import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './alert.css'

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert-alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStatesToProps = state => ({
  alerts: state.alert
});

export default connect(mapStatesToProps)(Alert);