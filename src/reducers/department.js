import {GET_DEPARTMENT} from '../constants/department';

const initialState = {};

export default function Department(state = initialState, action) {
  switch (action.type) {
    case GET_DEPARTMENT:
     return action.payload;
    default:
      return state;
  }
}