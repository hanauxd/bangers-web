import React from 'react';
import { MDBModal, MDBModalHeader, MDBModalBody } from 'mdbreact';

import { useCustomState } from './../../../helpers/hooks';

const UserDocumentItem = props => {
  const { image, styles } = props.media;
  const [state, setState] = useCustomState({
    modal: "",
  })

  const toggle = (id) => {
    if (state.modal !== id) {
      setState({
        modal: id,
      })
    }
  }

  return (
    <div >
      <img
        onClick={() => toggle(image.id)}
        className={styles}
        alt=""
        src={`http://localhost:8080/user-documents/download/${image.filename}`}
      />
      <MDBModal isOpen={state.modal === image.id} toggle={() => toggle("")} centered>
        <MDBModalHeader toggle={() => toggle("")}>Document</MDBModalHeader>
        <MDBModalBody>
          <img alt="" className="img-fluid" src={`http://localhost:8080/user-documents/download/${image.filename}`} />
        </MDBModalBody>
      </MDBModal>
    </div >
  )
}

export default UserDocumentItem;