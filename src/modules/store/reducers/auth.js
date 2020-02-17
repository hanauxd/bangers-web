import { AUTH_SUCCESS } from '../actions/actionTypes';
import createReducer from './createReducer';

const initialState = {
  auth: null
}

const authSuccessReducer = (state = initialState, { payload }) => {
  return {
    ...state,
    auth: {
      ...payload
    }
  }
}

export default createReducer(initialState, {
  [AUTH_SUCCESS]: authSuccessReducer,
})