import React from "react";
import { MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useCustomState } from "./../../../helpers/hooks";
import { InputField } from "../../index";

import styles from "./UtilityItem.module.css";

const UtilityItem = (props) => {
    const {
        utility: { utilityType, quantity },
        handleUpdateUtility,
    } = props;

    const [state, setState] = useCustomState({
        isOpen: false,
    });

    const toggle = () => {
        setState({
            isOpen: !state.isOpen,
        });
    };

    const initialValues = {
        quantity: "",
    };

    const utilitySchema = Yup.object().shape({
        quantity: Yup.number().min(1, "Quantity cannot be less than 1.").required("Quantity is required."),
    });

    const handleUpdate = (values) => {
        values.utilityType = utilityType;
        handleUpdateUtility(values);
        toggle();
    };

    const item = (label, value) => {
        return (
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.8rem" }}>{label}</div>
                <div style={{ fontWeight: "bold" }}>{value}</div>
            </div>
        );
    };

    return (
        <div>
            <div className={styles.container}>
                {item("Type", utilityType)}
                {item("Quantity", quantity)}
                <div>
                    <MDBBtn style={{ margin: "0" }} block color="mdb-color darken-3" size="sm" onClick={toggle}>
                        UPDATE
                    </MDBBtn>
                </div>
            </div>

            <Formik initialValues={initialValues} onSubmit={handleUpdate} validationSchema={utilitySchema}>
                {({ handleChange, handleBlur, values }) => {
                    return (
                        <Form>
                            <MDBModal isOpen={state.isOpen} toggle={toggle}>
                                <MDBModalHeader toggle={toggle}>{utilityType}</MDBModalHeader>
                                <MDBModalBody>
                                    <InputField
                                        label="Quantity"
                                        type="number"
                                        name="quantity"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.quantity}
                                    />
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn type="submit" color="mdb-color darken-3" size="sm">
                                        UPDATE
                                    </MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default UtilityItem;
