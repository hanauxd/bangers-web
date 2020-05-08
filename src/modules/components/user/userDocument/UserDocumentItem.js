import React from "react";
import * as moment from "moment";
import { MDBModal, MDBModalHeader, MDBModalBody, MDBBtn } from "mdbreact";

import { useCustomState } from "./../../../helpers/hooks";

import styles from "./UserDocumentItem.module.css";

const UserDocumentItem = (props) => {
    const { id, filename, type, issueDate } = props.document;
    const { removeDocument } = props;
    const [state, setState] = useCustomState({
        modal: "",
    });

    const toggle = (id) => {
        if (state.modal !== id) {
            setState({
                modal: id,
            });
        }
    };

    const attribute = (label, value) => {
        return (
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <span style={{ fontSize: "0.7rem" }}>{label}</span>
                <span style={{ fontWeight: "bold" }}>{value}</span>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            {attribute("TYPE", type)}
            {attribute("ISSUE DATE", moment.utc(issueDate).local().format("DD MMMM YYYY"))}
            <div>
                <MDBBtn size="sm" color="mdb-color darken-3" onClick={() => toggle(id)}>
                    View
                </MDBBtn>
                <MDBBtn size="sm" outline color="mdb-color darken-3" onClick={() => removeDocument(id)}>
                    Remove
                </MDBBtn>
            </div>
            <MDBModal isOpen={state.modal === id} toggle={() => toggle("")} centered>
                <MDBModalHeader toggle={() => toggle("")}>{type}</MDBModalHeader>
                <MDBModalBody>
                    <img
                        alt=""
                        className="img-fluid"
                        src={`http://localhost:8080/user-documents/download/${filename}`}
                    />
                </MDBModalBody>
            </MDBModal>
        </div>
    );
};

export default UserDocumentItem;
