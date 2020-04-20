import { post, get, put } from "./api";

export const makeBooking = (values, token) => {
    const endpoint = "bookings";
    const body = { ...values };
    return post(endpoint, body, token);
};

export const fetchBooking = (id, token) => {
    const endpoint = `bookings/${id}`;
    return get(endpoint, token);
};

export const fetchBookings = (userId, token) => {
    const endpoint = `bookings/user?id=${userId}&sort=createdAt,desc`;
    return get(endpoint, token);
};

export const fetchAllBookings = token => {
    const endpoint = "bookings?sort=createdAt,desc";
    return get(endpoint, token);
};

export const fetchBookingById = (id, token) => {
    const endpoint = `bookings/${id}`;
    return get(endpoint, token);
};

export const extendBooking = (values, token) => {
    const endpoint = `bookings/extend/${values.id}`;
    const body = { ...values };
    return put(endpoint, body, token);
};

export const updateUtilities = (values, token) => {
    const endpoint = `bookings/utils/${values.id}`;
    const body = { ...values };
    return put(endpoint, body, token);
};

export const updateBooking = (values, token) => {
    const { id, status } = values;
    const endpoint = `bookings/update?id=${id}&status=${status}`;
    return post(endpoint, {}, token);
};
