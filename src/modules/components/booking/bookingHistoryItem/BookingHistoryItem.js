import React from "react";
import { useHistory } from "react-router-dom";
import { MDBBtn } from "mdbreact";

import { formatDate } from "../../../helpers/DateFormatter";

import styles from "./BookingHistoryItem.module.css";

const BookingHistoryItem = props => {
    const booking = props.item;
    const history = useHistory();

    const handleExtendBooking = id => {
        history.push(`bookings/${id}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.container__block} style={{ borderLeft: "none" }}>
                <span>VEHICLE</span>
                <p>{`${booking.vehicle.brand} ${booking.vehicle.model}`}</p>
            </div>
            <div className={styles.container__block}>
                <span>FROM</span>
                <p>{formatDate(booking.startDate)}</p>
            </div>
            <div className={styles.container__block}>
                <span>TO</span>
                <p>{formatDate(booking.endDate)}</p>
            </div>
            <div className={styles.container__block}>
                <span>STATUS</span>
                <p>{booking.status}</p>
            </div>
            <div className={styles.container__block} style={{ borderLeft: "none", width: "auto" }}>
                <MDBBtn
                    style={{ margin: "0" }}
                    color="mdb-color darken-3"
                    onClick={() => handleExtendBooking(booking.id)}
                >
                    VIEW
                </MDBBtn>
            </div>
        </div>
    );
};

export default BookingHistoryItem;
