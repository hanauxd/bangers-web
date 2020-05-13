import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Form as FileForm, DropZone } from "react-formik-ui";
import { MDBBtn } from "mdbreact";

import { InputField } from "../../index";

import styles from "./AddVehicle.module.css";

const AddVehicle = (props) => {
    const styleClass = {
        width: "50%",
        marginRight: "8px",
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
        files: [],
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
        files: Yup.array().required("Files required."),
    });

    const handleAddVehicle = (values, { resetForm }) => {
        const vehicle = {
            license: values.license,
            description: values.description,
            brand: values.brand,
            model: values.model,
            fuelType: values.fuelType,
            transmissionType: values.transmissionType,
            category: values.category,
            size: values.size,
            price: values.price,
        };
        const files = values.files;
        props.onAddVehicle(vehicle, files, resetForm);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleAddVehicle} validationSchema={vehicleSchema}>
            {({ handleChange, handleBlur, values }) => {
                return (
                    <Form>
                        <h3 className={styles.header}>Add New Vehicle</h3>
                        <hr />
                        <div className={styles.container}>
                            <div className={styles.form__div}>
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
                                <div style={{ display: "flex", marginRight: "8px" }}>
                                    <InputField
                                        styleClass={{ width: "100%" }}
                                        label="Description"
                                        type="text"
                                        name="description"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.description}
                                    />
                                </div>
                            </div>
                            <div className={styles.separator} />
                            <div className={styles.imageZone__div}>
                                <FileForm>
                                    <DropZone
                                        style={{ height: "300px" }}
                                        lable="Upload images"
                                        name="files"
                                        placeholder="Browse or drag and drop the images here."
                                        withClearButton
                                    />
                                </FileForm>
                                <MDBBtn type="submit" color="mdb-color darken-3" style={{ margin: "0" }}>
                                    SAVE
                                </MDBBtn>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddVehicle;
