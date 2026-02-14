interface User {
  id: number;
  name: string;
  email: string;
}

async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch("http://localhost:8080/doctor/all");
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data: User[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function main() {
  try {
    const users = await getUsers();
    console.log(users);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
