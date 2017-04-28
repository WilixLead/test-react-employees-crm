import { combineReducers } from 'redux';
import Employee from './employee';
import Department from './department';

export default combineReducers({
  employees: Employee,
  departments: Department
})