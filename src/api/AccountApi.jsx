import axios from "axios";
import { BaseUrl } from "./Constants";
export const getActiveUser = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BaseUrl}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
export const updateUser = async (userData) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.put(`${BaseUrl}/user`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
export const getOrders = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BaseUrl}/orders/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
export const getAddressById=async(addressId)=>{
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BaseUrl}/addresses/${addressId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
