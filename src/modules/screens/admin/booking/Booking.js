import React, { useEffect } from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { useCustomState } from "./../../../helpers/hooks";
import { BookingHistoryList, Spinner } from "../../../components";
import { fetchAllBookings } from "../../../api/booking";
import { onGetAllUsers } from "../../../api/user";

import styles from "./Booking.module.css";

const Booking = props => {
    const [state, setState] = useCustomState({
        loading: false,
        error: null,
        selectedCustomer: "",
        bookings: [],
        users: []
    });

    useEffect(() => {
        fetchAllBookingsFromApi();
        fetchAllUsersFromApi();
        //eslint-disable-next-line
    }, []);

    const fetchAllBookingsFromApi = async () => {
        try {
            const token = props.auth.jwt;
            const result = await fetchAllBookings(token);
            setState({
                loading: false,
                bookings: [...result]
            });
        } catch (error) {
            setState({
                loading: false,
                error: error.message
            });
        }
    };

    const fetchAllUsersFromApi = async () => {
        try {
            const token = props.auth.jwt;
            const result = await onGetAllUsers(token);
            setState({
                users: [...result]
            });
        } catch (error) {
            setState({
                loading: false,
                error: error.message
            });
        }
    };

    const renderError = () => {
        return <div>{state.error}</div>;
    };

    const renderUserBookings = () => {
        const userOptions = state.users.map(user => ({ value: user.id, label: user.email }));
        const handleChangeCustomer = value => {
            setState({
                selectedCustomer: value ? value.value : null
            });
        };
        const customerBookings = state.bookings.filter(booking => booking.user.id === state.selectedCustomer);
        return (
            <div className={styles.userBookings__container}>
                <h3>ALL BOOKINGS</h3>
                <Select
                    isClearable
                    autoFocus
                    placeholder="Select a customer"
                    options={userOptions}
                    onChange={handleChangeCustomer}
                    className={styles.inputSelect}
                />
                {!state.selectedCustomer ? (
                    <BookingHistoryList bookings={state.bookings} />
                ) : customerBookings.length ? (
                    <BookingHistoryList bookings={customerBookings} />
                ) : (
                    <div className={styles.message}>No booking history</div>
                )}
            </div>
        );
    };

    return state.loading ? <Spinner /> : state.error ? renderError() : renderUserBookings();
};

const mapStateToProps = state => {
    return {
        auth: state.auth.auth
    };
};
export default connect(mapStateToProps, null)(Booking);
