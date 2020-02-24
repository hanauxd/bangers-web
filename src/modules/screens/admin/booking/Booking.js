import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { useCustomState } from './../../../helpers/hooks';
import { fetchAllBookings } from '../../../api/booking';
import { useHistory } from 'react-router-dom';

const Booking = props => {
  const history = useHistory();
  const [state, setState] = useCustomState({
    loading: false,
    error: null,
    bookings: [],
  })

  useEffect(() => {
    fetchAllBookingsFromApi();
    //eslint-disable-next-line
  }, [])

  const fetchAllBookingsFromApi = async () => {
    try {
      const token = props.auth.jwt;
      const result = await fetchAllBookings(token);
      setState({
        loading: false,
        bookings: [...result]
      });
    } catch (error) {
      setState({
        loading: false,
        error: error.message,
      })
    }
  }

  const handleViewBooking = id => {
    history.push(`/admin/bookings/${id}`);
  }

  const renderLoading = () => {
    return <div>Loading...</div>
  }

  const renderError = () => {
    return <div>{state.error}</div>
  }

  const renderAllBookings = () => {
    const allBooking = state.bookings.map(item => {
      console.log(item)
      return (
        <div key={item.id}>
          <button onClick={() => handleViewBooking(item.id)}>VIEW BOOKING</button>
          <div>Booking ID: {item.id}</div>
        </div>
      )
    })
    return allBooking;
  }

  return state.loading ? renderLoading() : state.error ? renderError() : renderAllBookings();
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  }
}
export default connect(mapStateToProps, null)(Booking);