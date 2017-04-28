import React, { Component } from 'react'
import { Router, Route, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Nav, NavItem, NavLink } from 'reactstrap';
import Employee from '../components/employee/employee';
import Department from '../components/department/department';

class App extends Component {
  render() {
    return (
        <Row>
          <Col xs='2'>
            <Nav>
              <NavItem>
                <NavLink href='/#/employees'>Employees</NavLink>
                <NavLink href='/#/departments'>Departments</NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col xs='10'>
            {this.props.children}
          </Col>
        </Row>
    );
  }
}

function mapStateToProps (state) {
  return {
    department: state.departments,
    employees: state.employees
  }
}

export default connect(mapStateToProps)(App)