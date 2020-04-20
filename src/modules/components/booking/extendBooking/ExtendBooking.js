import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { useCustomState } from "./../../../helpers/hooks";
import { fetchBooking } from "../../../api/booking";
import { onFetchAvailableUtilities } from "../../../api/utility";
import { ExtendBookingForm, Spinner } from "../..";

const ExtendBooking = props => {
    const {
        match: {
            params: { id }
        }
    } = props;

    const [state, setState] = useCustomState({
        loading: true,
        error: null,
        booking: null,
        utilities: []
    });

    useEffect(() => {
        fetchUtilitiesFromApi();
        fetchBookingDetails();
        //eslint-disable-next-line
    }, []);

    const fetchUtilitiesFromApi = async () => {
        try {
            const result = await onFetchAvailableUtilities();
            setState({
                loading: false,
                utilities: [...result]
            });
        } catch (error) {
            setState({
                loading: false,
                error: error.message
            });
        }
    };

    const fetchBookingDetails = async () => {
        try {
            const token = props.auth.jwt;
            const result = await fetchBooking(id, token);
            setState({
                loading: false,
                booking: { ...result }
            });
        } catch (error) {
            setState({
                loading: false,
                error: error.message
            });
        }
    };

    const renderError = () => {
        return <div>{state.error}</div>;
    };

    const renderExtendBooking = () => {
        return <ExtendBookingForm booking={state.booking} utilities={state.utilities} auth={props.auth} />;
    };

    return state.loading ? <Spinner /> : state.error ? renderError() : state.booking && renderExtendBooking();
};

const mapStateToProps = state => {
    return {
        auth: state.auth.auth
    };
};

export default withRouter(connect(mapStateToProps, null)(ExtendBooking));
