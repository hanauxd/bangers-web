import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBIcon,
} from "mdbreact";

import { useCustomState } from "./../../helpers/hooks";
import { logoutSuccess } from "../../store/actions/auth";

import styles from "./Toolbar.module.css";

const Toolbar = (props) => {
    const history = useHistory();
    const [state, setState] = useCustomState({
        isOpen: false,
    });

    const handleLogout = () => {
        props.onLogout();
        localStorage.clear();
    };

    const handleUserLogout = () => {
        handleLogout();
        history.replace("/login");
    };

    const handleProfile = () => {
        history.push("/profile");
    };

    const handleBookingHistory = () => {
        history.push("/bookings");
    };

    const toggleCollapse = () => {
        setState({
            isOpen: !state.isOpen,
        });
    };

    const renderUnauthBar = () => {
        return (
            <MDBCollapse isOpen={state.isOpen} navbar>
                <MDBNavbarNav left>
                    <MDBNavItem>
                        <MDBNavLink activeClassName={styles.activeClass} exact to="/">
                            Home
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink activeClassName={styles.activeClass} to="/vehicles">
                            Vehicle
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink activeClassName={styles.activeClass} to="/fleet-comparison">
                            Fleet Comparison
                        </MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <MDBNavLink activeClassName={styles.activeClass} to="/login">
                            Sign In
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink activeClassName={styles.activeClass} to="/register">
                            Sign Up
                        </MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
        );
    };

    const renderAuthBar = () => {
        return (
            <MDBCollapse isOpen={state.isOpen} navbar>
                <MDBNavbarNav left>
                    <MDBNavItem>
                        <MDBNavLink activeClassName={styles.activeClass} exact to="/">
                            Home
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink activeClassName={styles.activeClass} to="/vehicles">
                            Vehicle
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink activeClassName={styles.activeClass} to="/fleet-comparison">
                            Fleet Comparison
                        </MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <MDBDropdown>
                            <MDBDropdownToggle nav caret>
                                <MDBIcon icon="user" />
                            </MDBDropdownToggle>
                            <MDBDropdownMenu right>
                                <MDBDropdownItem onClick={handleBookingHistory}>Booking History</MDBDropdownItem>
                                <MDBDropdownItem onClick={handleProfile}>Profile</MDBDropdownItem>
                                <MDBDropdownItem onClick={handleUserLogout}>Sign Out</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
        );
    };

    const renderAdminBar = () => {
        return (
            <MDBCollapse isOpen={state.isOpen} navbar>
                <MDBNavbarNav left>
                    <MDBNavItem>
                        <MDBNavLink activeClassName={styles.activeClass} exact to="/">
                            Home
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink activeClassName={styles.activeClass} to="/vehicles">
                            Vehicle
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink activeClassName={styles.activeClass} to="/fleet-comparison">
                            Fleet Comparison
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink activeClassName={styles.activeClass} to="/admin/utility">
                            Utility
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink activeClassName={styles.activeClass} to="/admin/bookings">
                            Booking
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink activeClassName={styles.activeClass} to="/admin/blacklist">
                            Blacklist
                        </MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <MDBNavLink to="/login" onClick={handleLogout}>
                            Sign Out
                        </MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
        );
    };

    return (
        <MDBNavbar color="mdb-color darken-3" dark expand="md">
            <MDBNavbarBrand>
                <strong className="white-text">Banger & Co</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={toggleCollapse} />
            {!props.auth
                ? renderUnauthBar()
                : props.auth.userRole === "ROLE_ADMIN"
                ? renderAdminBar()
                : renderAuthBar()}
        </MDBNavbar>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            dispatch(logoutSuccess());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
