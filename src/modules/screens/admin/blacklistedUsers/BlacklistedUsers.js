import React, { useEffect } from "react";
import { connect } from "react-redux";
import { MDBBtn } from "mdbreact";

import { useCustomState } from "../../../helpers/hooks";
import { Spinner } from "../../../components/index";
import { onGetBlacklistedUsers, onUnblockUser } from "../../../api/user";

import styles from "./BlacklistedUsers.module.css";

const BlacklistedUsers = props => {
    const [state, setState] = useCustomState({
        blacklistedUsers: [],
        loading: true,
        error: null
    });
    useEffect(() => {
        fetchBlacklistedUsers();
        //eslint-disable-next-line
    }, []);

    const fetchBlacklistedUsers = async () => {
        try {
            const token = props.auth.jwt;
            const result = await onGetBlacklistedUsers(token);
            setState({
                loading: false,
                blacklistedUsers: [...result]
            });
        } catch (error) {
            setState({
                loading: false,
                error: error.message
            });
        }
    };

    const handleUnblockUser = async userId => {
        try {
            const token = props.auth.jwt;
            const result = await onUnblockUser(userId, token);
            setState({
                blacklistedUsers: [...result]
            });
        } catch (error) {
            console.log("[UNBLOCK USER FAILED]", error.message);
        }
    };

    const blacklistedUser = user => {
        return (
            <div className={styles.blacklistedUser} key={user.id}>
                <div className={styles.blacklistedUser__block}>
                    <span>Customer Name</span>
                    {user.firstName} {user.lastName}
                </div>
                <div className={styles.blacklistedUser__block}>
                    <span>Email</span>
                    {user.email}
                </div>
                <div className={styles.blacklistedUser__block}>
                    <span>Phone</span>
                    {user.phone}
                </div>
                <div className={styles.blacklistedUser__block} style={{ width: "fit-content" }}>
                    <MDBBtn
                        style={{ margin: "0" }}
                        color="mdb-color darken-3"
                        onClick={() => handleUnblockUser(user.id)}
                    >
                        Unblock
                    </MDBBtn>
                </div>
            </div>
        );
    };

    const renderError = () => {
        return <div>{state.error}</div>;
    };

    const renderBlacklistedUsers = () => {
        const blacklistedUserList = !state.blacklistedUsers.length ? (
            <h5>No users blacklisted</h5>
        ) : (
            state.blacklistedUsers.map(user => blacklistedUser(user))
        );
        return (
            <div className={styles.container}>
                <h3>Blacklisted Users</h3>
                {blacklistedUserList}
            </div>
        );
    };

    return state.loading ? <Spinner /> : state.error ? renderError() : renderBlacklistedUsers();
};

const mapStateToProps = state => {
    return {
        auth: state.auth.auth
    };
};

export default connect(mapStateToProps, null)(BlacklistedUsers);
