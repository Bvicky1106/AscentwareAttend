import { useMutation } from "@tanstack/react-query";

async function postLogin(data) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Login failed");
  return response.json();
}

export default function useLogin() {
  return useMutation({
    mutationFn: (data) => postLogin(data),
  });
}
