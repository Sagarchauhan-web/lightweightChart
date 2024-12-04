import apiClient from "@/lib/api-client";
import { getToken } from "../auth";

export const placeOrder = async (orderData) => {
  try {
    const token = getToken(); // Retrieve the token
    const response = await apiClient.post('/order/createOrderInTradovate', orderData, {
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

export const getOrders = async (params) => {
  try {
    const token = getToken();
    const response = await apiClient.get('/order/getOrdersInTradovate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params, // Include the date range as query parameters
    });
    return response; // Make sure this returns the whole response, not response.data
  } catch (error) {
    console.error("Error fetching order list:", error);
    throw error;
  }
};

 
// Function to modify an order on Tradovate
export const modifyOrder = async (orderData) => {
  try {
    const token = getToken(); // Retrieve the token
    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const response = await apiClient.post(
      '/order/modifyOrderInTradovate',
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );

    return response.data; // Return the response data
  } catch (error) {
    if (error.response) {
      // The request was made, and the server responded with a status code outside the 2xx range
      console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something else caused an error
      console.error("Error modifying order:", error.message);
    }
    throw error; // Rethrow the error for further handling if needed
  }
};


export const getTickerData = async (tickerData) => {
  try {
    const token = getToken(); // Retrieve the token from your authentication flow
    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const response = await apiClient.post(
      '/order/get_tiker_data_order_tickerData', // Endpoint URL
      tickerData, // The data you need to send in the POST request
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );

    return response.data; // Return the response data
  } catch (error) {
    if (error.response) {
      // The request was made, and the server responded with an error status code
      console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something else caused an error
      console.error("Error fetching ticker data:", error.message);
    }
    throw error; // Rethrow the error for further handling if needed
  }
};