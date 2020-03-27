import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import * as moment from "moment";
import { MDBBtn } from "mdbreact";

import { useCustomState } from "./../../helpers/hooks";
import { onFetchAvailableUtilities } from "../../api/utility";
import { fetchVehicles } from "./../../api/vehicle";
import { makeBooking } from "./../../api/booking";
import { CustomDatePicker, CustomSelect } from "../index";

import styles from "./Booking.module.css";

const btnStyles = {
    color: "black",
    fontWeight: "bold",
    borderRadius: "0",
    margin: "0 5px"
};

const checkboxStyles = {
    color: "white",
    textAlign: "left",
    marginBottom: "12px"
};

const Booking = props => {
    const auth = props.auth;
    const history = useHistory();

    const [state, setState] = useCustomState({
        loading: true,
        error: null,
        utils: [],
        vehicles: [],
        startDate: new Date(new Date().setHours(8, 0, 0)),
        endDate: new Date(new Date().setHours(13, 0, 0))
    });

    useEffect(() => {
        fetchAllVehicles();
        fetchUtilities();
        //eslint-disable-next-line
    }, []);

    const fetchUtilities = async () => {
        try {
            const result = await onFetchAvailableUtilities();
            setState({
                loading: false,
                utils: [...result]
            });
        } catch (error) {
            setState({
                loading: false,
                error: error.message
            });
        }
    };

    const fetchAllVehicles = async () => {
        try {
            const result = await fetchVehicles();
            setState({
                loading: false,
                vehicles: [...result]
            });
        } catch (error) {
            setState({
                loading: false,
                error: error.message
            });
        }
    };

    const utilList = state.utils.map(util => ({
        value: util.utilityType,
        label: util.utilityType
    }));

    const vehicleList = state.vehicles.map(vehicle => ({
        value: vehicle.id,
        label: `${vehicle.brand} ${vehicle.model}`
    }));

    const {
        location: { state: historyState }
    } = history;

    const initialValues = {
        startDate: historyState && historyState.startDate ? historyState.startDate : state.startDate,
        endDate: historyState && historyState.endDate ? historyState.endDate : state.endDate,
        utilities: historyState && historyState.utilities ? [...historyState.utilities] : [],
        vehicleId: historyState && historyState.vehicleId ? historyState.vehicleId : null,
        lateReturn: historyState && historyState.lateReturn ? historyState.lateReturn : false
    };

    const bookingSchema = Yup.object().shape({
        startDate: Yup.date().required("Select a pick up date."),
        endDate: Yup.date().required("Select a return date."),
        vehicleId: Yup.string()
            .typeError("Select a vehicle.")
            .required("Select a vehicle.")
    });

    const handleBooking = async (values, { resetForm }) => {
        const utcStartDate = moment(values.startDate)
            .utc()
            .format("YYYY-MM-DD HH:mm:ss");
        const utcEndDate = moment(values.endDate)
            .utc()
            .format("YYYY-MM-DD HH:mm:ss");
        const booking = {
            startDate: utcStartDate,
            endDate: utcEndDate,
            status: "Confirmed",
            vehicleId: values.vehicleId.value,
            utilities: values.utilities.map(ut => ut.value),
            lateReturn: values.lateReturn
        };
        try {
            if (auth === null) {
                history.push(`/login`, { ...values });
            } else {
                await makeBooking(booking, auth.jwt);
                resetForm({});
                history.push("/bookings");
            }
        } catch (error) {
            if (error.request !== null) {
                const msg = JSON.parse(error.request.response).message;
                alert(msg);
            } else {
                console.log("[BOOKING FAILED]", error.message);
            }
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleBooking} validationSchema={bookingSchema}>
            {({ values, setFieldTouched, setFieldValue, resetForm }) => {
                return (
                    <Form>
                        <div className={styles.body}>
                            <div className={styles.title}>
                                <span>B</span>ook <span>Y</span>our <span>V</span>ehicle <span>T</span>oday
                            </div>
                            <div className={styles.container}>
                                <div className={styles.contentLeft__div}>
                                    <h3>What We Provide You</h3>
                                    <ul>
                                        <li>
                                            <span>.</span>24x7 service available.
                                        </li>
                                        <li>
                                            <span>.</span>Online booking facility.
                                        </li>
                                        <li>
                                            <span>.</span>Credit and debit card payment facility.
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles.booking__div}>
                                    <h2>BOOKING DETAILS</h2>
                                    <div className={styles.datepicker__div}>
                                        <div className={styles.datepicker__child}>
                                            <CustomDatePicker
                                                fieldName="startDate"
                                                value={values.startDate}
                                                selected={values.startDate}
                                                dateFormat="Pp"
                                                minHour={8}
                                                maxHour={18}
                                                onSetFieldValue={value => setFieldValue("startDate", value)}
                                                onSetFieldTouched={() => setFieldTouched("startDate")}
                                            />
                                        </div>
                                        <div className={styles.separator} />
                                        <div className={styles.datepicker__child}>
                                            <CustomDatePicker
                                                fieldName="endDate"
                                                value={values.endDate}
                                                selected={values.endDate}
                                                dateFormat="Pp"
                                                minHour={8}
                                                maxHour={18}
                                                onSetFieldValue={value => setFieldValue("endDate", value)}
                                                onSetFieldTouched={() => setFieldTouched("endDate")}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.select}>
                                        <CustomSelect
                                            fieldName="vehicleId"
                                            value={values.vehicleId}
                                            options={vehicleList}
                                            isMulti={false}
                                            onSetFieldValue={value => setFieldValue("vehicleId", value)}
                                            onSetFieldTouched={() => {
                                                setFieldTouched("vehicleId");
                                            }}
                                        />
                                    </div>
                                    <div className={styles.select}>
                                        <CustomSelect
                                            fieldName="utilities"
                                            options={utilList}
                                            value={values.utilities}
                                            isMulti={true}
                                            onSetFieldValue={value => setFieldValue("utilities", value)}
                                            onSetFieldTouched={() => {
                                                setFieldTouched("utilities");
                                            }}
                                        />
                                    </div>
                                    {auth !== null ? (
                                        <div style={checkboxStyles} className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className={"custom-control-input"}
                                                id="lateReturn"
                                                onChange={() => {
                                                    setFieldValue("lateReturn", !values.lateReturn);
                                                }}
                                                onBlur={() => {
                                                    setFieldTouched("lateReturn");
                                                }}
                                                checked={values.lateReturn}
                                            />
                                            <label className="custom-control-label" htmlFor="lateReturn">
                                                Late Return
                                            </label>
                                        </div>
                                    ) : null}
                                    <div className={styles.button}>
                                        <MDBBtn type="submit" style={btnStyles} color="amber accent-4" block>
                                            CONFIRM
                                        </MDBBtn>
                                        <MDBBtn
                                            type="button"
                                            style={btnStyles}
                                            color="amber accent-4"
                                            block
                                            onClick={() => {
                                                resetForm({});
                                            }}
                                        >
                                            RESET
                                        </MDBBtn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default Booking;
