import React from "react";
import { useHistory } from "react-router-dom";
import { MDBCardImage, MDBCardTitle, MDBCardFooter, MDBIcon } from "mdbreact";

import { currency } from "../../../helpers/CurrencyFormatter";

import styles from "./VehicleItem.module.css";

const VehicleItem = props => {
    const history = useHistory();
    const { id, brand, model, fuelType, transmissionType, price, vehicleImages } = props.vehicle;

    const handleViewVehicle = () => {
        history.push(`/vehicles/${id}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.image__div} onClick={handleViewVehicle}>
                <MDBCardImage
                    className="img-fluid"
                    src={`http://localhost:8080/vehicles/images/download/${vehicleImages[0].filename}`}
                    waves
                />
            </div>
            <h3>
                {brand} {model}
            </h3>
            <span className={styles.price__span}>{currency.format(price)}</span>
            <MDBCardFooter>
                <div className={styles.footer__div}>
                    <div>
                        <MDBIcon icon="gas-pump" /> {fuelType}
                    </div>
                    <div>
                        <MDBIcon icon="car" /> {transmissionType}
                    </div>
                </div>
            </MDBCardFooter>
        </div>
    );
};

export default VehicleItem;
