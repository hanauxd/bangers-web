import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home, SignIn, SignUp } from './screens';
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