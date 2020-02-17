import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home, Auth } from './screens';

import styles from './Root.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { authSuccess } from './store/actions/auth';

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
          <Route exact path='/auth'>
            <Auth />
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