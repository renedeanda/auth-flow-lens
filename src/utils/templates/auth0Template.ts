
export const generateAuth0Diagram = (frontend: string, backend: string): string => {
  return `
    sequenceDiagram
      participant U as 👤 User
      participant F as 🖥️ ${frontend}
      participant A as 🔐 Auth0
      participant P as 🌐 OAuth Provider
      participant B as ⚡ ${backend}
      
      Note over U,B: 🔄 OAuth 2.0 + PKCE Flow (with 3rd party)
      U->>F: Click "Sign In"
      F->>F: Generate PKCE code_challenge + state
      Note over F: 🛡️ PKCE prevents authorization code interception
      F->>A: Redirect to /authorize (code_challenge + state)
      A->>U: Show Auth0 Universal Login
      U->>A: Enter credentials or select OAuth provider
      alt OAuth Provider Flow (Google, GitHub, etc.)
          A->>+P: Redirect to OAuth provider
          P->>U: Show provider consent screen
          U->>P: Grant permission
          P->>-A: Return with authorization code
          A->>A: Exchange code for provider tokens
      end
      A->>A: Validate credentials/tokens
      A->>F: Redirect with authorization code + state
      Note over A,F: ⚠️ Always validate state parameter (CSRF protection)
      F->>A: POST /oauth/token (code + code_verifier)
      A->>F: Return access_token + id_token + refresh_token
      Note over A,F: 🔄 Access token: 15-60min, Refresh token: weeks/months
      F->>F: Store tokens securely (memory/httpOnly cookies)
      Note over F: 🛡️ Choose storage based on threat model
      
      Note over F: Making authenticated API call
      F->>B: API request with Authorization: Bearer <access_token>
      B->>A: Validate JWT signature + claims
      Note over B,A: ⚠️ Backend validation required - never trust frontend
      A->>B: Token valid + user claims
      B->>F: Return protected data
      
      alt Access Token Expired
          F->>A: POST /oauth/token (refresh_token)
          A->>F: Return new access_token + refresh_token
          Note over A,F: 🔄 Rotate refresh tokens for security
      end
  `;
};
