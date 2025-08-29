import axios from "axios";
import { BaseUrl } from "./Constants";

export const login = async (data) => {
    try {
        const response = await axios.post(`${BaseUrl}/login`, data);
        const token = response.data.data.accessToken;
        localStorage.setItem('authToken', token);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const register = async (data) => {
    try {
        const response = await axios.post(`${BaseUrl}/register`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
