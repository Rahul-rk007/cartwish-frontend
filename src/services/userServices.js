import apiClient from "../utils/api-client";
import { jwtDecode } from "jwt-decode";
const tokenName = "token";

export async function signup(user, profile) {
  const body = new FormData();
  body.append("name", user.name);
  body.append("email", user.email);
  body.append("password", user.password);
  body.append("address", user.address);
  body.append("profilePic", profile);

  const { data } = await apiClient.post("/user/register", body);
  localStorage.setItem(tokenName, data.token);
}

export async function login(user) {
  const { data } = await apiClient.post("/user/login", user);
  localStorage.setItem(tokenName, data.token);
}

export function logout() {
  localStorage.removeItem(tokenName);
}

export function getUser() {
  const jwt = localStorage.getItem(tokenName);

  // Check if the token exists and is a valid string
  if (!jwt) {
    return null; // or throw an error, or return an empty object, depending on your needs
  }

  try {
    return jwtDecode(jwt);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null; // Return null if decoding fails
  }
}

export function getJwt() {
  return localStorage.getItem(tokenName);
}
