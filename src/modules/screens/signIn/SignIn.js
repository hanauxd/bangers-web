import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { MDBBtn } from "mdbreact";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { onSignIn } from "../../api/auth";
import { authSuccess } from "./../../store/actions/auth";
import { InputField } from "../../components/index";

import styles from "./SignIn.module.css";

const SignIn = props => {
  const history = useHistory();

  const initialValues = {
    username: "",
    password: ""
  };

  const signInSchema = Yup.object().shape({
    username: Yup.string()
      .email("Invalid email.")
      .required("Email is required."),
    password: Yup.string().required("Password is required.")
  });

  const handleSignIn = async values => {
    try {
      const { username, password } = values;
      const result = await onSignIn({ username, password });
      localStorage.setItem("auth", JSON.stringify(result));
      props.onSuccess({ ...result });
      const {
        location: { state }
      } = history;
      if (state && state.vehicleId) {
        history.push("/", {
          ...state
        });
      } else {
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = () => {
    history.replace("/register");
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSignIn}
      validationSchema={signInSchema}
    >
      {({ values, handleChange, handleBlur }) => {
        return (
          <Form>
            <div className={styles.container}>
              <div className={styles.content}>
                <div className={styles.title}>
                  <span>SIGN IN</span>
                </div>
                <InputField
                  icon="envelope"
                  label="Email"
                  type="email"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.username}
                />
                <InputField
                  icon="lock"
                  label="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.password}
                />
                <div className={styles.button}>
                  <MDBBtn block color="black" type="submit">
                    SIGN IN
                  </MDBBtn>
                </div>
                <div className={styles.signUpText}>
                  <span>Don't have an account? </span>
                  <span onClick={handleRegister} className={styles.signUpLink}>
                    Create
                  </span>
                </div>
              </div>
              <div className={styles.logo}>
                <div>Banger</div>
                <div>&</div>
                <div>Co</div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  };
};

const mapDispactToProps = dispatch => {
  return {
    onSuccess: authData => {
      dispatch(authSuccess(authData));
    }
  };
};

export default connect(mapStateToProps, mapDispactToProps)(SignIn);
