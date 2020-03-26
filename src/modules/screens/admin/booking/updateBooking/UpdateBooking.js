import React, { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { MDBBtn } from "mdbreact";
import { Formik, Form } from "formik";

import { confirmedOptions, collectedOptions } from "./BookingStatus";
import { useCustomState } from "./../../../../helpers/hooks";
import { formatDate } from "../../../../helpers/DateFormatter";
import { currency } from "../../../../helpers/CurrencyFormatter";
import { fetchBookingById, updateBooking } from "../../../../api/booking";
import { CustomSelect, Spinner } from "../../../../components/index";

import styles from "./UpdateBooking.module.css";

const UpdateBooking = props => {
    const history = useHistory();

    const {
        match: {
            params: { id }
        }
    } = props;

    const [state, setState] = useCustomState({
        loading: true,
        error: null,
        booking: null
    });

    useEffect(() => {
        fetchBookingByIdFromApi();
        //eslint-disable-next-line
    }, []);

    const fetchBookingByIdFromApi = async () => {
        try {
            const token = props.auth.jwt;
            const result = await fetchBookingById(id, token);
            setState({
                loading: false,
                booking: { ...result }
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

    const statusOptions =
        state.booking && state.booking.status === "Confirmed"
            ? confirmedOptions
            : state.booking && state.booking.status === "Collected"
            ? collectedOptions
            : [];

    const handleUpdateBooking = async values => {
        try {
            const token = props.auth.jwt;
            const booking = {
                id: state.booking.id,
                status: values.status.value
            };
            await updateBooking(booking, token);
            history.push("/admin/bookings");
        } catch (error) {
            const msg = JSON.parse(error.request.response);
            console.log(msg);
        }
    };

    const renderEquipmentDetails = () => {
        const { bookingUtilities } = state.booking;
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

    const renderBookingDetails = () => {
        const {
            booking: {
                id,
                startDate,
                endDate,
                price,
                lateReturn,
                status,
                vehicle: { brand, model }
            }
        } = state;
        const utilities = renderEquipmentDetails();
        const details = (
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
                        {utilities}
                    </div>
                </div>
            </div>
        );
        return (
            <Formik
                initialValues={{
                    status: state.booking.status
                }}
                onSubmit={handleUpdateBooking}
            >
                {({ setFieldValue, setFieldTouched, values }) => {
                    return (
                        <Form>
                            <div className={styles.main__div}>
                                <h3>BOOKING DETAILS</h3>
                                {details}
                                <div style={{ margin: "4% 0 2% 0" }}>
                                    <CustomSelect
                                        fieldName="status"
                                        noOptionsMessage={() => "Cannot update booking status"}
                                        onSetFieldValue={value => {
                                            setFieldValue("status", value);
                                        }}
                                        onSetFieldTouched={() => {
                                            setFieldTouched("status");
                                        }}
                                        value={values.vehicleId}
                                        options={statusOptions}
                                    />
                                </div>
                                <MDBBtn
                                    type="submit"
                                    color="mdb-color darken-3"
                                    style={{ margin: "0", float: "right" }}
                                >
                                    UPDATE STATUS
                                </MDBBtn>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        );
    };

    return state.loading ? <Spinner /> : state.error ? renderError() : renderBookingDetails();
};

const mapStateToProps = state => {
    return {
        auth: state.auth.auth
    };
};

export default connect(mapStateToProps, null)(withRouter(UpdateBooking));
