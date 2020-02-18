import React from 'react';
import { Redirect } from 'react-router-dom';

const Auth = props => {
  const { component: Component, auth, role } = props;
  return auth && auth.userRole === role ? <Component /> : <Redirect to='/admin/vehicle' />
}

export default Auth;