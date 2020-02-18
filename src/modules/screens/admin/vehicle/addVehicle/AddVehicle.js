import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardFooter } from 'mdbreact';

import { InputField } from '../../../../components';
import { addVehicle } from '../../../../api/vehicle';

import styles from './AddVehicle.module.css';

const AddVehicle = props => {
  const styleClass = {
    width: '50%',
    margin: '0 2%',
  }
  const initialValues = {
    license: '',
    description: '',
    brand: '',
    model: '',
    fuelType: '',
    transmissionType: '',
    category: '',
    size: '',
    price: '',
  }

  const vehicleSchema = Yup.object().shape({
    license: Yup.string().required('License number is required.'),
    description: Yup.string().required('Description is required.'),
    brand: Yup.string().required('Brand is required.'),
    model: Yup.string().required('Model is required.'),
    fuelType: Yup.string().required('Fuel type is required.'),
    transmissionType: Yup.string().required('Transmission type is required.'),
    category: Yup.string().required('Category is required.'),
    size: Yup.string().required('Size is required.'),
    price: Yup.number().required('Unit price is required.'),
  })

  const handleAddVehicle = async values => {
    try {
      await addVehicle(values, props.auth.jwt);
    } catch (error) {
      if (error.request.status === 400) {
        alert("License number already exist.")
      }
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleAddVehicle}
      validationSchema={vehicleSchema}
    >
      {
        ({
          handleChange,
          handleBlur,
          values
        }) => {
          return (
            <Form>
              <div className={styles.container}>
                <div className={styles.title__div}></div>
                <div className={styles.body__div}>
                  <MDBCard>
                    <MDBCardBody>
                      <MDBCardTitle>Add New Vehicle</MDBCardTitle>
                      <div style={{ display: 'flex' }}>
                        <InputField
                          styleClass={styleClass} label='License' type='text' name='license'
                          onChange={handleChange} onBlur={handleBlur} values={values.license}
                        />
                        <InputField
                          styleClass={styleClass} label='Description' type='text' name='description'
                          onChange={handleChange} onBlur={handleBlur} values={values.description}
                        />
                        <InputField
                          styleClass={styleClass} label='Unit Price' type='number' name='price'
                          onChange={handleChange} onBlur={handleBlur} values={values.price}
                        />
                      </div>
                      <div style={{ display: 'flex' }}>
                        <InputField
                          styleClass={styleClass} label='Fuel Type' type='text' name='fuelType'
                          onChange={handleChange} onBlur={handleBlur} values={values.fuelType}
                        />
                        <InputField
                          styleClass={styleClass} label='Transmission Type' type='text' name='transmissionType'
                          onChange={handleChange} onBlur={handleBlur} values={values.transmissionType}
                        />
                        <InputField
                          styleClass={styleClass} label='Size' type='text' name='size'
                          onChange={handleChange} onBlur={handleBlur} values={values.size}
                        />
                      </div>
                      <div style={{ display: 'flex' }}>
                        <InputField
                          styleClass={styleClass} label='Category' type='text' name='category'
                          onChange={handleChange} onBlur={handleBlur} values={values.category}
                        />
                        <InputField
                          styleClass={styleClass} label='Brand' type='text' name='brand'
                          onChange={handleChange} onBlur={handleBlur} values={values.brand}
                        />
                        <InputField
                          styleClass={styleClass} label='Model' type='text' name='model'
                          onChange={handleChange} onBlur={handleBlur} values={values.model}
                        />
                      </div>
                    </MDBCardBody>
                    <MDBCardFooter>
                      <div style={{ width: '33%', float: 'right' }}>
                        <MDBBtn block type="submit" color="mdb-color darken-3">SAVE</MDBBtn>
                      </div>
                    </MDBCardFooter>
                  </MDBCard>
                </div>
              </div>
            </Form>
          )
        }
      }
    </Formik>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  }
}

export default connect(mapStateToProps)(AddVehicle);