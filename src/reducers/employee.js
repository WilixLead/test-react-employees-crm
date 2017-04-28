import {GET_EMPLOYEES} from "../constants/employee";

const initialState = {};

export default function Employee(state = initialState, action) {
  switch(action.type) {
    case GET_EMPLOYEES:
      return action.payload;
    default:
      return state;
  }
}