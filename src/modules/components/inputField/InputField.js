import React from 'react';
import { MDBInput } from 'mdbreact';
import { ErrorMessage } from 'formik';

const InputField = props => {
  const { styleClass, label, icon, name, type, values, onChange, onBlur } = props;
  return (
    <div style={styleClass}>
      <MDBInput
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        values={values.name}
        icon={icon}
        label={label}
        outline />
      <ErrorMessage name={name}>
        {
          message => <span style={{ color: 'red' }}>{message}</span>
        }
      </ErrorMessage >
    </div>
  )
}

export default InputField;