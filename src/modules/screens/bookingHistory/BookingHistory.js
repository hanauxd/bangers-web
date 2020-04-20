import React, { useEffect } from "react";
import { connect } from "react-redux";

import { useCustomState } from "../../helpers/hooks";
import { fetchBookings } from "../../api/booking";
import { BookingHistoryList, Spinner } from "../../components/index";

import styles from "./BookingHistory.module.css";

const BookingHistory = props => {
    const [state, setState] = useCustomState({
        loading: true,
        error: null,
        bookings: []
    });

    const { loading, error, bookings } = state;

    useEffect(() => {
        fetchBookingsFromApi();
        //eslint-disable-next-line
    }, []);

    const fetchBookingsFromApi = async () => {
        try {
            const token = props.auth.jwt;
            const userId = props.auth.userId;
            const result = await fetchBookings(userId, token);
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

    const renderError = () => {
        return <div>{state.error}</div>;
    };

    const renderBookingHistory = () => {
        return (
            <div className={styles.bookingHistory__div}>
                <h3>BOOKING HISTORY</h3>
                <BookingHistoryList bookings={bookings} />
            </div>
        );
    };

    return loading ? <Spinner /> : error ? renderError() : renderBookingHistory();
};

const mapStateToProps = state => {
    return {
        auth: state.auth.auth
    };
};

export default connect(mapStateToProps, null)(BookingHistory);
