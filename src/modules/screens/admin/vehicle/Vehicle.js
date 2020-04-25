import React, { useEffect } from "react";
import { connect } from "react-redux";
import cogoToast from "cogo-toast";

import { useCustomState } from "./../../../helpers/hooks";
import { fetchVehicles, addVehicle } from "../../../api/vehicle";
import { VehicleItem, AddVehicle, Spinner } from "../../../components";

import styles from "./Vehicle.module.css";

const Vehicle = (props) => {
    const [state, setState] = useCustomState({
        loading: true,
        error: null,
        vehicles: [],
    });

    useEffect(() => {
        fetchAllVehicles();
        //eslint-disable-next-line
    }, []);

    const fetchAllVehicles = async () => {
        try {
            const result = await fetchVehicles();
            setState({
                loading: false,
                vehicles: [...result],
            });
        } catch (error) {
            setState({
                loading: false,
                error: error.message,
            });
        }
    };

    const handleAddVehicle = async (vehicle, files) => {
        try {
            const token = props.auth.jwt;
            const result = await addVehicle(vehicle, files, token);
            setState({
                vehicles: [...result],
            });
        } catch (error) {
            const message = JSON.parse(error.request.response).message;
            cogoToast.error(message);
        }
    };

    const renderError = () => {
        return <div>{state.error}</div>;
    };

    const renderVehiclePage = () => {
        const vehicles = state.vehicles.map((vehicle) => <VehicleItem key={vehicle.id} vehicle={vehicle} />);
        return (
            <div className={styles.container}>
                {props.auth !== null && props.auth.userRole === "ROLE_ADMIN" ? (
                    <div className={styles.form__div}>
                        <AddVehicle onAddVehicle={handleAddVehicle} />
                    </div>
                ) : null}
                <div className={styles.items__div}>{vehicles.reverse()}</div>
            </div>
        );
    };

    return state.loading ? <Spinner /> : state.error ? renderError() : renderVehiclePage();
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth,
    };
};

export default connect(mapStateToProps)(Vehicle);
