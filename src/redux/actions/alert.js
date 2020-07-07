import { SET_ALERT, REMOVE_ALERT } from './types';

const setAlert = (msg, alertType) => dispatch => {
  const id = Date.now();
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id
    }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};

export default setAlert;