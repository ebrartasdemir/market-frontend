import axios from "axios";
import { BaseUrl } from "./Constants";
export const getProductById = async (id) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BaseUrl}/product/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
