import React from "react";
import { MDBInput } from "mdbreact";
import { ErrorMessage } from "formik";

import "./InputField.css";

const InputField = (props) => {
    const { styleClass, label, icon, name, type, values, onChange, onBlur } = props;
    return (
        <div style={styleClass}>
            <MDBInput
                type={type}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={values}
                icon={icon}
                label={label}
                outline
            />
            <ErrorMessage name={name}>
                {(message) => (
                    <span style={{ color: "red", fontSize: "0.8rem", marginBottom: "5px", display: "block" }}>
                        {message}
                    </span>
                )}
            </ErrorMessage>
        </div>
    );
};

export default InputField;
