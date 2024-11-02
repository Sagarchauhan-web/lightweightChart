import apiClient from "@/lib/api-client";
import { getToken } from "../auth";

export const placeOrder = async (orderData) => {
  try {
    const token = getToken(); // Retrieve the token
    const response = await apiClient.get('/order/getOrdersInTradovate', orderData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });
    
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error placing order:", error);
    throw error; // Rethrow the error for further handling if needed
  }
};

  
export const getOrders = async () => {
  try {
    const token = getToken(); // Retrieve the token
    const response = await apiClient.get('/order/getOrdersInTradovate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching order list:", error);
    throw error;
  }
};

 