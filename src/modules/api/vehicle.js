import { post, get } from "./api";

export const fetchVehicles = () => {
    const endpoint = "vehicles/all";
    return get(endpoint);
};

export const fetchVehicleDetails = (id) => {
    const endpoint = `vehicles/${id}`;
    return get(endpoint);
};

export const addVehicle = (vehicle, files, token) => {
    const endpoint = "vehicles";
    let formData = new FormData();
    formData.append("vehicle", JSON.stringify(vehicle));
    files.forEach((file) => {
        formData.append("file", file);
    });
    return post(endpoint, formData, token);
};

export const fetchAverageExternalRate = (vehicle) => {
    const endpoint = `external-rates/${vehicle}`;
    return get(endpoint);
};

export const fetchFleetComparison = () => {
    const endpoint = "external-rates/our-rates";
    return get(endpoint);
};
