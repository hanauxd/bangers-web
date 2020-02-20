import React from 'react';
import { connect } from 'react-redux';

import { Booking } from '../../components';

const Home = props => {
  return (
    <div>
      <Booking auth={props.auth} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  }
}

export default connect(mapStateToProps)(Home);