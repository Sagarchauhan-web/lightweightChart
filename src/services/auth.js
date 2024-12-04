import apiClient from "@/lib/api-client";

export const me = async () => {
  try {
    const response = await apiClient.get("/Me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const register = async (requestData) => {
  try {
    const response = await apiClient.post("/users", requestData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const login = async (requestData) => {
  try {
    const response = await apiClient.post("/users/login", requestData);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.get("/LogOut");
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// export const saveToken = (token) => {
//   localStorage.setItem("token", token);
// };

// export const getToken = () => {
//   return localStorage.getItem("token");
// };
export const saveToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");

// New function to fetch ticker data
export const getTickerData = async (symbol, startDate, endDate) => {
  const payload = {
    symbol: symbol,
    start_date: startDate,
    end_date: endDate,
  };

  try {
    const response = await apiClient.post("/order/tickerData", payload);
    return response.data.data; // Return the data array directly
  } catch (error) {
    console.error("Error fetching ticker data:", error);
    throw error;
  }
};
