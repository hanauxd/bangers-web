import React from 'react';
import { MDBRow, MDBInput, MDBCol } from 'mdbreact';

import styles from './Profile.module.css';

const Profile = props => {
  const { firstName, lastName, dob, phone, email, age } = props.user;
  return (
    <div className={styles.container}>
      <span>User Details</span>
      <hr />
      <MDBRow>
        <MDBCol>
          <MDBInput disabled label="First Name" type="text" hint={firstName} className="form-control mb-4" />
        </MDBCol>
        <MDBCol>
          <MDBInput disabled label="Last Name" type="text" hint={lastName} className="form-control mb-4" />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <MDBInput disabled label="Phone" type="text" hint={phone} className="form-control mb-4" />
        </MDBCol>
        <MDBCol>
          <MDBInput disabled label="Email Address" type="email" hint={email} className="form-control mb-4" />
        </MDBCol>
        <MDBCol>
          <MDBInput disabled label="Date of Birth" type="text" hint={`${dob} (${age} years)`} className="form-control mb-4" />
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default Profile;