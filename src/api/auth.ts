import { apiFetch } from "@/api/client.ts";

type AuthResponse = {
  message: string;
  user: { id: number; name: string; email: string };
  token: string;
};

type User = { id: number; name: string; email: string };

export async function loginUser(
  email: string,
  password: string
): Promise<{ user: User; token: string }> {
  const data = await apiFetch<AuthResponse>("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return { user: data.user, token: data.token };
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string
): Promise<{ user: User; token: string }> {
  const data = await apiFetch<AuthResponse>("/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }),
  });
  return { user: data.user, token: data.token };
}

export async function logoutUser(): Promise<void> {
  await apiFetch<{ message: string }>("/logout");
}

export async function getCurrentUser(): Promise<User> {
  const data = await apiFetch<User>("/user");
  return data;
}
