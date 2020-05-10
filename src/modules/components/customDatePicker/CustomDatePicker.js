import React from "react";
import DatePicker from "react-datepicker";
import { ErrorMessage } from "formik";

import styles from "./CustomDatePicker.module.css";

const CustomDatePicker = (props) => {
    const {
        fieldName,
        placeholderText,
        value,
        selected,
        showTimeSelect,
        dateFormat,
        minDate,
        maxDate,
        isDisabled,
        onSetFieldValue,
        onSetFieldTouched,
        minHour,
        maxHour,
    } = props;
    return (
        <div className={styles.datepicker__child}>
            <DatePicker
                className={styles.datepicker}
                placeholderText={placeholderText}
                disabled={isDisabled}
                onChange={(val) => onSetFieldValue(val)}
                onBlur={() => onSetFieldTouched()}
                value={value}
                selected={selected}
                showTimeSelect={showTimeSelect}
                dateFormat={dateFormat}
                minTime={new Date().setHours(minHour, 0, 0)}
                maxTime={new Date().setHours(maxHour, 0, 0)}
                minDate={new Date(minDate)}
                maxDate={new Date(maxDate)}
            />
            <ErrorMessage name={fieldName}>
                {(message) => <span style={{ color: "red", fontSize: "0.8rem", marginTop: "5px" }}>{message}</span>}
            </ErrorMessage>
        </div>
    );
};

export default CustomDatePicker;
