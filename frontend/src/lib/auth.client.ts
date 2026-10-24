import { createAuthClient } from "better-auth/react";


const api = {
    backend_url: import.meta.env.VITE_API_URL
}


export const authClient = createAuthClient({
  baseURL: api.backend_url,
});