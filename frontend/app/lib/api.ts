const BASE = "http://localhost:8080";

export async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Auth
export const login = (email: string, password: string) =>
  apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const signup = (data: {
  email: string;
  password: string;
  name: string;
  role: string;
}) =>
  apiFetch("/api/auth/signup", { method: "POST", body: JSON.stringify(data) });

// Doctor profile
export const getDoctorProfile = (userId: string) =>
  apiFetch(`/api/profile/${userId}`);

export const updateDoctorProfile = (userId: string, data: object) =>
  apiFetch(`/api/profile/${userId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

// Appointments
export const getAppointments = () => apiFetch("/api/doctor/appointment");

export const createAppointment = (data: object) =>
  apiFetch("/api/doctor/appointment", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateAppointment = (id: number, data: object) =>
  apiFetch(`/api/doctor/appointment/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteAppointment = (id: number) =>
  apiFetch(`/api/doctor/appointment/${id}`, { method: "DELETE" });

// Doctor availability
export const getDoctors = () => apiFetch("/api/doctors");

// Insurance provider
export const getInsuranceProfile = (userId: string) =>
  apiFetch(`/api/insurance/profile/${userId}`);

export const createInsuranceProfile = (data: object) =>
  apiFetch("/api/insurance/profile", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateInsuranceProfile = (userId: string, data: object) =>
  apiFetch(`/api/insurance/profile/${userId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

// Insurance providers list
export const getProviders = () => apiFetch("/insuranceprovider/all");

// Consent
export const getConsentsByDoctor = (doctorId: string) =>
  apiFetch(`/api/doctor-insurance-consent/doctor/${doctorId}`);

export const getConsentsByProvider = (providerId: string) =>
  apiFetch(`/api/doctor-insurance-consent/provider/${providerId}`);

export const saveConsent = (data: object) =>
  apiFetch("/api/doctor-insurance-consent", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateConsent = (id: number, data: object) =>
  apiFetch(`/api/doctor-insurance-consent/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

// Sync
export const getSyncByProvider = (providerId: string) =>
  apiFetch(`/api/provider-doctor-sync/provider/${providerId}`);

export const getAllDoctorsList = () => apiFetch("/api/doctors");






const API = "http://localhost:8080";

export const getDoctorAvailability = async (doctorId:string) => {
  const res = await fetch(`${API}/api/availability/${doctorId}`);
  return res.json();
};

export const createAvailability = async (data:any) => {
  const res = await fetch(`${API}/api/availability`,{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify(data)
  });
  return res.json();
};

export const updateAvailability = async (id:number,data:any) => {
  const res = await fetch(`${API}/api/availability/${id}`,{
    method:"PUT",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify(data)
  });
  return res.json();
};
