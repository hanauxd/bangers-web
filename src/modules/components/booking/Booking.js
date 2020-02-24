import React, { useEffect } from 'react';
import { MDBBtn } from 'mdbreact';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import * as moment from 'moment';

import { useCustomState } from './../../helpers/hooks';
import { onFetchAvailableUtilities } from '../../api/utility';
import { fetchVehicles } from './../../api/vehicle';
import { makeBooking } from './../../api/booking';

import styles from './Booking.module.css';

const animatedComponents = makeAnimated();
const btnStyles = {
  color: 'black',
  fontWeight: 'bold',
  borderRadius: '0',
  margin: '0 5px'
}

const Booking = props => {
  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    utils: [],
    vehicles: [],
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + (1000 * 24 * 60 * 60))
  })

  useEffect(() => {
    fetchAllVehicles();
    fetchUtilities();
    //eslint-disable-next-line
  }, [])

  const fetchUtilities = async () => {
    try {
      const result = await onFetchAvailableUtilities();
      setState({
        loading: false,
        utils: [...result]
      })
    } catch (error) {
      setState({
        loading: false,
        error: error.message
      })
    }
  }

  const fetchAllVehicles = async () => {
    try {
      const result = await fetchVehicles();
      setState({
        loading: false,
        vehicles: [...result]
      })
    } catch (error) {
      setState({
        loading: false,
        error: error.message
      })
    }
  }

  const utilList = state.utils.map(util => (
    { value: util.utilityType, label: util.utilityType }
  ))

  const vehicleList = state.vehicles.map(vehicle => (
    { value: vehicle.id, label: `${vehicle.brand} ${vehicle.model}` }
  ))

  const initialValues = {
    startDate: state.startDate,
    endDate: state.endDate,
    utilities: [],
    vehicleId: '',
  }

  const bookingSchema = Yup.object().shape({
    startDate: Yup.date().required("Select a pick up date."),
    endDate: Yup.date().required("Select a return date."),
    vehicleId: Yup.string().typeError('Select a vehicle.').required("Select a vehicle."),
  })

  const handleBooking = async (values, { resetForm }) => {
    const utcStartDate = moment(values.startDate).utc().format('YYYY-MM-DD HH:mm:ss');
    const utcEndDate = moment(values.endDate).utc().format('YYYY-MM-DD HH:mm:ss');
    console.log(utcStartDate);
    console.log(utcEndDate);
    const booking = {
      startDate: utcStartDate,
      endDate: utcEndDate,
      status: "Confirmed",
      vehicleId: values.vehicleId.value,
      utilities: values.utilities.map(ut => (ut.value))
    }
    try {
      const auth = props.auth;
      if (auth === null) {
        alert("Sign in to continue.")
      } else {
        await makeBooking(booking, auth.jwt);
        resetForm({});
      }
    } catch (error) {
      console.log(error);
      if (error.request !== null) {
        const msg = JSON.parse(error.request.response).message
        alert(msg);
      } else {
        console.log("[BOOKING FAILED]", error.message);
      }
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleBooking}
      validationSchema={bookingSchema}
    >
      {({
        values,
        handleBlur,
        setFieldTouched,
        setFieldValue,
        resetForm
      }) => {
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
                    <li><span>.</span>24x7 service available.</li>
                    <li><span>.</span>Online booking facility.</li>
                    <li><span>.</span>Credit and debit card payment facility.</li>
                  </ul>
                </div>
                <div className={styles.booking__div}>
                  <h2>Booking Details</h2>
                  <div className={styles.datepicker__div}>
                    <div className={styles.datepicker__child}>
                      <DatePicker
                        onChange={value => setFieldValue('startDate', value)}
                        onBlur={handleBlur}
                        value={values.startDate}
                        className={styles.datepicker}
                        selected={values.startDate}
                        showTimeSelect
                        dateFormat="Pp" />
                      <ErrorMessage name="startDate">
                        {
                          message => <span style={{ color: 'red' }}>{message}</span>
                        }
                      </ErrorMessage ></div>
                    <div className={styles.separator} />
                    <div className={styles.datepicker__child}>
                      <DatePicker
                        onChange={value => { setFieldValue('endDate', value) }}
                        onBlur={handleBlur}
                        value={values.endDate}
                        className={styles.datepicker}
                        selected={values.endDate}
                        showTimeSelect
                        dateFormat="Pp" />
                      <ErrorMessage name="endDate">
                        {
                          message => <span style={{ color: 'red' }}>{message}</span>
                        }
                      </ErrorMessage ></div>
                  </div>
                  <div className={styles.select}>
                    <Select
                      onChange={value => { setFieldValue('vehicleId', value) }}
                      onBlur={() => { setFieldTouched('vehicleId') }}
                      value={values.vehicleId}
                      options={vehicleList}
                    />
                    <ErrorMessage name="vehicleId">
                      {
                        message => <span style={{ color: 'red' }}>{message}</span>
                      }
                    </ErrorMessage >
                  </div>
                  <div className={styles.select}>
                    <Select
                      onChange={value => { setFieldValue('utilities', value) }}
                      onBlur={() => { setFieldTouched('utilities') }}
                      components={animatedComponents}
                      isMulti
                      options={utilList}
                    />
                    <ErrorMessage name="utilities">
                      {
                        message => <span style={{ color: 'red' }}>{message}</span>
                      }
                    </ErrorMessage >
                  </div>
                  <div className={styles.button}>
                    <MDBBtn type='submit' style={btnStyles} color="amber accent-4" block >CONFIRM</MDBBtn>
                    <MDBBtn type='button' style={btnStyles} color="amber accent-4" block onClick={() => { resetForm({}) }}>RESET</MDBBtn>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Booking;