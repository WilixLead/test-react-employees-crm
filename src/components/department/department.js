import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Table, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {findDOMNode} from 'react-dom';
import {addDepartment, getDepartment, deleteDepartment, updateDepartment} from '../../actions/department-actions';
import "./department.scss";

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: 0,
      inputValue: ""
    }
  }

  componentDidMount() {
    this.props.onGetDepartment();
  }

  handleAddDepartmentClick() {
    const departmentName = findDOMNode(this.refs.departmentNameInput).value;
    findDOMNode(this.refs.departmentNameInput).value = "";
    this.props.onAddDepartment(departmentName);
  }

  handleDeleteDepartmentClick(departmentId) {
    this.props.onDeleteDepartment(departmentId);
  }

  toggleElement(department) {
    this.setState({inputValue: department.name, editMode: department.id});
  }

  handleChange(e) {
    this.setState({inputValue: e.target.value});
  }

  handleUpdateDepartmentClick(departmentId) {
    this.props.onUpdateDepartment(departmentId, this.state.inputValue);
    this.setState({editMode: 0});
  }

  render() {
    let departments = this.props.departments.length && this.props.departments.map((department, index) => {
        let departmentItemName;
        if (this.state.editMode !== department.id) {
          departmentItemName = (
            <div className="department-item-name">
              <a href
                title="Click for edit this text"
                onClick={e => { e.preventDefault(); this.toggleElement(department)}} key={index}>
              {department.name}
              </a>
            </div>)
        } else {
          departmentItemName = (
            <div>
              <Input type="text"
                     name="departmentName"
                     className="department-item-input"
                     id="departmentName"
                     key={department.id}
                     ref="departmentNameInput"
                     value={this.state.inputValue}
                     onChange={e => this.handleChange(e)}
              />
              <Button color="success"
                      onClick={e => this.handleUpdateDepartmentClick(department.id)}>
                Save
              </Button>
            </div>)
        }
        return (
          <tr className="department-item" key={department.id}>
            <th scope="row">{department.id}</th>
            <td className="department-item-raw">
              {departmentItemName}
            </td>
            <td>
              <Button color="danger" className="delete-department-button"
                      onClick={e => this.handleDeleteDepartmentClick(department.id)}>Delete</Button>{' '}
            </td>
          </tr>
        );
      });
    return (
      <div className="department-list">
        <Form inline>
          <FormGroup>
            <Label for="departmentName">Name</Label>{' '}
            <Input type="text" name="departmentName" id="departmentName" ref="departmentNameInput"/>
          </FormGroup>
          {' '}
          <Button onClick={e => this.handleAddDepartmentClick()}>Add</Button>
        </Form>
        <Table>
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
          {
            departments
          }
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    departments: state.departments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddDepartment: (name) => {
      dispatch(addDepartment(name));
    },
    onGetDepartment: () => {
      dispatch(getDepartment());
    },
    onDeleteDepartment: (departmentId) => {
      dispatch(deleteDepartment(departmentId))
    },
    onUpdateDepartment: (departmentId, departmentName) => {
      dispatch(updateDepartment(departmentId, departmentName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Department)