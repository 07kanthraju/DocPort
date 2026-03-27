const BASE = "http://localhost:8080";

export async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  // DELETE returns plain string, not JSON
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export const login = (email: string, password: string) =>
  apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });

export const signup = (data: { email: string; password: string; name: string; role: string }) =>
  apiFetch("/api/auth/signup", { method: "POST", body: JSON.stringify(data) });

// ─── Doctor profile ───────────────────────────────────────────────────────────
export const getDoctorProfile = (userId: string) =>
  apiFetch(`/api/profile/${userId}`);

export const createDoctorProfile = (data: object) =>
  apiFetch("/api/profile", { method: "POST", body: JSON.stringify(data) });

export const updateDoctorProfile = (userId: string, data: object) =>
  apiFetch(`/api/profile/${userId}`, { method: "PUT", body: JSON.stringify(data) });

// ─── Doctors ─────────────────────────────────────────────────────────────────
export const getAllDoctors = () => apiFetch("/api/doctors");

export const getDoctorById = (id: string) => apiFetch(`/api/doctors/${id}`);

export const createDoctor = (data: object) =>
  apiFetch("/api/doctors", { method: "POST", body: JSON.stringify(data) });

export const updateDoctor = (id: number, data: object) =>
  apiFetch(`/api/doctors/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteDoctor = (id: number) =>
  apiFetch(`/api/doctors/${id}`, { method: "DELETE" });

// ─── Appointments ─────────────────────────────────────────────────────────────
export const getAppointments = () => apiFetch("/api/doctor/appointment");

export const getAppointmentById = (id: number) =>
  apiFetch(`/api/doctor/appointment/${id}`);

export const createAppointment = (data: object) =>
  apiFetch("/api/doctor/appointment", { method: "POST", body: JSON.stringify(data) });

export const updateAppointment = (id: number, data: object) =>
  apiFetch(`/api/doctor/appointment/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteAppointment = (id: number) =>
  apiFetch(`/api/doctor/appointment/${id}`, { method: "DELETE" });

// ─── Availability ─────────────────────────────────────────────────────────────
export const getAvailabilityByDoctor = (doctorId: string) =>
  apiFetch(`/api/availability/${doctorId}`);

export const getAllAvailability = () => apiFetch("/api/availability");

export const createAvailability = (data: object) =>
  apiFetch("/api/availability", { method: "POST", body: JSON.stringify(data) });

// ─── Insurance provider (admin registry) ─────────────────────────────────────
export const getAllProviders = () => apiFetch("/insuranceprovider/all");

export const getProviderById = (id: string) => apiFetch(`/insuranceprovider/${id}`);

export const createProvider = (data: object) =>
  apiFetch("/insuranceprovider/add", { method: "PUT", body: JSON.stringify(data) });

export const updateProvider = (id: number, data: object) =>
  apiFetch(`/insuranceprovider/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteProvider = (id: number) =>
  apiFetch(`/insuranceprovider/${id}`, { method: "DELETE" });

// ─── Insurance profile ────────────────────────────────────────────────────────
export const getInsuranceProfile = (userId: string) =>
  apiFetch(`/api/insurance/profile/${userId}`);

export const createInsuranceProfile = (data: object) =>
  apiFetch("/api/insurance/profile", { method: "POST", body: JSON.stringify(data) });

export const updateInsuranceProfile = (userId: string, data: object) =>
  apiFetch(`/api/insurance/profile/${userId}`, { method: "PUT", body: JSON.stringify(data) });

// ─── Consent ─────────────────────────────────────────────────────────────────
export const getAllConsents = () => apiFetch("/api/doctor-insurance-consent");

export const getConsentById = (id: number) =>
  apiFetch(`/api/doctor-insurance-consent/${id}`);

export const getConsentsByDoctor = (doctorId: string) =>
  apiFetch(`/api/doctor-insurance-consent/doctor/${doctorId}`);

export const getConsentsByProvider = (providerId: string) =>
  apiFetch(`/api/doctor-insurance-consent/provider/${providerId}`);

export const createConsent = (data: object) =>
  apiFetch("/api/doctor-insurance-consent", { method: "POST", body: JSON.stringify(data) });

export const updateConsent = (id: number, data: object) =>
  apiFetch(`/api/doctor-insurance-consent/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteConsent = (id: number) =>
  apiFetch(`/api/doctor-insurance-consent/${id}`, { method: "DELETE" });

// ─── Provider-Doctor Sync ─────────────────────────────────────────────────────
export const getAllSyncs = () => apiFetch("/api/provider-doctor-sync");

export const getSyncsByDoctor = (doctorId: string) =>
  apiFetch(`/api/provider-doctor-sync/doctor/${doctorId}`);

export const getSyncsByProvider = (providerId: string) =>
  apiFetch(`/api/provider-doctor-sync/provider/${providerId}`);

export const createSync = (data: object) =>
  apiFetch("/api/provider-doctor-sync", { method: "POST", body: JSON.stringify(data) });

export const updateSync = (id: number, data: object) =>
  apiFetch(`/api/provider-doctor-sync/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteSync = (id: number) =>
  apiFetch(`/api/provider-doctor-sync/${id}`, { method: "DELETE" });


export const getAllDoctorProfiles = async () => {
  const res = await fetch("http://localhost:8080/api/profile/all");
  return res.json();
};

// export const getConsentsByProvider = async (providerId: any) => {
//   const res = await fetch(
//     `http://localhost:8080/api/consent/provider/${providerId}`
//   );
//   return res.json();
// };

export const sendConnectionRequest = async (
  providerId: any,
  doctorId: any
) => {
  const res = await fetch("http://localhost:8080/api/consent/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      providerId,
      doctorId,
    }),
  });

  return res.json();
};