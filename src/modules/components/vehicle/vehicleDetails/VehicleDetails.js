import React, { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { MDBTable, MDBTableBody, MDBBtn } from "mdbreact";

import { currency } from "../../../helpers/CurrencyFormatter";
import { useCustomState } from "../../../helpers/hooks";
import { VEHICLE_PLACEHOLDER } from "../../../helpers/Constant";
import { fetchVehicleDetails as fetchVehicleFromApi, fetchAverageExternalRate } from "../../../api/vehicle";
import { Spinner } from "../../index";

import styles from "./VehicleDetails.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const VehicleDetails = (props) => {
    const history = useHistory();
    const {
        match: {
            params: { id },
        },
    } = props;
    const [state, setState] = useCustomState({
        loading: true,
        error: null,
        vehicle: null,
        discount: 0,
    });

    useEffect(() => {
        fetchVehicleDetails();
        //eslint-disable-next-line
    }, []);

    const fetchVehicleDetails = async () => {
        try {
            const result = await fetchVehicleFromApi(id);
            fetchAvgExtRate(result);
            setState({
                loading: false,
                vehicle: { ...result },
            });
        } catch (error) {
            setState({
                loading: false,
                error: error.message,
            });
        }
    };

    const fetchAvgExtRate = async (vehicle) => {
        const result = await fetchAverageExternalRate(vehicle.brand + " " + vehicle.model);
        const discount = Math.round(((result - vehicle.price) / vehicle.price) * 100);
        setState({
            discount: discount,
        });
    };

    const handleBookVehicle = () => {
        history.push("/", {
            vehicleId: {
                value: id,
                label: `${state.vehicle.brand} ${state.vehicle.model}`,
            },
        });
    };

    const renderError = () => {
        return <div>{state.error}</div>;
    };

    const renderVehicleDetails = () => {
        const vehicleImages = state.vehicle.vehicleImages;
        const images =
            vehicleImages.length > 0 ? (
                vehicleImages.map((image) => {
                    return (
                        <img
                            key={image.id}
                            alt=""
                            src={`http://localhost:8080/vehicles/images/download/${image.filename}`}
                        />
                    );
                })
            ) : (
                <img alt="" src={VEHICLE_PLACEHOLDER} />
            );

        return (
            <div className={styles.root}>
                <h3>VEHICLE DETAILS</h3>
                <div className={styles.container}>
                    <div className={styles.image__div}>
                        <Carousel>{images}</Carousel>
                    </div>
                    <div className={styles.content__div}>
                        {state.discount > 0 ? (
                            <div className={styles.discount}>{`*Book with us today and save ${state.discount}%`}</div>
                        ) : null}
                        <div className={styles.price__div}>
                            <h4>{currency.format(state.vehicle.price)}</h4>
                            <span>/DAILY</span>
                        </div>
                        <MDBTable responsive>
                            <MDBTableBody>
                                <tr>
                                    <td className={styles.bold__label}>License</td>
                                    <td>{state.vehicle.license}</td>
                                </tr>
                                <tr>
                                    <td className={styles.bold__label}>Description</td>
                                    <td>{state.vehicle.description}</td>
                                </tr>
                                <tr>
                                    <td className={styles.bold__label}>Brand</td>
                                    <td>{state.vehicle.brand}</td>
                                </tr>
                                <tr>
                                    <td className={styles.bold__label}>Model</td>
                                    <td>{state.vehicle.model}</td>
                                </tr>
                                <tr>
                                    <td className={styles.bold__label}>Fuel Type</td>
                                    <td>{state.vehicle.fuelType}</td>
                                </tr>
                                <tr>
                                    <td className={styles.bold__label}>Transmission Type</td>
                                    <td>{state.vehicle.transmissionType}</td>
                                </tr>
                                <tr>
                                    <td className={styles.bold__label}>Category</td>
                                    <td>{state.vehicle.category}</td>
                                </tr>
                                <tr>
                                    <td className={styles.bold__label}>Size</td>
                                    <td>{state.vehicle.size}</td>
                                </tr>
                            </MDBTableBody>
                        </MDBTable>
                        <MDBBtn className={styles.book__btn} color="mdb-color darken-3" onClick={handleBookVehicle}>
                            Book Now
                        </MDBBtn>
                    </div>
                </div>
            </div>
        );
    };

    return state.loading ? <Spinner /> : state.error ? renderError() : renderVehicleDetails();
};

export default withRouter(VehicleDetails);
