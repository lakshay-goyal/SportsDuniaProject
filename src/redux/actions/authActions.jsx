export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const login = (email, password) => {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: LOGIN_SUCCESS });
    }, 1000);
  };
};

export const logout = () => ({ type: LOGOUT });

