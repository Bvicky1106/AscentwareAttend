import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useAuthStore } from "./useAuthStore";

const loginRequest = { scopes: ["User.Read"] };

export function useAzureAuth() {
  const { instance, accounts } = useMsal();
  const { setAuth, clearAuth } = useAuthStore();

  const login = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);
      const account = response.account;
      const tokenResp = await instance.acquireTokenSilent({
        ...loginRequest,
        account,
      });
      setAuth(account, tokenResp.accessToken);
    } catch (error) {
      console.error("Azure login error:", error);
    }
  };

  const logout = () => {
    clearAuth();
    instance.logoutPopup();
  };

  const acquireToken = async () => {
    if (accounts.length === 0) return null;
    try {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });
      setAuth(accounts[0], response.accessToken);
      return response.accessToken;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        const response = await instance.acquireTokenPopup(loginRequest);
        setAuth(accounts[0], response.accessToken);
        return response.accessToken;
      }
      throw error;
    }
  };

  return { login, logout, acquireToken };
}
