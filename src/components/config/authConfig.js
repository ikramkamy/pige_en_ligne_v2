// authConfig.js
export const msalConfig = {
    auth: {
        clientId: "9bf1b4df-fd10-4dfa-825f-c9f91d53ffc7", // Application (client) ID
        authority: "https://login.microsoftonline.com/2906f490-a4a9-4f4e-be11-4fb937da1aff", // Directory (tenant) ID
        redirectUri: "http://localhost:3000", // Your redirect URI
    },
};

export const loginRequest = {
    scopes: ["https://analysis.windows.net/powerbi/api/.default"], // Power BI API scope
};