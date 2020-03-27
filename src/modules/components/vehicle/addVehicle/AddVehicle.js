import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Form as FileForm, DropZone } from "react-formik-ui";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardFooter } from "mdbreact";

import { InputField } from "../../index";

import styles from "./AddVehicle.module.css";

const AddVehicle = props => {
    const styleClass = {
        width: "50%",
        margin: "0 2%"
    };
    const initialValues = {
        license: "",
        description: "",
        brand: "",
        model: "",
        fuelType: "",
        transmissionType: "",
        category: "",
        size: "",
        price: "",
        files: []
    };

    const vehicleSchema = Yup.object().shape({
        license: Yup.string().required("License number is required."),
        description: Yup.string().required("Description is required."),
        brand: Yup.string().required("Brand is required."),
        model: Yup.string().required("Model is required."),
        fuelType: Yup.string().required("Fuel type is required."),
        transmissionType: Yup.string().required("Transmission type is required."),
        category: Yup.string().required("Category is required."),
        size: Yup.string().required("Size is required."),
        price: Yup.number().required("Unit price is required."),
        files: Yup.array().required("Files required.")
    });

    const handleAddVehicle = values => {
        const vehicle = {
            license: values.license,
            description: values.description,
            brand: values.brand,
            model: values.model,
            fuelType: values.fuelType,
            transmissionType: values.transmissionType,
            category: values.category,
            size: values.size,
            price: values.price
        };
        const files = values.files;
        props.onAddVehicle(vehicle, files);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleAddVehicle} validationSchema={vehicleSchema}>
            {({ handleChange, handleBlur, values }) => {
                return (
                    <Form>
                        <MDBCard>
                            <MDBCardBody>
                                <h3 className={styles.header}>Add New Vehicle</h3>
                                <div style={{ display: "flex" }}>
                                    <InputField
                                        styleClass={styleClass}
                                        label="License"
                                        type="text"
                                        name="license"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.license}
                                    />
                                    <InputField
                                        styleClass={styleClass}
                                        label="Category"
                                        type="text"
                                        name="category"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.category}
                                    />
                                </div>
                                <div style={{ display: "flex" }}>
                                    <InputField
                                        styleClass={styleClass}
                                        label="Unit Price"
                                        type="number"
                                        name="price"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.price}
                                    />
                                    <InputField
                                        styleClass={styleClass}
                                        label="Fuel"
                                        type="text"
                                        name="fuelType"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.fuelType}
                                    />
                                </div>
                                <div style={{ display: "flex" }}>
                                    <InputField
                                        styleClass={styleClass}
                                        label="Transmission"
                                        type="text"
                                        name="transmissionType"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.transmissionType}
                                    />
                                    <InputField
                                        styleClass={styleClass}
                                        label="Size"
                                        type="text"
                                        name="size"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.size}
                                    />
                                </div>
                                <div style={{ display: "flex" }}>
                                    <InputField
                                        styleClass={styleClass}
                                        label="Brand"
                                        type="text"
                                        name="brand"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.brand}
                                    />
                                    <InputField
                                        styleClass={styleClass}
                                        label="Model"
                                        type="text"
                                        name="model"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.model}
                                    />
                                </div>
                                <div style={{ display: "flex" }}>
                                    <InputField
                                        styleClass={{ width: "100%", margin: "0 2%" }}
                                        label="Description"
                                        type="text"
                                        name="description"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.description}
                                    />
                                </div>
                                <div style={{ margin: "3% 2%" }}>
                                    <FileForm>
                                        <DropZone
                                            lable="Upload images"
                                            name="files"
                                            placeholder="Browse or drag and drop the images here."
                                            withClearButton
                                        />
                                    </FileForm>
                                </div>
                            </MDBCardBody>
                            <MDBCardFooter>
                                <div style={{ width: "33%", float: "right" }}>
                                    <MDBBtn block type="submit" color="mdb-color darken-3">
                                        SAVE
                                    </MDBBtn>
                                </div>
                            </MDBCardFooter>
                        </MDBCard>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddVehicle;
