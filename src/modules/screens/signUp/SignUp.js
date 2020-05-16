import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as moment from "moment";
import { MDBBtn } from "mdbreact";
import cogoToast from "cogo-toast";

import { onSignUp } from "../../api/auth";
import { InputField, BirthDatePicker } from "../../components";

import styles from "./SignUp.module.css";

const SignUp = (props) => {
    const history = useHistory();

    const initialValues = {
        fullName: "",
        phone: "",
        email: "",
        password: "",
        dob: new Date(),
        address: "",
        nic: "",
        license: "",
    };

    const signUpSchema = Yup.object().shape({
        fullName: Yup.string().required("Name is required."),
        phone: Yup.number().positive().integer().required("Phone is required."),
        email: Yup.string().email("Invalid email address.").required("Email is required."),
        password: Yup.string().required("Password is required."),
        dob: Yup.date().required("Date of birth is required."),
        address: Yup.string().required("Address is required."),
        nic: Yup.string().required("NIC is required."),
        license: Yup.string().required("License number is required"),
    });

    const handleSignUp = async (values) => {
        try {
            const { fullName, phone, email, password, address, nic, license } = values;
            const dob = moment(values.dob).format("DD-MM-YYYY");
            const user = {
                fullName,
                phone,
                email,
                password,
                dob,
                address,
                nic,
                license,
                role: "ROLE_USER",
            };
            await onSignUp(user);
            history.push("/");
        } catch (error) {
            if (error.request) {
                const err = JSON.parse(error.request.response);
                cogoToast.error(err.message);
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
                                        type="number"
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
                                    <Field name="dob" component={BirthDatePicker} />
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
