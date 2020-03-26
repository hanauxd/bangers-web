import { get, post } from "./api";

export const onFetchUser = token => {
    const endpoint = "users/auth-user";
    return get(endpoint, token);
};

export const onUploadUserDocuments = (files, token) => {
    const endpoint = "user-documents/upload";
    let formData = new FormData();
    for (const file of files) {
        formData.append("file", file);
    }
    return post(endpoint, formData, token);
};

export const onGetUser = (email, token) => {
    const endpoint = `users/username?email=${email}`;
    return post(endpoint, null, token);
};

export const onGetAllUsers = token => {
    const endpoint = "users";
    return get(endpoint, token);
};

export const onGetBlacklistedUsers = token => {
    const endpoint = "users/blacklisted-users";
    return get(endpoint, token);
};

export const onUnblockUser = (userId, token) => {
    const endpoint = `users/blacklist/${userId}`;
    return post(endpoint, null, token);
};
