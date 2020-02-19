import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { useCustomState } from './../../../helpers/hooks';
import { fetchVehicles, addVehicle } from '../../../api/vehicle';
import { VehicleItem, AddVehicle } from '../../../components';

import styles from './Vehicle.module.css';

const Vehicle = props => {
  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    vehicles: [],
  })

  useEffect(() => {
    fetchAllVehicles();
    //eslint-disable-next-line
  }, [])

  const fetchAllVehicles = async () => {
    try {
      const result = await fetchVehicles(props.auth.jwt);
      setState({
        loading: false,
        vehicles: [...result]
      })
    } catch (error) {
      setState({
        loading: false,
        error: error.message
      })
    }
  }

  const handleAddVehicle = async (vehicle, files) => {
    try {
      const token = props.auth.jwt;
      const result = await addVehicle(vehicle, files, token);
      setState({
        vehicles: [...result]
      })
    } catch (error) {
      if (error.request.status === 400) {
        alert("License number already exist.")
      }
    }
  }

  const renderLoading = () => {
    return <div>Loading...</div>
  }

  const renderError = () => {
    return <div>{state.error}</div>
  }

  const renderVehiclePage = () => {
    const vehicles = state.vehicles.map(vehicle => (
      <VehicleItem key={vehicle.id} vehicle={vehicle} />
    ))
    return (
      <div className={styles.container}>
        <div className={styles.form__div}>
          <AddVehicle onAddVehicle={handleAddVehicle} />
        </div>
        <div className={styles.items__div}>
          {vehicles.reverse()}
        </div>
      </div>
    )
  }

  return state.loading ? renderLoading() : state.error ? renderError() : renderVehiclePage();
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  }
}

export default connect(mapStateToProps)(Vehicle);