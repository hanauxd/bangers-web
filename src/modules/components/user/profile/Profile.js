import React from "react";
import { MDBRow, MDBInput, MDBCol, MDBIcon } from "mdbreact";

import { useCustomState } from "../../../helpers/hooks";

import styles from "./Profile.module.css";

const Profile = (props) => {
    const [state, setState] = useCustomState({
        uploading: false,
    });

    let imageFile = null;
    const { fullName, address, nic, license, dob, phone, email, age, profileImage } = props.user;

    const fileSelectedHandler = (event) => {
        setState({
            uploading: true,
        });
        props.uploadProfileImage(event.target.files[0]);
        setState({
            uploading: false,
        });
    };

    return (
        <div className={styles.container}>
            <span>User Details</span>
            <hr />
            <div className={styles.inner__container}>
                <div className={styles.image__div}>
                    <input
                        type="file"
                        onChange={fileSelectedHandler}
                        style={{ display: "none" }}
                        ref={(fileInput) => (imageFile = fileInput)}
                    />
                    <img
                        className={styles.image}
                        alt="Avatar"
                        src={
                            profileImage
                                ? `http://localhost:8080/user-documents/download/${profileImage}`
                                : "https://www.centerteam.com/assets/img/team/Placeholder.png"
                        }
                    />
                    <div style={{ marginTop: "-16px" }}>
                        {state.uploading ? (
                            <MDBIcon className={styles.imageUpload} icon="spinner" spin />
                        ) : (
                            <MDBIcon className={styles.imageUpload} icon="camera" onClick={() => imageFile.click()} />
                        )}
                    </div>
                    <div style={{ color: "gray" }}>{fullName}</div>
                </div>
                <div style={{ width: "30px" }} />
                <div style={{ flex: "1" }}>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput
                                disabled
                                label="Address"
                                type="text"
                                hint={address}
                                className="form-control mb-4"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                disabled
                                label="Date of Birth"
                                type="text"
                                hint={`${dob} (${age} years)`}
                                className="form-control mb-4"
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput disabled label="NIC" type="text" hint={nic} className="form-control mb-4" />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                disabled
                                label="License"
                                type="text"
                                hint={license}
                                className="form-control mb-4"
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput disabled label="Phone" type="text" hint={phone} className="form-control mb-4" />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                disabled
                                label="Email Address"
                                type="email"
                                hint={email}
                                className="form-control mb-4"
                            />
                        </MDBCol>
                    </MDBRow>
                </div>
            </div>
        </div>
    );
};

export default Profile;
