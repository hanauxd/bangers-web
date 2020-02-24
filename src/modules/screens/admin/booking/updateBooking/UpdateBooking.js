import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useCustomState } from './../../../../helpers/hooks';
import { fetchBookingById } from '../../../../api/booking';
import { connect } from 'react-redux';

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
      console.log(result)
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

  const renderBookingDetails = () => {
    return (
      <div>
        <div>Booking ID: {state.booking.id}</div>
      </div>
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