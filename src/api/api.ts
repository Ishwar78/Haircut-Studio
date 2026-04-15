const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
};

export const adminApi = {
  login: (credentials: any) => apiCall("/admin/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  }),
  getStats: () => apiCall("/admin/dashboard-stats"),
  // Explore Gallery
  getExplore: () => apiCall("/explore"),
  addExplore: (formData: FormData) => fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"}/explore`, {
    method: "POST",
    body: formData,
  }).then(res => res.json()),
  deleteExplore: (id: string) => apiCall(`/explore/${id}`, {
    method: "DELETE",
  }),
  // Services & Plans
  getServices: () => apiCall("/services"),
  addService: (data: any) => apiCall("/services", {
    method: "POST",
    body: JSON.stringify(data),
  }),

updateService: (id: string, data: any) => apiCall(`/services/${id}`, {
  method: "PUT",
  body: JSON.stringify(data),
}),

  deleteService: (id: string) => apiCall(`/services/${id}`, {
    method: "DELETE",
  }),
  // Try Now Config
  getTryNowColors: () => apiCall("/try-now/colors"),
  addTryNowColor: (data: any) => apiCall("/try-now/colors", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  deleteTryNowColor: (id: string) => apiCall(`/try-now/colors/${id}`, {
    method: "DELETE",
  }),
  getTryNowStyles: () => apiCall("/try-now/quick-styles"),
  addTryNowStyle: (formData: FormData) => apiCall("/try-now/quick-styles", {
    method: "POST",
    body: formData,
  }),
  deleteTryNowStyle: (id: string) => apiCall(`/try-now/quick-styles/${id}`, {
    method: "DELETE",
  }),


// BEFORE AFTER
getBeforeAfter: () => apiCall("/before-after"),

getAllBeforeAfter: () => apiCall("/before-after/admin"),

addBeforeAfter: (data: any) => apiCall("/before-after", {
  method: "POST",
  body: JSON.stringify(data),
}),

deleteBeforeAfter: (id: string) => apiCall(`/before-after/${id}`, {
  method: "DELETE",
}),




};
