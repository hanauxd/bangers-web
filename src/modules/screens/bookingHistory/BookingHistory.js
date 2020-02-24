import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as moment from 'moment';

import { useCustomState } from './../../helpers/hooks';
import { fetchBookings } from './../../api/booking';

import styles from './BookingHistory.module.css';

const BookingHistory = props => {
  const history = useHistory()
  const handleExtendBooking = id => {
    history.push(`bookings/${id}`)
  }

  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    bookings: [],
  })

  const { loading, error, bookings } = state;

  useEffect(() => {
    fetchBookingsFromApi();
    //eslint-disable-next-line
  }, [])

  const fetchBookingsFromApi = async () => {
    try {
      const token = props.auth.jwt;
      const result = await fetchBookings(token);
      setState({
        loading: false,
        bookings: [...result]
      })
    } catch (error) {
      setState({
        loading: false,
        error: error.message
      })
    }
  }

  const renderLoading = () => {
    return <div>Loading...</div>
  }

  const renderError = () => {
    return <div>{state.error}</div>
  }

  const renderBookingHistory = () => {
    const booking = bookings.map(item => (
      <div key={item.id} className={styles.container}>
        <button onClick={() => handleExtendBooking(item.id)}>Extend Booking</button>
        <div>Booking ID: {item.id}</div>
        <div>Start Date: {moment.utc(item.startDate).local().format('YYYY-MM-DD HH:mm:ss')}</div>
        <div>End Date: {moment.utc(item.endDate).local().format('YYYY-MM-DD HH:mm:ss')}</div>
        <div>Price: {item.price}</div>
      </div>
    ))
    return booking;
  }

  return loading ? renderLoading() : error ? renderError() : renderBookingHistory();
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  }
}

export default connect(mapStateToProps, null)(BookingHistory);