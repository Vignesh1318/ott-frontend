const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const token = localStorage.getItem("authToken");
  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const message = await safeParseError(res);
    throw new Error(message || `Request failed with status ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

async function safeParseError(res) {
  try {
    const data = await res.json();
    return data?.message || data?.error;
  } catch {
    return null;
  }
}

export const contentService = {
  // GET /api/home?profileId=<profileId>
  getHome(profileId) {
    const params = new URLSearchParams();
    if (profileId) {
      params.set("profileId", profileId);
    }
    const query = params.toString();
    const path = query ? `/home?${query}` : "/home";
    return request(path);
  },

  // Expected response: full details for a given content id
  getContentDetails(id) {
    return request(`/content/${id}`);
  },

  // Optional search endpoint you can implement in BE
  search(query) {
    const params = new URLSearchParams({ q: query });
    return request(`/search?${params.toString()}`);
  },
};

export const profileService = {
  getActiveProfileId() {
    return localStorage.getItem("activeProfileId");
  },

  setActiveProfileId(profileId) {
    localStorage.setItem("activeProfileId", profileId);
  },

  clear() {
    localStorage.removeItem("activeProfileId");
  },
};

export const authService = {
  async login({ email, password }) {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data?.token) {
      localStorage.setItem("authToken", data.token);
      if (Array.isArray(data.user?.profiles) && data.user.profiles.length > 0) {
        const firstProfile = data.user.profiles[0];
        localStorage.setItem("activeProfileId", firstProfile.id);
      }
    }

    return data;
  },

  logout() {
    localStorage.removeItem("authToken");
    profileService.clear();
  },
};

