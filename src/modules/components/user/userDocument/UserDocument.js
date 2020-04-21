import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MDBBtn, MDBInput, MDBIcon } from "mdbreact";

import { CustomSelect, CustomDatePicker } from "../../index";
import { useCustomState } from "../../../helpers/hooks";

const UserDocument = (props) => {
    const [state, setState] = useCustomState({
        fileInput: null,
    });

    const handleFileSelected = (event) => {
        setState({
            fileInput: event.target.files[0],
        });
    };

    const handleReset = () => {
        setState({
            fileInput: null,
        });
    };

    const initialValues = {
        files: [],
        dateIssued: "",
        documentType: "",
    };

    const documentTypes = [
        { value: "License", label: "License" },
        { value: "Utility Bill", label: "Utility Bill" },
        { value: "Tax Bill", label: "Tax Bill" },
        { value: "Bank Statement", label: "Bank Statement" },
    ];

    const userDocumentSchema = Yup.object().shape({
        files: Yup.array().required("File is required."),
        dateIssued: Yup.date().required("Document issue date is required."),
        documentType: Yup.string().required("Document type is required."),
    });

    const handleUploadDocument = (values, resetForm) => {
        props.onUploadDocument({
            file: state.fileInput,
            dateIssued: values.dateIssued,
            type: values.documentType.value,
        });
        handleReset();
        resetForm({});
    };

    let fileRef = null;
    const fileInput = state.fileInput;

    const form = (
        <Formik initialValues={initialValues} validationSchema={userDocumentSchema}>
            {({ values, setFieldValue, setFieldTouched, resetForm }) => {
                return (
                    <Form>
                        <div style={{ textAlign: "center" }}>
                            <span style={{ fontSize: "1.8rem" }}>Add Document</span>
                            <hr />
                        </div>

                        <div style={{ display: "flex" }}>
                            <div style={{ flex: 1 }}>
                                <CustomSelect
                                    fieldName="documentType"
                                    options={documentTypes}
                                    value={values.documentType}
                                    onSetFieldValue={(value) => setFieldValue("documentType", value)}
                                    onSetFieldTouched={() => {
                                        setFieldTouched("documentType");
                                    }}
                                />
                            </div>
                            <div style={{ width: "10px" }} />
                            <CustomDatePicker
                                fieldName="dateIssued"
                                placeholderText="Pick document issue date"
                                showTimeSelect={false}
                                value={values.dateIssued}
                                selected={values.dateIssued}
                                onSetFieldValue={(value) => setFieldValue("dateIssued", value)}
                                onSetFieldTouched={() => setFieldTouched("dateIssued")}
                            />
                        </div>
                        <div style={{ display: "flex", alignItems: "baseline" }}>
                            <div>
                                <MDBBtn
                                    style={{ margin: "0px" }}
                                    size="sm"
                                    color="mdb-color darken-3"
                                    onClick={() => fileRef.click()}
                                >
                                    Choose File
                                </MDBBtn>
                            </div>
                            <div style={{ width: "10px" }} />
                            <div style={{ flex: "1" }}>
                                <MDBInput
                                    style={{
                                        borderBottom: `${fileInput ? "1px solid #00c851" : ""}`,
                                    }}
                                    size="sm"
                                    value={state.fileInput ? state.fileInput.name : "No file chosen"}
                                />
                            </div>
                            {state.fileInput ? (
                                <div>
                                    <MDBIcon size="sm" style={{ color: "red" }} icon="times" onClick={handleReset} />
                                </div>
                            ) : null}
                            <input
                                type="file"
                                onChange={handleFileSelected}
                                key={state.fileInput}
                                ref={(inputRef) => (fileRef = inputRef)}
                                style={{ display: "none" }}
                            />
                        </div>

                        <div style={{ display: "flex" }}>
                            <div style={{ flex: "1" }}>
                                <MDBBtn
                                    disabled={
                                        state.fileInput && values.dateIssued && values.documentType ? false : true
                                    }
                                    block
                                    size="sm"
                                    color="mdb-color darken-3"
                                    type="submit"
                                    onClick={() => handleUploadDocument(values, resetForm)}
                                >
                                    Upload
                                </MDBBtn>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );

    return <div>{form}</div>;
};

export default UserDocument;
