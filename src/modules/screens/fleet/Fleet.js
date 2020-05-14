import React, { useEffect } from "react";

import { FleetComparison, Spinner } from "../../components";
import { useCustomState } from "../../helpers/hooks";
import { fetchFleetComparison } from "../../api/vehicle";

const Fleet = (props) => {
    const [state, setState] = useCustomState({
        loading: true,
        error: null,
        fleet: null,
    });

    useEffect(() => {
        fetchFleetComparisonFromApi();
        //eslint-disable-next-line
    }, []);

    const fetchFleetComparisonFromApi = async () => {
        try {
            const result = await fetchFleetComparison();
            setState({
                loading: false,
                fleet: { ...result },
            });
        } catch (error) {
            setState({
                loading: false,
                error: error.message,
            });
        }
    };

    const renderError = () => {
        return <div>{state.error}</div>;
    };

    const renderFleetComparison = () => {
        return <FleetComparison fleet={state.fleet.comparisonResponses} />;
    };

    return state.loading ? <Spinner /> : state.error ? renderError() : renderFleetComparison();
};

export default Fleet;
