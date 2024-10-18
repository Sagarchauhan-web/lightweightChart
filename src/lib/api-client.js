import { getToken } from '@/services/Auth/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://47e9-150-107-43-93.ngrok-free.app'; 

const apiClient = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});

// Request Interceptor: Attach token to request headers
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken(); // Retrieve token from local storage or auth service
    return {
      ...config,
      headers: {
        ...(token !== null && { Authorization: `Bearer ${token}` }), // Add token if present
        ...config.headers,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 Unauthorized error
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('token'); // Remove token on 401

      if (error?.response?.data?.data?.toLowerCase() === 'you are loggedout!') {
        // Handle custom logout message
        return window.location.href = '/'; // Redirect to homepage
      }

      window.location.href = '/'; // Redirect to homepage for 401 errors
    }
    return Promise.reject(error);
  }
);

export default apiClient;
