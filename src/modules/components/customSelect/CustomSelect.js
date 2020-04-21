import React from "react";
import { ErrorMessage } from "formik";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const CustomSelect = (props) => {
    const {
        fieldName,
        options,
        value,
        isMulti,
        isDisabled,
        noOptionsMessage,
        onSetFieldValue,
        onSetFieldTouched,
    } = props;

    const applyStyles = (base) => {
        return {
            ...base,
            borderRadius: 0,
            padding: "5px 3px",
        };
    };

    return (
        <div style={{ width: "100%" }}>
            <Select
                styles={{
                    control: (base) => applyStyles(base),
                }}
                onChange={onSetFieldValue}
                onBlur={onSetFieldTouched}
                components={animatedComponents}
                isMulti={isMulti}
                isDisabled={isDisabled}
                noOptionsMessage={noOptionsMessage}
                options={options}
                value={value}
            />
            <ErrorMessage name={fieldName}>
                {(message) => <span style={{ color: "red", fontSize: "0.8rem" }}>{message}</span>}
            </ErrorMessage>
        </div>
    );
};

export default CustomSelect;
