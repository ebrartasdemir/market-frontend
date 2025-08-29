import { BaseUrl } from "./Constants";
import axios from "axios";
export const getAllProducts = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BaseUrl}/products`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
export const getAllCategories = async () => {
    try{
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BaseUrl}/categories`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    }
    catch(error){
        throw error;
    }
}
export const getAllProductsByCategory = async (categoryId) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BaseUrl}/products/category/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
export const addToCart = async (productId) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(`${BaseUrl}/cartItem`, {"productId":productId}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

