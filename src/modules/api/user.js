import { get, post, remove } from "./api";

export const onFetchUser = (token) => {
    const endpoint = "users/auth-user";
    return get(endpoint, token);
};

export const onUploadUserDocuments = (values, token) => {
    const endpoint = "user-documents/upload";
    let formData = new FormData();
    formData.append("file", values.file);
    formData.append("dateIssued", values.dateIssued);
    formData.append("type", values.type);
    return post(endpoint, formData, token);
};

export const onUploadProfileImage = (file, token) => {
    const endpoint = "users/profile-image";
    let formData = new FormData();
    formData.append("file", file);
    return post(endpoint, formData, token);
};

export const onDeleteUserDocument = (id, token) => {
    const endpoint = `user-documents/${id}`;
    return remove(endpoint, token);
};

export const onGetUser = (email, token) => {
    const endpoint = `users/username?email=${email}`;
    return post(endpoint, null, token);
};

export const onGetAllUsers = (token) => {
    const endpoint = "users";
    return get(endpoint, token);
};

export const onGetBlacklistedUsers = (token) => {
    const endpoint = "users/blacklisted-users";
    return get(endpoint, token);
};

export const onUnblockUser = (userId, token) => {
    const endpoint = `users/blacklist/${userId}`;
    return post(endpoint, null, token);
};
