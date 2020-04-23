import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MDBBtn } from "mdbreact";

import { InputField } from "../../index";

import styles from "./AddUtility.module.css";

const AddUtility = (props) => {
    const initialValues = {
        utilityType: "",
        quantity: "",
    };

    const utilitySchema = Yup.object().shape({
        utilityType: Yup.string().required("Utility type is required."),
        quantity: Yup.number().min(1, "Quantity cannot be less than 1.").required("Quantity is required."),
    });

    const handleAddUtility = (values) => {
        props.handleAddUtility(values);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleAddUtility} validationSchema={utilitySchema}>
            {({ values, handleChange, handleBlur }) => {
                return (
                    <div className={styles.container}>
                        <h3>Add Utility</h3>
                        <hr />
                        <Form>
                            <div className={styles.form__div}>
                                <InputField
                                    styleClass={{ flex: 1 }}
                                    label="Utility Type"
                                    type="text"
                                    name="utilityType"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    values={values.utilityType}
                                />
                                <div className={styles.separator} />
                                <InputField
                                    styleClass={{ flex: 1 }}
                                    label="Quantity"
                                    type="number"
                                    name="quantity"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    values={values.quantity}
                                />
                                <div className={styles.separator} />
                                <div>
                                    <MDBBtn
                                        color="mdb-color darken-3"
                                        size="sm"
                                        type="submit"
                                        style={{ margin: "0px" }}
                                    >
                                        SAVE
                                    </MDBBtn>
                                </div>
                            </div>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default AddUtility;
