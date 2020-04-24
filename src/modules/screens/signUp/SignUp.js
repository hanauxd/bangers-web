import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MDBBtn } from "mdbreact";

import { onSignUp } from "../../api/auth";
import { InputField } from "../../components";

import styles from "./SignUp.module.css";

const SignUp = (props) => {
    const history = useHistory();

    const initialValues = {
        fullName: "",
        phone: "",
        email: "",
        password: "",
        dob: "",
        address: "",
        nic: "",
        license: "",
    };

    const signUpSchema = Yup.object().shape({
        fullName: Yup.string().required("Name is required."),
        phone: Yup.string().required("Phone is required."),
        email: Yup.string().email("Invalid email address.").required("Email is required."),
        password: Yup.string().required("Password is required."),
        dob: Yup.string().required("Date of birth is required."),
        address: Yup.string().required("Address is required."),
        nic: Yup.string().required("NIC is required."),
        license: Yup.string().required("License number is required"),
    });

    const handleSignUp = async (values) => {
        try {
            const { fullName, phone, email, password, dob, address, nic, license } = values;
            await onSignUp({
                fullName,
                phone,
                email,
                password,
                dob,
                address,
                nic,
                license,
                role: "ROLE_USER",
            });
            history.push("/login");
        } catch (error) {
            if (error.request.status === 400) {
                alert("Email address already exist.");
            }
        }
    };

    const handleLogin = () => {
        history.replace("/login");
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSignUp} validationSchema={signUpSchema}>
            {({ values, handleChange, handleBlur }) => {
                return (
                    <Form className={styles.form__container}>
                        <div className={styles.container}>
                            <div className={styles.content}>
                                <div className={styles.title}>
                                    <span>SIGN UP</span>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <InputField
                                        icon="user"
                                        label="Full Name"
                                        type="text"
                                        name="fullName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.fullName}
                                        styleClass={{ flex: 1 }}
                                    />
                                    <div style={{ width: "25px" }} />
                                    <InputField
                                        icon="map-marked-alt"
                                        label="Address"
                                        type="text"
                                        name="address"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.address}
                                        styleClass={{ flex: 1 }}
                                    />
                                </div>
                                <div style={{ display: "flex" }}>
                                    <InputField
                                        icon="envelope"
                                        label="Email"
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.email}
                                        styleClass={{ flex: 1 }}
                                    />
                                    <div style={{ width: "25px" }} />
                                    <InputField
                                        icon="phone"
                                        label="Phone"
                                        type="text"
                                        name="phone"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.phone}
                                        styleClass={{ flex: 1 }}
                                    />
                                </div>
                                <div style={{ display: "flex" }}>
                                    <InputField
                                        icon="id-card-alt"
                                        label="NIC"
                                        type="text"
                                        name="nic"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.nic}
                                        styleClass={{ flex: 1 }}
                                    />
                                    <div style={{ width: "25px" }} />
                                    <InputField
                                        icon="address-card"
                                        label="License"
                                        type="text"
                                        name="license"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.license}
                                        styleClass={{ flex: 1 }}
                                    />
                                </div>
                                <div style={{ display: "flex" }}>
                                    <InputField
                                        icon="calendar-alt"
                                        label="Date of Birth"
                                        type="text"
                                        name="dob"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.dob}
                                        styleClass={{ flex: 1 }}
                                    />
                                    <div style={{ width: "25px" }} />
                                    <InputField
                                        icon="lock"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.password}
                                        styleClass={{ flex: 1 }}
                                    />
                                </div>
                                <div>
                                    <MDBBtn block color="black" type="submit">
                                        SIGN UP
                                    </MDBBtn>
                                    <div className={styles.signInText}>
                                        <span>Already have an account? </span>
                                        <span onClick={handleLogin} className={styles.signInLink}>
                                            Login
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

export default SignUp;
