import React from "react";

import { formatDate } from "../../../helpers/DateFormatter";
import { currency } from "../../../helpers/CurrencyFormatter";

import styles from "./BookingDetails.module.css";

const BookingDetails = props => {
    const {
        booking: {
            id,
            startDate,
            endDate,
            price,
            lateReturn,
            status,
            vehicle: { brand, model },
            bookingUtilities
        }
    } = props;

    const renderEquipmentDetails = () => {
        if (bookingUtilities.length === 0) {
            return "None";
        }
        let val = "";
        for (let i = 0; i < bookingUtilities.length; i++) {
            if (i === bookingUtilities.length - 1) {
                val += `${bookingUtilities[i].utility.utilityType}`;
            } else {
                val += `${bookingUtilities[i].utility.utilityType}, `;
            }
        }
        return val;
    };

    return (
        <div className={styles.details__container}>
            <div className={styles.details__block}>
                <div className={styles.details__div}>
                    <span>VEHICLE</span>
                    {brand} {model}
                </div>
                <div className={styles.details__div}>
                    <span>BOOKING ID</span>
                    {id}
                </div>
            </div>
            <div className={styles.details__block}>
                <div className={styles.details__div}>
                    <span>FROM</span>
                    {formatDate(startDate)}
                </div>
                <div className={styles.details__div}>
                    <span>TO</span> {formatDate(endDate)}
                </div>
            </div>
            <div className={styles.details__block}>
                <div className={styles.details__div}>
                    <span>STATUS</span>
                    {status}
                </div>
                <div className={styles.details__div}>
                    <span>LATE RETURN</span> {lateReturn ? "Yes" : "No"}
                </div>
            </div>
            <div className={styles.details__block}>
                <div className={styles.details__div}>
                    <span>PRICE</span>
                    {currency.format(price)}
                </div>
                <div className={styles.details__div}>
                    <span>UTILITIES</span>
                    {renderEquipmentDetails()}
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;
