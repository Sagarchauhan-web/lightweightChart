import apiClient from "@/lib/api-client";

// global route 
export const me = async () => {
  try {
    const response = await apiClient.get("/Me");
    return response.data;
  } catch (error) {
    return error;
  }
};

// reigster the new user Dablu
export const register = async (requestData) => {
  try {
    const response = await apiClient.post("/users", requestData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};


export const getTokenUrl = async () => {
  try {
    const response = await apiClient.get("/GetTokenUrl");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const login = async (requestData) => {
  try {
    const response = await apiClient.post("/LogIn", requestData);
    return response.data;
  } catch (error) {
    return error;
  }
};
 


// export const logout = async () => {
//   try {
//     const response = await apiClient.get('/LogOut');
//     localStorage.removeItem('token');
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// export const refreshOauthUrl = async (code) => {
//   try {
//     const response = await apiClient.post(`/oauth/tradovate/callback`, {
//       code,
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// export const getToken = () => {
//   return localStorage.getItem('token');
// };

// export const resetPasswordRequest = async (email) => {
//   try {
//     const response = await apiClient.post('/SendResetLink', {
//       email: email,
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// export const resetPassword = async (requestData) => {
//   try {
//     const response = await apiClient.post('/ResetPassword', requestData);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// export const SetAccountSettings = async (requestData) => {
//   try {
//     const response = await apiClient.post('/OrderSetting', requestData);
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };

// export const setAccountUserCoupon = async (requestData) => {
//   try {
//     const response = await apiClient.post('/AddUserDiscountCode', requestData);
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };

// export const getAcountEmailVerified = async (requestData) => {
//   try {
//     const response = await apiClient.post('/MailVerified', requestData);
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };

// export const savePauseNewsTrade = async (requestData) => {
//   try {
//     const response = await apiClient.post('/PauseNewsTrade', requestData);
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };

// export const getPauseNewsTrade = async () => {
//   try {
//     const response = await apiClient.get('/GetPauseNewsTrade');
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };
// export const deletePauseNewsTrade = async () => {
//   try {
//     const response = await apiClient.get('/DelPauseNewsTrade');
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// export const getTokenCallbackVerified = async (requestData) => {
//   try {
//     const response = await apiClient.post('/SaveUserToken', requestData);
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };
