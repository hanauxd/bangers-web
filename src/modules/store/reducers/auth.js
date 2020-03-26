import { AUTH_SUCCESS, LOGOUT_SUCCESS } from "../actions/actionTypes";
import createReducer from "./createReducer";

const initialState = {
    auth: null
};

const authSuccessReducer = (state = initialState, { payload }) => {
    return {
        ...state,
        auth: {
            ...payload
        }
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
