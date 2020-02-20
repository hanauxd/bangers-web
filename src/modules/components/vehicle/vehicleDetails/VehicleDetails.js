import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { MDBTable, MDBTableBody } from 'mdbreact';

import { currency } from './../../../helpers/CurrencyFormatter';
import { useCustomState } from './../../../helpers/hooks';
import { fetchVehicleDetails as fetchVehicleFromApi } from '../../../api/vehicle';

import styles from './VehicleDetails.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const VehicleDetails = props => {
  const { match: { params: { id } } } = props;
  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    vehicle: null,
  })

  useEffect(() => {
    fetchVehicleDetails();
    //eslint-disable-next-line
  }, [])

  const fetchVehicleDetails = async () => {
    try {
      const result = await fetchVehicleFromApi(id);
      setState({
        loading: false,
        vehicle: { ...result }
      })
    } catch (error) {
      setState({
        loading: false,
        error: error.message
      })
    }
  }

  const renderLoading = () => {
    return <div>Loading...</div>
  }

  const renderError = () => {
    return <div>{state.error}</div>
  }

  const renderVehicleDetails = () => {
    const images = state.vehicle.vehicleImages.map(image => {
      return (
        <div key={image.id}>
          <img alt='' src={`http://localhost:8080/vehicles/images/download/${image.filename}`} />.
        </div>
      )
    })

    return (
      <div className={styles.container}>
        <div className={styles.image__div}>
          <Carousel>
            {images}
          </Carousel>
        </div>
        <div className={styles.content__div}>
          <div className={styles.price__div}>
            <h4>{currency.format(state.vehicle.price)}</h4><span>/DAILY</span>
          </div>
          <MDBTable responsive>
            <MDBTableBody>
              <tr>
                <td>License</td>
                <td>{state.vehicle.license}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{state.vehicle.description}</td>
              </tr>
              <tr>
                <td>Brand</td>
                <td>{state.vehicle.brand}</td>
              </tr>
              <tr>
                <td>Model</td>
                <td>{state.vehicle.model}</td>
              </tr>
              <tr>
                <td>Fuel Type</td>
                <td>{state.vehicle.fuelType}</td>
              </tr>
              <tr>
                <td>Transmission Type</td>
                <td>{state.vehicle.transmissionType}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>{state.vehicle.category}</td>
              </tr>
              <tr>
                <td>Size</td>
                <td>{state.vehicle.size}</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
    )
  }

  return state.loading ? renderLoading() : state.error ? renderError() : renderVehicleDetails();
}

export default withRouter(VehicleDetails);