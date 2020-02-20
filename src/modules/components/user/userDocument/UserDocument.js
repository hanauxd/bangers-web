import React from 'react';
import { Formik, Form } from 'formik';
import { Form as FileForm, DropZone } from 'react-formik-ui';
import * as Yup from 'yup';
import { MDBBtn } from 'mdbreact';

const UserDocument = props => {
  const initialValues = {
    files: []
  }

  const userDocumentSchema = Yup.object().shape({
    files: Yup.array().required("File is required.")
  })

  const handleUploadDocument = (values, { resetForm }) => {
    resetForm({});
    props.onUploadDocument(values.files)
  }

  const form = (
    <Formik
      initialValues={initialValues}
      onSubmit={handleUploadDocument}
      validationSchema={userDocumentSchema}
    >
      {() => {
        return (
          <Form>
            <FileForm>
              <DropZone lable='Upload images' name='files' placeholder="Browse or drag and drop the images here." withClearButton />
            </FileForm>
            <div style={{ textAlign: 'right' }}>
              <MDBBtn color="mdb-color darken-3" type="submit">UPLOAD</MDBBtn>
            </div>
          </Form>
        )
      }}
    </Formik>
  )

  return (
    <div>{form}</div>
  )
}

export default UserDocument;