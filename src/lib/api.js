import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * A promise that resolves with the current auth user object
 * once Firebase has initialized.
 */
const getAuthUser = () => {
  return new Promise((resolve, reject) => {
    // onAuthStateChanged returns an unsubscribe function
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe(); // Unsubscribe to prevent memory leaks
        resolve(user); // Resolve with the user (or null)
      },
      reject
    ); // Reject if there's an init error
  });
};

// Generic fetch wrapper for TanStack Query
export const apiRequest = async (endpoint, options = {}) => {

  const user = await getAuthUser();

  let token = null;
  if (user) {

    try {
      token = await user.getIdToken();
    } catch (error) {
      console.error("Error getting auth token:", error);
    }
  }


  if (!token) {
    // This will be caught by React Router's error boundary
    throw new Error("No token provided");
  }

  const config = {
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },
    ...options,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...config,
    body: config.body ? JSON.stringify(config.body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  // Handle no-content responses (like DELETE)
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }
  return {}; // Return an empty object for 200 OK responses with no body
};

// Auth API
export const authAPI = {
  verifyToken: (idToken) =>
    apiRequest("/auth/verify-token", {
      method: "POST",
      body: { idToken },
    }),
    
  // Forgot Password
  forgotPassword: (email) =>
    apiRequest("/auth/forgot-password", {
      method: "POST",
      body: { email },
    }),

  // Verify Reset Code
  verifyResetCode: (oobCode) =>
    apiRequest("/auth/verify-reset-code", {
      method: "POST",
      body: { oobCode },
    }),

  // Reset Password
  resetPassword: (oobCode, newPassword) =>
    apiRequest("/auth/reset-password", {
      method: "POST",
      body: { oobCode, newPassword },
    }),
};

// Transaction API
export const transactionAPI = {
  getAll: (userEmail, sortBy, sortOrder) =>
    apiRequest(
      `/transactions?userEmail=${userEmail}&sortBy=${sortBy}&sortOrder=${sortOrder}`
    ),

  getById: (id) => apiRequest(`/transactions/${id}`),

  create: (transactionData) =>
    apiRequest("/transactions", {
      method: "POST",
      body: transactionData,
    }),

  update: (id, transactionData) =>
    apiRequest(`/transactions/${id}`, {
      method: "PUT",
      body: transactionData,
    }),

  delete: (id) =>
    apiRequest(`/transactions/${id}`, {
      method: "DELETE",
    }),
};

// Reports API
export const reportsAPI = {
  getSummary: (userEmail) =>
    apiRequest(`/reports/summary?userEmail=${userEmail}`),

  getCategoryBreakdown: (userEmail) =>
    apiRequest(`/reports/by-category?userEmail=${userEmail}`),

  getMonthlyData: (userEmail, year) =>
    apiRequest(`/reports/monthly?userEmail=${userEmail}&year=${year}`),
};


// Query Keys for TanStack Query
export const queryKeys = {
  // Key for the list of all transactions for a user
  transactionsByUser: (userEmail, sortBy, sortOrder) => [
    "transactions",
    userEmail,
    sortBy,
    sortOrder,
  ],

  // Key for a single transaction's details
  transactionById: (id) => ["transaction", id],
};