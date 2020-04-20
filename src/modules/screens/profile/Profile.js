import React, { useEffect } from "react";
import { connect } from "react-redux";

import { useCustomState } from "./../../helpers/hooks";
import { onFetchUser, onUploadUserDocuments } from "../../api/user";
import { Profile as ProfileDetails, UserDocument, UserDocumentItem, Spinner } from "./../../components";

import styles from "./Profile.module.css";

const Profile = props => {
    const [state, setState] = useCustomState({
        loading: true,
        error: null,
        user: null
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
                user: { ...result }
            });
        } catch (error) {
            setState({
                loading: false,
                error: error.message
            });
        }
    };

    const handleUploadUserDocument = async files => {
        try {
            const token = props.auth.jwt;
            const result = await onUploadUserDocuments(files, token);
            setState({
                user: { ...result }
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const renderError = () => {
        return <div>{state.error}</div>;
    };

    const renderUserProfile = () => {
        const imageList = state.user.documents.map(img => (
            <UserDocumentItem key={img.id} media={{ image: img, styles: styles.img }} />
        ));

        return (
            <div className={styles.container}>
                <div className={styles.profile__div}>
                    <ProfileDetails user={state.user} />
                </div>
                <div className={styles.documents__div}>
                    <div className={styles.form__div}>
                        <UserDocument onUploadDocument={handleUploadUserDocument} />
                    </div>
                    <div className={styles.image__div}>
                        {state.user.documents.length > 0 ? (
                            <div style={{ display: "flex", flexFlow: "wrap row" }}>{imageList.reverse()}</div>
                        ) : (
                            <div>No Documents</div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return state.loading ? <Spinner /> : state.error ? renderError() : renderUserProfile();
};

const mapStateToProps = state => {
    return {
        auth: state.auth.auth
    };
};

export default connect(mapStateToProps)(Profile);
