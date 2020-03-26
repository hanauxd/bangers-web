import { AUTH_SUCCESS, LOGOUT_SUCCESS } from "../actions/actionTypes";
import createReducer from "./createReducer";

const initialState = {
    auth: null,
    authCheckLoading: true
};

const authSuccessReducer = (state = initialState, { payload }) => {
    return {
        ...state,
        auth: payload
            ? {
                  ...payload
              }
            : null,
        authCheckLoading: false
    };
};

const logoutSuccessReducer = (state = initialState, { payload }) => {
    return {
        ...state,
        auth: null
    };
};

export default createReducer(initialState, {
    [AUTH_SUCCESS]: authSuccessReducer,
    [LOGOUT_SUCCESS]: logoutSuccessReducer
});
