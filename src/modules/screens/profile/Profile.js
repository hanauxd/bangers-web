import React, { useEffect } from "react";
import { connect } from "react-redux";
import cogoToast from "cogo-toast";

import { useCustomState } from "./../../helpers/hooks";
import { onFetchUser, onUploadUserDocuments, onDeleteUserDocument } from "../../api/user";
import { Profile as ProfileDetails, UserDocument, UserDocumentItem, Spinner } from "./../../components";

import styles from "./Profile.module.css";

const Profile = (props) => {
    const [state, setState] = useCustomState({
        loading: true,
        error: null,
        user: null,
        documentList: [],
        documentError: "",
    });

    useEffect(() => {
        fetchUserDetails();
        //eslint-disable-next-line
    }, []);

    const fetchUserDetails = async () => {
        try {
            const token = props.auth.jwt;
            const result = await onFetchUser(token);
            setState({
                loading: false,
                user: { ...result },
                documentList: [...result.documents],
            });
        } catch (error) {
            setState({
                loading: false,
                error: error.message,
            });
        }
    };

    const handleUploadUserDocument = async (values) => {
        try {
            setState({
                documentError: "",
            });
            const token = props.auth.jwt;
            const result = await onUploadUserDocuments(values, token);
            setState({
                user: { ...result },
                documentList: [...result.documents],
            });
        } catch (error) {
            if (error.request != null) {
                setState({
                    documentError: JSON.parse(error.request.response),
                });
            } else {
                cogoToast.error("Failed to upload document.");
            }
        }
    };

    const handleRemoveDocument = async (id) => {
        try {
            const token = props.auth.jwt;
            const result = await onDeleteUserDocument(id, token);
            setState({
                documentList: [...result],
            });
        } catch (error) {
            cogoToast.error("Failed to remove document.");
        }
    };

    const renderError = () => {
        return <div>{state.error}</div>;
    };

    const renderUserProfile = () => {
        const imageList = state.documentList.map((doc) => (
            <UserDocumentItem removeDocument={handleRemoveDocument} key={doc.id} document={doc} />
        ));

        return (
            <div className={styles.container}>
                <ProfileDetails user={state.user} />
                <div className={styles.form__div}>
                    <UserDocument onUploadDocument={handleUploadUserDocument} />
                    <span style={{ color: "red", fontSize: "0.8rem", marginTop: "10px" }}>
                        {state.documentError.message}
                    </span>
                </div>
                <div className={styles.documentList__div}>
                    {state.documentList.length > 0 ? (
                        <div style={{ display: "flex", flexDirection: "column" }}>{imageList.reverse()}</div>
                    ) : (
                        <div>No Documents</div>
                    )}
                </div>
            </div>
        );
    };

    return state.loading ? <Spinner /> : state.error ? renderError() : renderUserProfile();
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth,
    };
};

export default connect(mapStateToProps)(Profile);
