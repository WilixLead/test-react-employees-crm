import $ from 'jquery';
import {GET_DEPARTMENT} from '../constants/department';

export function addDepartment(departmentName) {
  return dispatch => {
    let data = {"name": departmentName};
    $.ajax({
      method: 'POST',
      dataType : "json",
      contentType: "application/json",
      data : JSON.stringify(data),
      url: 'http://localhost:3000/departments/'
    }).then(data => {
      $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/departments/'
      }).then(data => {
        return dispatch({
          type: GET_DEPARTMENT,
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

export function getDepartment(){
  return dispatch => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/departments/'
    }).then(data => {
      return dispatch({
        type: GET_DEPARTMENT,
        payload:  data
      });
    }).catch(err => {
      console.error(err);
    })
  }
}

export function deleteDepartment(departmentId) {
  return dispatch => {
    $.ajax({
      method: 'DELETE',
      url: 'http://localhost:3000/departments/' + departmentId
    }).then(() => {
      $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/departments/'
      }).then(data => {
        return dispatch({
          type: GET_DEPARTMENT,
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


export function updateDepartment(departmentId, departmentName) {
  return dispatch => {
    let data = {"name": departmentName};
    $.ajax({
      method: 'PUT',
      dataType : "json",
      contentType: "application/json",
      data : JSON.stringify(data),
      url: 'http://localhost:3000/departments/' + departmentId
    }).then(data => {
      $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/departments/'
      }).then(data => {
        return dispatch({
          type: GET_DEPARTMENT,
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