const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// ============ CORE FETCH HELPER ============

async function fetchAPI(endpoint, options = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}/api${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `API Error: ${res.status}`);
  }

  return res.json();
}

// ============ AUTH ENDPOINTS ============

export async function loginUser(identifier, password) {
  const normalizedIdentifier = identifier.includes("@")
    ? identifier.trim().toLowerCase()
    : identifier.trim();

  return fetchAPI("/auth/local", {
    method: "POST",
    body: JSON.stringify({ identifier: normalizedIdentifier, password }),
  });
}

export async function registerUser(username, email, password) {
  return fetchAPI("/auth/local/register", {
    method: "POST",
    body: JSON.stringify({ username: username.trim(), email: email.trim().toLowerCase(), password }),
  });
}

export async function getMe() {
  return fetchAPI("/users/me?populate=*");
}

// ============ SKILL ENDPOINTS ============

export async function getApprovedSkills(filters = {}) {
  const params = new URLSearchParams();
  params.append("filters[status][$eq]", "approved");
  params.append("populate", "*");

  if (filters.category) {
    params.append("filters[category][slug][$eq]", filters.category);
  }
  if (filters.level) {
    params.append("filters[level][$eq]", filters.level);
  }
  if (filters.search) {
    params.append("filters[title][$containsi]", filters.search);
  }

  return fetchAPI(`/skills?${params.toString()}`);
}

export async function getSkillById(id) {
  return fetchAPI(`/skills/${id}?populate=*`);
}

export async function getMySkills(userId) {
  return fetchAPI(`/skills?filters[owner][id][$eq]=${userId}&populate=*`);
}

export async function createSkill(skillData) {
  return fetchAPI("/skills", {
    method: "POST",
    body: JSON.stringify({ data: skillData }),
  });
}

// ============ SKILL CATEGORY ENDPOINTS ============

export async function getCategories() {
  return fetchAPI("/skill-categories?populate=*");
}

export async function createCategory(categoryData) {
  return fetchAPI("/skill-categories", {
    method: "POST",
    body: JSON.stringify({ data: categoryData }),
  });
}

export async function updateCategory(id, categoryData) {
  return fetchAPI(`/skill-categories/${id}`, {
    method: "PUT",
    body: JSON.stringify({ data: categoryData }),
  });
}

export async function deleteCategory(id) {
  return fetchAPI(`/skill-categories/${id}`, {
    method: "DELETE",
  });
}

// ============ ADMIN ENDPOINTS ============

export async function getAllSkills() {
  return fetchAPI("/skills?populate=*&sort=createdAt:desc");
}

export async function updateSkillStatus(id, status, rejectionReason = "") {
  return fetchAPI(`/skills/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      data: { status, rejectionReason },
    }),
  });
}

export async function getAllUsers() {
  return fetchAPI("/users?populate=*");
}

export async function blockUser(id, blocked) {
  return fetchAPI(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({ blocked }),
  });
}

// ============ PROFILE ENDPOINTS ============

export async function updateProfile(id, profileData) {
  return fetchAPI(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
}

// ============ BOOKING ENDPOINTS ============

export async function createBooking(bookingData) {
  return fetchAPI("/bookings", {
    method: "POST",
    body: JSON.stringify({ data: bookingData }),
  });
}

export async function getMyBookings(userId) {
  const params = new URLSearchParams();
  params.append("populate", "*");
  params.append("filters[$or][0][requester][id][$eq]", userId);
  params.append("filters[$or][1][provider][id][$eq]", userId);
  params.append("sort", "createdAt:desc");
  return fetchAPI(`/bookings?${params.toString()}`);
}

export async function updateBookingStatus(id, status) {
  return fetchAPI(`/bookings/${id}`, {
    method: "PUT",
    body: JSON.stringify({ data: { status, ...(status === "completed" ? { completedAt: new Date().toISOString() } : {}) } }),
  });
}

export async function getAllBookings() {
  return fetchAPI("/bookings?populate=*&sort=createdAt:desc");
}

// ============ REVIEW ENDPOINTS ============

export async function createReview(reviewData) {
  return fetchAPI("/reviews", {
    method: "POST",
    body: JSON.stringify({ data: reviewData }),
  });
}

export async function getSkillReviews(skillId) {
  return fetchAPI(`/reviews?filters[skill][id][$eq]=${skillId}&populate=*&sort=createdAt:desc`);
}

export async function getBookingReviews(bookingId, reviewerId) {
  return fetchAPI(`/reviews?filters[booking][id][$eq]=${bookingId}&filters[reviewer][id][$eq]=${reviewerId}&populate=*`);
}

// ============ REPORT ENDPOINTS ============

export async function createReport(reportData) {
  return fetchAPI("/reports", {
    method: "POST",
    body: JSON.stringify({ data: reportData }),
  });
}

export async function getAllReports() {
  return fetchAPI("/reports?populate=*&sort=createdAt:desc");
}

export async function updateReportStatus(id, status, adminNotes = "") {
  return fetchAPI(`/reports/${id}`, {
    method: "PUT",
    body: JSON.stringify({ data: { status, adminNotes } }),
  });
}

// ============ FAQ ENDPOINTS ============

export async function getFAQs() {
  return fetchAPI("/faqs?sort=order:asc");
}

// ============ PAGE ENDPOINTS ============

export async function getPages() {
  return fetchAPI("/pages?populate=*");
}

export async function getPageBySlug(slug) {
  return fetchAPI(`/pages?filters[slug][$eq]=${slug}`);
}
