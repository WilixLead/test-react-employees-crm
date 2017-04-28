import $ from 'jquery';
import {GET_EMPLOYEES} from "../constants/employee";

export function addEmployee(firstName, lastName, department) {
  return dispatch => {
    let data = {
      "firstName": firstName,
      "lastName": lastName,
      "departmentId": department,
    };
    $.ajax({
      method: 'POST',
      dataType : "json",
      contentType: "application/json",
      data : JSON.stringify(data),
      url: 'http://localhost:3000/employees/'
    }).then(data => {
      $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/employees/'
      }).then(data => {
        return dispatch({
          type: GET_EMPLOYEES,
          payload:  data
        });
      }).catch(err => {
        console.error(err);
      })
    }).catch(err => {
      console.error(err);
    })
  }
}

export function getEmployees(){
  return dispatch => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/employees/'
    }).then(data => {
      return dispatch({
        type: GET_EMPLOYEES,
        payload:  data
      });
    }).catch(err => {
      console.error(err);
    })
  }
}

export function deleteEmployee(employeeId) {
  return dispatch => {
    $.ajax({
      method: 'DELETE',
      url: 'http://localhost:3000/employees/' + employeeId
    }).then(() => {
      $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/employees/'
      }).then(data => {
        return dispatch({
          type: GET_EMPLOYEES,
          payload:  data
        });
      }).catch(err => {
        console.error(err);
      })
    }).catch(err => {
      console.error(err);
    })
  }
}

export function updateEmployee(employeeId, firstName, lastName, department) {
  return dispatch => {
    let data = {
      "firstName": firstName,
      "lastName": lastName,
      "departmentId": department,
    };
    $.ajax({
      method: 'PUT',
      dataType : "json",
      contentType: "application/json",
      data : JSON.stringify(data),
      url: 'http://localhost:3000/employees/' + employeeId
    }).then(data => {
      $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/employees/'
      }).then(data => {
        return dispatch({
          type: GET_EMPLOYEES,
          payload:  data
        });
      }).catch(err => {
        console.error(err);
      })
    }).catch(err => {
      console.error(err);
    })
  }
}