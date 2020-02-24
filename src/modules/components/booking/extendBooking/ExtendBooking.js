import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MDBBtn, MDBInput } from 'mdbreact';
import * as moment from 'moment';

import { useCustomState } from './../../../helpers/hooks';
import { fetchBooking } from '../../../api/booking';
import { updateBooking } from './../../../api/booking';
import { onFetchAvailableUtilities } from '../../../api/utility';

const animatedComponents = makeAnimated();

const ExtendBooking = props => {
  const { match: { params: { id } } } = props;

  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    booking: null,
    utilities: [],
  })

  useEffect(() => {
    fetchUtilitiesFromApi();
    fetchBookingDetails();
    //eslint-disable-next-line
  }, []);

  const fetchUtilitiesFromApi = async () => {
    try {
      const result = await onFetchAvailableUtilities();
      setState({
        loading: false,
        utilities: [...result],
      })
    } catch (error) {
      setState({
        loading: false,
        error: error.message
      })
    }
  }

  const fetchBookingDetails = async () => {
    try {
      const token = props.auth.jwt;
      const result = await fetchBooking(id, token);
      setState({
        loading: false,
        booking: { ...result }
      })
    } catch (error) {
      setState({
        loading: false,
        error: error.message
      })
    }
  }

  const mapUtilsToSelect = array => array.map(item => ({
    value: item.utilityType, label: item.utilityType
  }))

  const mapUtilsToSelectFromBooking = array => array.map(({ utility }) => ({
    value: utility.utilityType, label: utility.utilityType
  }))

  const utilList = mapUtilsToSelect(state.utilities);

  const renderLoading = () => {
    return <div>Loading...</div>
  }

  const renderError = () => {
    return <div>{state.error}</div>
  }

  const extendBookingSchema = Yup.object().shape({
    endDate: Yup.date().required("Select vehicle return date.")
  })

  const handleExtendBooking = async values => {
    const utcEndDate = moment(values.endDate).utc().format('YYYY-MM-DD HH:mm:ss');
    const utcStartDate = moment(state.booking.startDate).utc().format('YYYY-MM-DD HH:mm:ss');
    const bookingUtils = values.utils !== null ? values.utils.map(item => item.value) : []
    const booking = {
      id: state.booking.id,
      vehicleId: state.booking.vehicle.id,
      endDate: utcEndDate,
      startDate: utcStartDate,
      utilities: bookingUtils
    }
    try {
      const token = props.auth.jwt;
      const result = await updateBooking(booking, token);
      console.log("[UPDATE BOOKING SUCCESS]", result)
    } catch (error) {
      console.log("[EXTEND BOOKING FAILED]", error.request.response)
      const err = JSON.parse(error.request.response);
      alert(err.message)
    }
  }

  const renderBookingDetails = () => {
    return (
      <div>
        <div>Vehicle: {state.booking.vehicle.brand} {state.booking.vehicle.model}</div>
        <Formik
          initialValues={{
            endDate: moment.utc(state.booking.endDate).local().toDate(),
            utils: [...mapUtilsToSelectFromBooking(state.booking.bookingUtilities)],
          }}
          onSubmit={handleExtendBooking}
          validationSchema={extendBookingSchema}
        >
          {({
            handleBlur,
            values,
            setFieldValue,
            setFieldTouched,
          }) => {
            return (
              <Form>
                <MDBInput
                  disabled
                  hint={moment.utc(state.booking.startDate).local().format('YYYY-MM-DD HH:mm:ss A')}
                />
                <div>
                  <DatePicker
                    onChange={value => setFieldValue('endDate', value)}
                    onBlur={handleBlur}
                    selected={values.endDate}
                    value={values.startDate}
                    showTimeSelect
                    dateFormat="Pp" />
                  <ErrorMessage name="endDate">
                    {
                      message => <span style={{ color: 'red' }}>{message}</span>
                    }
                  </ErrorMessage >
                </div>
                <div>
                  <Select
                    onChange={value => { setFieldValue('utils', value) }}
                    onBlur={() => { setFieldTouched('utils') }}
                    components={animatedComponents}
                    value={values.utils}
                    isMulti
                    options={utilList}
                  />
                </div>
                <MDBBtn type="submit">EXTEND BOOKING</MDBBtn>
              </Form>
            )
          }}
        </Formik>
      </div>
    )
  }

  return state.loading ? renderLoading() : state.error ? renderError() : state.booking && renderBookingDetails();
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  }
}

export default withRouter(connect(mapStateToProps, null)(ExtendBooking));