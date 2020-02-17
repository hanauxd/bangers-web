import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { authSuccess } from './../../store/actions/auth';
import { onSignIn } from '../../api/auth';

import styles from './SignIn.css';

const SignIn = props => {
  const history = useHistory();

  const initialValues = {
    username: '',
    password: ''
  }

  const signInSchema = Yup.object().shape({
    username: Yup.string().email('Invalid email.').required('Email is required.'),
    password: Yup.string().required('Password is required.')
  })

  const handleSignIn = async values => {
    try {
      const { username, password } = values;
      const result = await onSignIn({ username, password });
      localStorage.setItem('auth', JSON.stringify(result));
      props.onSuccess({ ...result })
      history.push('/');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSignIn}
      validationSchema={signInSchema}
    >
      {
        () => {
          return (
            <Form>
              <div className={styles.container}>
                <div>
                  <label>Email</label>
                  <Field name='username' type='email' placeholder='someone@example.com' required />
                </div>
                <div>
                  <label>Password</label>
                  <Field name='password' type='password' placeholder='Password' required />
                </div>
                <button type='submit'>SIGN IN</button>
              </div>
            </Form>
          )
        }
      }
    </Formik>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  }
}

const mapDispactToProps = dispatch => {
  return {
    onSuccess: authData => {
      dispatch(authSuccess(authData));
    }
  }
}

export default connect(mapStateToProps, mapDispactToProps)(SignIn);