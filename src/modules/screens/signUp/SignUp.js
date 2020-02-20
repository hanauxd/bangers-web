import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { onSignUp } from '../../api/auth';

import styles from './SignUp.module.css';
import { InputField } from '../../components';
import { MDBBtn } from 'mdbreact';
import { useHistory } from 'react-router-dom';

const SignUp = props => {
  const history = useHistory()

  const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    dob: ''
  }

  const signUpSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required.'),
    lastName: Yup.string().required('Last name is required.'),
    phone: Yup.string().required('Phone is required.'),
    email: Yup.string().email('Invalid email address.').required('Email is required.'),
    password: Yup.string().required('Password is required.'),
    dob: Yup.string().required('Date of birth is required.')
  })

  const handleSignUp = async values => {
    try {
      const { firstName, lastName, phone, email, password, dob } = values;
      await onSignUp({ firstName, lastName, phone, email, password, dob, role: 'ROLE_USER' });
      history.push('/login');
    } catch (error) {
      if (error.request.status === 400) {
        alert("Email address already exist.")
      }
    }
  }

  const handleLogin = () => {
    history.replace('/login')
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSignUp}
      validationSchema={signUpSchema}
    >
      {({
        values,
        handleChange,
        handleBlur
      }) => {
        return (
          <Form>
            <div className={styles.container}>
              <div className={styles.content}>
                <div className={styles.title}>
                  <span>SIGN UP</span>
                </div>
                <InputField
                  icon="user"
                  label='First Name'
                  type='text'
                  name='firstName'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.firstName}
                />
                <InputField
                  icon="user"
                  label='Last Name'
                  type='text'
                  name='lastName'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.lastName}
                />
                <InputField
                  icon="phone"
                  label='Phone'
                  type='text'
                  name='phone'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.phone}
                />
                <InputField
                  icon="envelope"
                  label='Email'
                  type='email'
                  name='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.email}
                />
                <InputField
                  icon="lock"
                  label='Password'
                  type='password'
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.password}
                />
                <InputField
                  icon="calendar-alt"
                  label='Date of Birth'
                  type='text'
                  name='dob'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.dob}
                />
                <div className={styles.button}>
                  <MDBBtn
                    block
                    color="black"
                    type="submit"
                  >SIGN UP</MDBBtn>
                </div>
                <div className={styles.signInText}>
                  <span>Already have an account? </span>
                  <span onClick={handleLogin} className={styles.signInLink}>Login</span>
                </div>
                <div className={styles.logo}>
                  <div>Banger</div>
                  <div>&</div>
                  <div>Co</div>
                </div>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default SignUp;