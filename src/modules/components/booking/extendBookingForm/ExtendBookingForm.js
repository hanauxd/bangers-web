import React from "react";
import { MDBBtn } from "mdbreact";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import * as moment from "moment";

import { extendBooking, updateUtilities } from "./../../../api/booking";
import { CustomDatePicker, CustomSelect } from "./../../index";

import styles from "./ExtendBookingForm.module.css";
import { useHistory } from "react-router-dom";

const ExtendBookingForm = props => {
    const history = useHistory();
    const { booking, utilities } = props;
    const extendBookingSchema = Yup.object().shape({
        endDate: Yup.date().required("Select vehicle return date.")
    });

    const handleExtendBooking = async values => {
        const utcEndDate = moment(values.endDate)
            .utc()
            .format("YYYY-MM-DD HH:mm:ss");
        const updatedBooking = {
            id: booking.id,
            vehicleId: booking.vehicle.id,
            endDate: utcEndDate
        };
        try {
            const token = props.auth.jwt;
            await extendBooking(updatedBooking, token);
            history.push("/bookings");
        } catch (error) {
            console.log("[EXTEND BOOKING FAILED]", error.request.response);
            const err = JSON.parse(error.request.response);
            alert(err.message);
        }
    };

    const handleUpdateUtils = async values => {
        const bookingUtils = values.utils !== null ? values.utils.map(item => item.value) : [];
        const updatedBooking = {
            id: booking.id,
            utilities: bookingUtils
        };

        try {
            const token = props.auth.jwt;
            await updateUtilities(updatedBooking, token);
            history.push("/bookings");
        } catch (error) {
            console.log("[EXTEND BOOKING FAILED]", error.request.response);
            const err = JSON.parse(error.request.response);
            alert(err.message);
        }
    };

    const mapUtilsToSelectFromBooking = array =>
        array.map(({ utility }) => ({
            value: utility.utilityType,
            label: utility.utilityType
        }));

    const mapUtilsToSelect = array =>
        array.map(item => ({
            value: item.utilityType,
            label: item.utilityType
        }));

    const utilList = mapUtilsToSelect(utilities);

    return (
        <div className={styles.container}>
            <div>
                <h3>BOOKING DETAILS</h3>
                <div># {booking.id}</div>
                <div>Status: {booking.status}</div>
                <div>
                    Vehicle: {booking.vehicle.brand} {booking.vehicle.model}
                </div>
                <div>Price: {booking.price}</div>
                <div>Late Return: {booking.lateReturn ? "Yes" : "No"}</div>
            </div>
            <Formik
                initialValues={{
                    endDate: moment
                        .utc(booking.endDate)
                        .local()
                        .toDate()
                }}
                onSubmit={handleExtendBooking}
                validationSchema={extendBookingSchema}
            >
                {({ values, setFieldValue, setFieldTouched }) => {
                    return (
                        <Form>
                            <div className={styles.datepicker__container}>
                                <CustomDatePicker
                                    fieldName="startDate"
                                    isDisabled={true}
                                    selected={moment
                                        .utc(booking.startDate)
                                        .local()
                                        .toDate()}
                                />
                                <div className={styles.separator} />
                                <CustomDatePicker
                                    fieldName="endDate"
                                    isDisabled={booking.status !== "Confirmed"}
                                    selected={values.endDate}
                                    value={values.endDate}
                                    dateRange={booking.endDate}
                                    minHour={8}
                                    maxHour={16}
                                    onSetFieldValue={val => setFieldValue("endDate", val)}
                                    onSetFieldTouched={() => setFieldTouched("endDate")}
                                />
                            </div>
                            <MDBBtn type="submit" color="mdb-color darken-3" disabled={booking.status !== "Confirmed"}>
                                EXTEND BOOKING
                            </MDBBtn>
                        </Form>
                    );
                }}
            </Formik>
            <Formik
                initialValues={{
                    utils: [...mapUtilsToSelectFromBooking(booking.bookingUtilities)]
                }}
                onSubmit={handleUpdateUtils}
            >
                {({ values, setFieldValue, setFieldTouched }) => {
                    return (
                        <Form>
                            <div>
                                <CustomSelect
                                    fieldName="utils"
                                    options={utilList}
                                    value={values.utils}
                                    isMulti={true}
                                    isDisabled={booking.status !== "Confirmed"}
                                    onSetFieldValue={value => setFieldValue("utils", value)}
                                    onSetFieldTouched={() => {
                                        setFieldTouched("utils");
                                    }}
                                />
                            </div>
                            <MDBBtn type="submit" color="mdb-color darken-3" disabled={booking.status !== "Confirmed"}>
                                UPDATE UTILITIES
                            </MDBBtn>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default ExtendBookingForm;
