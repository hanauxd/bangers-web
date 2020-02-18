import React from 'react';
import { MDBBtn, MDBCardTitle, MDBCardText, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdbreact';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useCustomState } from './../../../helpers/hooks';
import { InputField } from '../../index';

import styles from './UtilityItem.module.css';

const UtilityItem = props => {
  const { utility: { utilityType, quantity }, handleUpdateUtility } = props;

  const [state, setState] = useCustomState({
    isOpen: false
  })

  const toggle = () => {
    setState({
      isOpen: !state.isOpen
    })
  }

  const initialValues = {
    quantity: ''
  }

  const utilitySchema = Yup.object().shape({
    quantity: Yup.number().min(1, 'Quantity cannot be less than 1.').required('Quantity is required.')
  })

  const handleUpdate = values => {
    values.utilityType = utilityType;
    handleUpdateUtility(values);
    toggle();
  }

  return (
    <div className={styles.container}>
      <MDBCardTitle>{utilityType}</MDBCardTitle>
      <MDBCardText>Quantity: {quantity}</MDBCardText>
      <MDBBtn style={{ margin: '0' }} block color="mdb-color darken-3" size='sm' onClick={toggle}>UPDATE</MDBBtn>
      <Formik
        initialValues={initialValues}
        onSubmit={handleUpdate}
        validationSchema={utilitySchema}
      >
        {
          ({
            handleChange,
            handleBlur,
            values
          }) => {
            return (
              <Form>
                <MDBModal isOpen={state.isOpen} toggle={toggle}>
                  <MDBModalHeader toggle={toggle}>{utilityType}</MDBModalHeader>
                  <MDBModalBody>
                    <InputField
                      label='Quantity'
                      type='number'
                      name='quantity'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values.quantity}
                    />
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn type="submit" color="mdb-color darken-3" size="sm">UPDATE</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>
              </Form>
            )
          }
        }
      </Formik>
    </div>
  )
}

export default UtilityItem;