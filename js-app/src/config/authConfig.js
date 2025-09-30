import { PublicClientApplication, LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "GH18Q~YjXuPrUY-q8dSXQ7UvvZ6xJ4tG8Ni2zacS",
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",
    redirectUri: "http://localhost:3000",
  },
  cache: { cacheLocation: "sessionStorage", storeAuthStateInCookie: false },
  system: {
    loggerOptions: {
      loggerCallback: (level, msg) => console.log(msg),
      logLevel: LogLevel.Info,
    },
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
