import React from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import MomentUtils from "@date-io/moment";

import "./BirthDatePicker.css";

const BirthDatePicker = (props) => {
    const defaultMaterialTheme = createMuiTheme({
        palette: {
            primary: { main: "#263238" },
        },
    });

    const {
        field: { name, value },
        form: { setFieldValue },
    } = props;

    return (
        <ThemeProvider theme={defaultMaterialTheme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                    style={{ flex: 1 }}
                    autoOk
                    disableFuture
                    inputVariant="outlined"
                    label="Date of Birth"
                    format="DD/MM/YYYY"
                    name={name}
                    value={value}
                    onChange={(date) => setFieldValue(name, date, true)}
                />
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
};

export default BirthDatePicker;
