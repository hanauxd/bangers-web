import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MDBBtn, MDBCardTitle } from 'mdbreact';

import { InputField } from '../../index';

import styles from './AddUtility.module.css';

const AddUtility = props => {
  const initialValues = {
    utilityType: '',
    quantity: ''
  }

  const utilitySchema = Yup.object().shape({
    utilityType: Yup.string().required('Utility type is required.'),
    quantity: Yup.number().min(1, 'Quantity cannot be less than 1.').required('Quantity is required.')
  })

  const handleAddUtility = values => {
    props.handleAddUtility(values);
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleAddUtility}
      validationSchema={utilitySchema}
    >
      {({
        values,
        handleChange,
        handleBlur,
      }) => {
        return (
          <div className={styles.container}>
            <MDBCardTitle>
              ADD NEW CATEGORY
            </MDBCardTitle>
            <Form>
              <InputField
                label='Utility Type'
                type='text'
                name='utilityType'
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.utilityType}
              />
              <InputField
                label='Quantity'
                type='number'
                name='quantity'
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.quantity}
              />
              <div className={styles.button__div}>
                <MDBBtn
                  block
                  color="black"
                  type="submit"
                >SAVE</MDBBtn>
              </div>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}

export default AddUtility;