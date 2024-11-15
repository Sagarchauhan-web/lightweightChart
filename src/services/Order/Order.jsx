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

 
// export const getOrders = async (params) => {
//   try {
//     // Simulate a delay to mimic network request
//     await new Promise((resolve) => setTimeout(resolve, 500)); 

//     // Dummy data to simulate API response
//     const dummyData = [
//       {
//         accountId: 'ACC123',
//         id: 'ORD001',
//         takeProfit: '1.2345',
//         stopPrice: '1.2300',
//         timestamp: new Date().toISOString(),
//         action: 'Buy',
//         ordStatus: 'Filled',
//         contractId: 'CONTRACT123',
//         ocoId: null,
//         executionProviderId: 'Provider001',
//       },
//       {
//         accountId: 'ACC456',
//         id: 'ORD002',
//         takeProfit: '1.5678',
//         stopPrice: '1.5600',
//         timestamp: new Date().toISOString(),
//         action: 'Sell',
//         ordStatus: 'Pending',
//         contractId: 'CONTRACT456',
//         ocoId: 'OCO001',
//         executionProviderId: 'Provider002',
//       },
//       // Add more mock orders as needed
//     ];

//     // Simulate returning a response object similar to a real API call
//     return { data: dummyData };
//   } catch (error) {
//     console.error("Error fetching order list:", error);
//     throw error;
//   }
// };


// Function to modify an order
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
