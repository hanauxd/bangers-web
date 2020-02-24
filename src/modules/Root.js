import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Auth, Toolbar, VehicleDetails, ExtendBooking } from './components';
import {
  Home,
  SignIn,
  SignUp,
  Utility,
  Vehicle,
  Profile,
  BookingHistory,
  Booking,
  UpdateBooking
} from './screens';
import { authSuccess } from './store/actions/auth';

import styles from './Root.module.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";


const Root = props => {
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth !== null) {
      props.onSuccess({ ...auth });
    }
    //eslint-disable-next-line
  }, [])

  return (
    <div className={styles.container}>
      <Router>
        <Toolbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/login'>
            <SignIn />
          </Route>
          <Route exact path='/register'>
            <SignUp />
          </Route>
          <Route exact path='/profile'>
            <Auth component={Profile} auth={props.auth} role="ROLE_USER" />
          </Route>
          <Route exact path='/admin/vehicle'>
            <Auth component={Vehicle} auth={props.auth} role="ROLE_ADMIN" />
          </Route>
          <Route exact path='/admin/utility'>
            <Auth component={Utility} auth={props.auth} role="ROLE_ADMIN" />
          </Route>
          <Route exact path='/admin/bookings'>
            <Auth component={Booking} auth={props.auth} role="ROLE_ADMIN" />
          </Route>
          <Route exact path='/admin/bookings/:id'>
            <Auth component={UpdateBooking} auth={props.auth} role="ROLE_ADMIN" />
          </Route>
          <Route exact path='/vehicles/:id'>
            <Auth component={VehicleDetails} auth={props.auth} role="ROLE_ADMIN" />
          </Route>
          <Route exact path='/bookings/:id'>
            <Auth component={ExtendBooking} auth={props.auth} role="ROLE_USER" />
          </Route>
          <Route exact path='/bookings'>
            <Auth component={BookingHistory} auth={props.auth} role="ROLE_USER" />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSuccess: authData => {
      dispatch(authSuccess(authData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);