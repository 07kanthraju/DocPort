const API = "http://localhost:8080/api/doctors";

export const getDoctors = async () => {
  const res = await fetch(API);
  return res.json();
};

export const createDoctor = async (doctor:any) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(doctor)
  });

  return res.json();
};

export const deleteDoctor = async (id:number) => {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });
};