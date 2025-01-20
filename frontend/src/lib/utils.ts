import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface DecodedToken {
  name: string;
  email: string;
  profile?: string;
  exp: number;
}

export const getUserInfoFromToken = (): DecodedToken | null => {
  const token = localStorage.getItem("authToken");

  if (token) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("authToken");
        return null;
      }
      return decodedToken;
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem("authToken");
    }
  }
  return null;
};
