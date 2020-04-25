import React, { useEffect } from "react";
import { connect } from "react-redux";
import cogoToast from "cogo-toast";

import { AddUtility, UtilityItem, Spinner } from "../../../components";
import { useCustomState } from "./../../../helpers/hooks";
import { onAddUtility, onFetchUtilities, onUpdateUtility } from "../../../api/utility";

import styles from "./Utility.module.css";

const Utility = (props) => {
    const [state, setState] = useCustomState({
        utilities: [],
        loading: true,
        error: null,
    });

    useEffect(() => {
        fetchUtilities();
        //eslint-disable-next-line
    }, []);

    const fetchUtilities = async () => {
        try {
            const result = await onFetchUtilities(props.auth.jwt);
            setState({
                loading: false,
                utilities: [...result],
            });
        } catch (error) {
            setState({
                loading: false,
                error: error.message,
            });
        }
    };

    const addUtility = async (values) => {
        try {
            const result = await onAddUtility(values, props.auth.jwt);
            setState({
                utilities: [...result],
            });
        } catch (error) {
            const message = JSON.parse(error.request.response).message;
            cogoToast.error(message);
        }
    };

    const updateUtility = async (values) => {
        try {
            const result = await onUpdateUtility(values, props.auth.jwt);
            setState({
                utilities: [...result],
            });
        } catch (error) {
            const message = JSON.parse(error.request.response).message;
            cogoToast.error(message);
        }
    };

    const renderError = () => {
        return <div>{state.error}</div>;
    };

    const renderUtilities = () => {
        const utilities = state.utilities.map((util) => {
            return <UtilityItem key={util.id} utility={util} handleUpdateUtility={updateUtility} />;
        });
        return (
            <div className={styles.container}>
                <div className={styles.form__div}>
                    <AddUtility handleAddUtility={addUtility} />
                    <hr />
                </div>
                <div className={styles.utilityItems}>{utilities}</div>
            </div>
        );
    };

    return state.loading ? <Spinner /> : state.error ? renderError() : renderUtilities();
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth,
    };
};

export default connect(mapStateToProps)(Utility);
