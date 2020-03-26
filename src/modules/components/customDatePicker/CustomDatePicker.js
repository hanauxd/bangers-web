import React from "react";
import DatePicker from "react-datepicker";
import { ErrorMessage } from "formik";

import styles from "./CustomDatePicker.module.css";

const CustomDatePicker = props => {
    const {
        fieldName,
        value,
        selected,
        dateRange,
        isDisabled,
        onSetFieldValue,
        onSetFieldTouched,
        minHour,
        maxHour
    } = props;
    return (
        <div className={styles.datepicker__child}>
            <DatePicker
                className={styles.datepicker}
                disabled={isDisabled}
                onChange={val => onSetFieldValue(val)}
                onBlur={() => onSetFieldTouched()}
                value={value}
                selected={selected}
                showTimeSelect
                dateFormat="Pp"
                minTime={new Date().setHours(minHour, 0, 0)}
                maxTime={new Date().setHours(maxHour, 0, 0)}
                minDate={new Date(dateRange)}
                maxDate={new Date(dateRange)}
            />
            <ErrorMessage name={fieldName}>{message => <span style={{ color: "red" }}>{message}</span>}</ErrorMessage>
        </div>
    );
};

export default CustomDatePicker;
