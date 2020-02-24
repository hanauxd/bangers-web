import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';

import { useCustomState } from './../../../../helpers/hooks';
import { fetchBookingById } from '../../../../api/booking';
import { MDBBtn } from 'mdbreact';

const UpdateBooking = props => {
  const { match: { params: { id } } } = props;

  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    booking: null
  })

  useEffect(() => {
    fetchBookingByIdFromApi();
    //eslint-disable-next-line
  }, [])

  const fetchBookingByIdFromApi = async () => {
    try {
      const token = props.auth.jwt;
      const result = await fetchBookingById(id, token);
      setState({
        loading: false,
        booking: { ...result }
      })
    } catch (error) {
      setState({
        loading: false,
        error: error.message,
      })
    }
  }

  const renderLoading = () => {
    return <div>Loading...</div>
  }

  const renderError = () => {
    return <div>{state.error}</div>
  }

  const statusOptions = [
    { value: "Collected", label: "Collected" },
    { value: "Failed", label: "Failed" }
  ]

  const handleUpdateBooking = values => {
    console.log({ status: values.status.value })
  }

  const renderBookingDetails = () => {
    return (
      <Formik
        initialValues={{
          status: state.booking.status
        }}
        onSubmit={handleUpdateBooking}
      >
        {({
          setFieldValue,
          setFieldTouched,
          values
        }) => {
          return (
            <Form>
              <div>
                <div>Booking ID: {state.booking.id}</div>
                <div>
                  <Select
                    onChange={value => { setFieldValue('status', value) }}
                    onBlur={() => { setFieldTouched('status') }}
                    value={values.vehicleId}
                    options={statusOptions}
                  />
                  <ErrorMessage name="status">
                    {
                      message => <span style={{ color: 'red' }}>{message}</span>
                    }
                  </ErrorMessage >
                </div>
                <MDBBtn type="submit">UPDATE</MDBBtn>
              </div>
            </Form>
          )
        }}
      </Formik>
    )
  }

  return state.loading ? renderLoading() : state.error ? renderError() : renderBookingDetails();
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  }
}

export default connect(mapStateToProps, null)(withRouter(UpdateBooking));