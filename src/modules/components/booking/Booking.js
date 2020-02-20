import React, { useEffect } from 'react';
import { MDBBtn } from 'mdbreact';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { useCustomState } from './../../helpers/hooks';

import styles from './Booking.module.css';
import { onFetchAvailableUtilities } from '../../api/utility';
import { fetchVehicles } from './../../api/vehicle';
import { makeBooking } from './../../api/booking';

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
    { values: vehicle.id, label: `${vehicle.brand} ${vehicle.model}` }
  ))

  const initialValues = {
    startDate: '',
    endDate: '',
    utilities: '',
    vehicleId: '',
  }

  const bookingSchema = Yup.object().shape({
    startDate: Yup.date().required("Select a pick up date."),
    endDate: Yup.date().required("Select a return date."),
    vehicleId: Yup.string().required("Select a vehicle."),
    utilities: Yup.array(),
  })

  const handleBooking = async (values, { resetForm }) => {
    const booking = {
      startDate: values.startDate.toLocaleString('en-GB', { timeZone: 'UTC' }),
      endDate: values.endDate.toLocaleString('en-GB', { timeZone: 'UTC' }),
      vehicleId: values.vehicleId[0].values,
      utilities: values.utilities.map(ut => (ut.value))
    }
    console.log("[BOOKING VALUES]", booking)
    try {
      const token = props.auth.jwt;
      const result = await makeBooking(booking, token);
      console.log("[BOOKING SUCCESS]", result)
      resetForm({})
    } catch (error) {
      // const msg = JSON.parse(error.request.response).message
      console.log("[BOOKING FAILED]", error.request)
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
        setFieldValue,
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
                    <DatePicker
                      name="startDate"
                      type="date"
                      onChange={value => setFieldValue('startDate', value)}
                      onBlur={handleBlur}
                      value={values.startDate}
                      className={styles.datepicker}
                      selected={values.startDate}
                      showTimeSelect
                      dateFormat="Pp" />
                    <DatePicker
                      name="endDate"
                      type="date"
                      onChange={value => setFieldValue('endDate', value)}
                      onBlur={handleBlur}
                      value={values.endDate}
                      className={styles.datepicker}
                      selected={values.endDate}
                      showTimeSelect
                      dateFormat="Pp" />
                  </div>
                  <div className={styles.select}>
                    <Select
                      name="vehicleId"
                      type="text"
                      onChange={value => setFieldValue('vehicleId', value)}
                      onBlur={handleBlur}
                      value={values.vehicleId}
                      components={animatedComponents}
                      isMulti
                      options={vehicleList}
                    />
                  </div>
                  <div className={styles.select}>
                    <Select
                      name="utilities"
                      type="array"
                      onChange={value => setFieldValue('utilities', value)}
                      onBlur={handleBlur}
                      value={values.utilities}
                      components={animatedComponents}
                      isMulti
                      options={utilList}
                    />
                  </div>
                  <div className={styles.button}>
                    <MDBBtn type='submit' style={btnStyles} color="amber accent-4" block >CONFIRM</MDBBtn>
                    <MDBBtn type='button' style={btnStyles} color="amber accent-4" block >RESET</MDBBtn>
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