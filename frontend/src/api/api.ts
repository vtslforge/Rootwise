import { useEffect, useState } from "react";

export function useAppAPI() {
  const [status, setStatus] = useState("Checking...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkHealth() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/health`
        );

        if (!response.ok) {
          throw new Error("Backend health check failed");
        }

        const data = await response.json();
        setStatus(data.message);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    }

    void checkHealth();
  }, []);

  return { status, error };
}