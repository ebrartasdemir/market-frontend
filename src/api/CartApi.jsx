import axios from "axios";
import {BaseUrl} from "./Constants";
export const getCartItems = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BaseUrl}/cartItems/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
export const getAllAddresses = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BaseUrl}/adresses/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data)
                console.log(response.data.data);

        return response.data.data;

    } catch (error) {
        throw error;
    }
}
export const deleteCartItem = async (cartItemId) => {
    try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`${BaseUrl}/cartItem/${cartItemId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw error;
    }
}
export const addOrder = async (orderData) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(`${BaseUrl}/order`, orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
export const addAddress = async (addressData) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(`${BaseUrl}/adress`, {
            title: addressData.title,
            city: addressData.city,
            district: addressData.district,
            avunue: addressData.avenue,
            street: addressData.street,
            eno: addressData.eno,
            ino: addressData.ino,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
