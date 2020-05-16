import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MDBBtn } from "mdbreact";
import cogoToast from "cogo-toast";

import { onSignIn } from "../../api/auth";
import { authSuccess } from "./../../store/actions/auth";
import { InputField } from "../../components/index";

import styles from "./SignIn.module.css";

const SignIn = (props) => {
    const history = useHistory();

    const {
        location: { state },
    } = history;

    const routeTo = (endpoint) => {
        if (state && state.vehicleId) {
            history.push(endpoint, {
                ...state,
            });
        } else {
            history.push(endpoint);
        }
    };

    const initialValues = {
        username: "",
        password: "",
    };

    const signInSchema = Yup.object().shape({
        username: Yup.string().email("Invalid email.").required("Email is required."),
        password: Yup.string().required("Password is required."),
    });

    const handleSignIn = async (values) => {
        try {
            const { username, password } = values;
            const result = await onSignIn({ username, password });
            localStorage.setItem("auth", JSON.stringify(result));
            props.onSuccess({ ...result });
            routeTo("/");
        } catch (error) {
            cogoToast.error("Failed to sign in.");
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSignIn} validationSchema={signInSchema}>
            {({ values, handleChange, handleBlur }) => {
                return (
                    <Form className={styles.form__div}>
                        <div className={styles.container}>
                            <div className={styles.content}>
                                <div className={styles.title}>
                                    <span>SIGN IN</span>
                                </div>
                                <div>
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
                                </div>
                                <div>
                                    <MDBBtn block color="black" type="submit">
                                        SIGN IN
                                    </MDBBtn>
                                    <div className={styles.signUpText}>
                                        <span>Don't have an account? </span>
                                        <span onClick={() => routeTo("/register")} className={styles.signUpLink}>
                                            Create
                                        </span>
                                    </div>
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

const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth,
    };
};

const mapDispactToProps = (dispatch) => {
    return {
        onSuccess: (authData) => {
            dispatch(authSuccess(authData));
        },
    };
};

export default connect(mapStateToProps, mapDispactToProps)(SignIn);
