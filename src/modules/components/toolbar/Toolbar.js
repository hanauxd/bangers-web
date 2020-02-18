import React from "react";
import { useHistory } from 'react-router-dom';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink,
  MDBNavbarToggler, MDBCollapse, MDBDropdown, MDBDropdownToggle,
  MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";

import { useCustomState } from './../../helpers/hooks';
import { connect } from 'react-redux';
import { logoutSuccess } from "../../store/actions/auth";

import styles from './Toolbar.module.css';

const Toolbar = props => {
  const history = useHistory();
  const [state, setState] = useCustomState({
    isOpen: false
  })

  const handleLogout = () => {
    props.onLogout();
    localStorage.clear();
  }

  const handleProfile = () => {
    history.push('/profile')
  }

  const toggleCollapse = () => {
    setState({
      isOpen: !state.isOpen
    })
  }

  const renderUnauthBar = () => {
    return (
      <MDBCollapse isOpen={state.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavLink activeClassName={styles.activeClass} exact to='/'>Home</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBNavLink activeClassName={styles.activeClass} to='/login'>Sign In</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink activeClassName={styles.activeClass} to='/register'>Sign Up</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    )
  }

  const renderAuthBar = () => {
    return (
      <MDBCollapse isOpen={state.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavLink activeClassName={styles.activeClass} exact to='/'>Home</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem >
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu right >
                <MDBDropdownItem onClick={handleProfile}>Profile</MDBDropdownItem>
                <MDBDropdownItem onClick={handleLogout}>Sign Out</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    )
  }

  const renderAdminBar = () => {
    return (
      <MDBCollapse isOpen={state.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavLink activeClassName={styles.activeClass} exact to='/'>Home</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink activeClassName={styles.activeClass} to='/admin/vehicle'>Vehicle</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink activeClassName={styles.activeClass} to='/admin/utility'>Utility</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBNavLink to='/login' onClick={handleLogout}>Sign Out</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    )
  }

  return (
    <MDBNavbar color="mdb-color darken-3" dark expand="md">
      <MDBNavbarBrand>
        <strong className="white-text">Banger & Co</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      {!props.auth ? renderUnauthBar() : props.auth.userRole === 'ROLE_ADMIN' ? renderAdminBar() : renderAuthBar()}
    </MDBNavbar>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(logoutSuccess())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);