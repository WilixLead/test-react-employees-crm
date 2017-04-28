import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Table, Form, FormGroup, Label, Input, Button, Row, Col} from 'reactstrap';
import {findDOMNode} from 'react-dom';
import {getEmployees, addEmployee, deleteEmployee, updateEmployee} from '../../actions/employee-actions';
import {getDepartment} from '../../actions/department-actions';
import "./employee.scss";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: 0,
      firstNameInputValue: "",
      lastNameInputValue: "",
      departmentValue: ""
    }
  }

  componentDidMount() {
    this.props.onGetDepartment();
    this.props.onGetEmployees();
  }

  getDepartmentName(departmentId) {
    if (this.props.departments.length) {
      const department = this.props.departments.find((department) => {
        return department.id === parseInt(departmentId);
      });
      return department.name;
    }
  }

  handleAddEmployeeClick() {
    const firstName = findDOMNode(this.refs.firstNameInput).value;
    const lastName = findDOMNode(this.refs.lastNameInput).value;
    const department = findDOMNode(this.refs.departmentSelect).value;
    this.props.onAddEmployee(firstName, lastName, department);
    findDOMNode(this.refs.firstNameInput).value = "";
    findDOMNode(this.refs.lastNameInput).value = "";
    findDOMNode(this.refs.departmentSelect).value = "";
  }

  handleDeleteEmployeeClick(employeeId) {
    this.props.onDeleteEmployee(employeeId);
  }

  toggleFirstNameElement(employee) {
    this.setState({
      firstNameInputValue: employee.firstName,
      lastNameInputValue: employee.lastName,
      departmentValue: this.getDepartmentName(employee.departmentId),
      editMode: employee.id
    });
  }

  handleFirstNameChange(e) {
    this.setState({firstNameInputValue: e.target.value});
  }

  handleLastNameChange(e) {
    this.setState({lastNameInputValue: e.target.value});
  }

  handleDepartmentChange(e) {
    this.setState({departmentValue: e.target.value});
  }

  handleUpdateEmployeeClick(employeeId) {
    this.props.onUpdateEmployee(employeeId, this.state.firstNameInputValue, this.state.lastNameInputValue, findDOMNode(this.refs.employeeDepartmentSelect).value);
    this.setState({editMode: 0});
  }


  render() {
    let employees = this.props.employees.length && this.props.employees.map((employee, index) => {
        let employeeFirstNameData;
        let employeeLastNameData;
        let employeeDepartment;
        if (this.state.editMode !== employee.id) {
          employeeFirstNameData = (
            <div className="employee-item-first-name">
              <a href title="Click here for edit"
                onClick={e => { e.preventDefault(); this.toggleFirstNameElement(employee) }} key={index}>
                 {employee.firstName}
              </a>
            </div>);
          employeeLastNameData = (
            <div className="employee-item-last-name">
              <a href title="Click here for edit"
                onClick={e => { e.preventDefault(); this.toggleFirstNameElement(employee) }} key={index}>
                {employee.lastName}
              </a>
            </div>);
          employeeDepartment = (
            <div className="employee-item-last-name">
              <a href title="Click here for edit"
                onClick={e => { e.preventDefault(); this.toggleFirstNameElement(employee) }} key={index}>
                {this.getDepartmentName(employee.departmentId)}
              </a>
            </div>
          );
        } else {
          employeeFirstNameData = (
            <div>
              <Input type="text"
                     name="firstName"
                     className="first-name-item-input"
                     id="firstName"
                     key={employee.id}
                     ref="firstNameInput"
                     value={this.state.firstNameInputValue}
                     onChange={e => this.handleFirstNameChange(e)}
              />
            </div>);
          employeeLastNameData = (
            <div>
              <Input type="text"
                     name="lastName"
                     className="last-name-item-input"
                     id="lastName"
                     key={employee.id}
                     ref="lastNameInput"
                     value={this.state.lastNameInputValue}
                     onChange={e => this.handleLastNameChange(e)}
              />
            </div>);
          employeeDepartment = (
            <div>
              <Input type="select"
                     name="employeeDepartment"
                     id="employeeDepartment"
                     ref="employeeDepartmentSelect"
                     className="employee-department-select"

                     onChange={e => this.handleDepartmentChange(e)}>
                {
                  this.props.departments.length && this.props.departments.map((department) => {
                    if (department.id === parseInt(employee.departmentId)) {
                      return <option key={department.id} value={department.id}
                                     selected="true">{department.name}</option>;
                    } else {
                      return <option key={department.id} value={department.id}>{department.name}</option>;
                    }
                  })
                }
              </Input>
              <Button color="success"
                      onClick={e => this.handleUpdateEmployeeClick(this.state.editMode)}>
                Save
              </Button>
            </div>
          )

        }

        return (
          <tr key={employee.id} className="employee-item">
            <th scope="row">{employee.id}</th>
            <td className="first-name-td">{employeeFirstNameData}</td>
            <td className="last-name-td">{employeeLastNameData}</td>
            <td className="department-td">{employeeDepartment}</td>
            <td>
              <Button color="danger" className="delete-department-button"
                      onClick={e => this.handleDeleteEmployeeClick(employee.id)}>Delete</Button>{' '}
            </td>
          </tr>
        );
      });

    let departmentList = this.props.departments.length && this.props.departments.map((department) => {
        return <option key={department.id} value={department.id}>{department.name}</option>;
      });
    return (
      <div className="employee-item">

        <Form inline className="employee-add-form">
          <FormGroup>
            <Row>
              <Col xs="6" sm="4">
                <FormGroup>
                  <Label for="firstName">First Name</Label>{' '}
                  <Input type="text" name="firstName" id="firstName" ref="firstNameInput"/>
                </FormGroup>
              </Col>
              <Col xs="6" sm="4">
                <FormGroup>
                  <Label for="lastName">Last Name</Label>{' '}
                  <Input type="text" name="lastName" id="lastName" ref="lastNameInput"/>
                </FormGroup>
              </Col>
              <Col xs="6" sm="4">
                <FormGroup className="employee-item-group-department">
                  <Label for="department" className="employee-item-department">Department</Label>
                  <Input type="select" name="department" id="department" ref="departmentSelect">
                    {departmentList}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </FormGroup>
          {' '}
          <Button onClick={e => this.handleAddEmployeeClick()}>Add</Button>
        </Form>
        <Table>
          <thead>
          <tr>
            <th>#</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Deparment</th>
          </tr>
          </thead>
          <tbody>
          {employees}
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employees: state.employees,
    departments: state.departments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onGetDepartment: () => {
      dispatch(getDepartment());
    },
    onGetEmployees: () => {
      dispatch(getEmployees());
    },
    onAddEmployee: (firstName, lastName, department) => {
      dispatch(addEmployee(firstName, lastName, department));
    },
    onDeleteEmployee: (employeeId) => {
      dispatch(deleteEmployee(employeeId))
    },
    onUpdateEmployee: (employeeId, firstName, lastName, department) => {
      dispatch(updateEmployee(employeeId, firstName, lastName, department))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee)