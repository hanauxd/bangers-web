import React, { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { MDBBtn } from "mdbreact";
import { Formik, Form } from "formik";

import { confirmedOptions, collectedOptions } from "./BookingStatus";
import { useCustomState } from "./../../../../helpers/hooks";
import { fetchBookingById, updateBooking } from "../../../../api/booking";
import { CustomSelect, Spinner, BookingDetails } from "../../../../components/index";

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

    const renderBookingDetails = () => {
        const { booking } = state;
        const details = <BookingDetails booking={booking} />;
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
                                    disabled={
                                        booking.status === "Returned" || booking.status === "Failed" ? true : false
                                    }
                                    className={styles.update__btn}
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
