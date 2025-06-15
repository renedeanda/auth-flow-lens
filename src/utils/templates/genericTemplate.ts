
export const generateGenericDiagram = (frontend: string, authProvider: string, backend: string): string => {
  return `
    sequenceDiagram
      participant U as 👤 User
      participant F as 🖥️ ${frontend}
      participant A as 🔑 ${authProvider}
      participant O as 🌐 OAuth Provider
      participant B as ⚡ ${backend}
      
      U->>F: Initiate authentication
      F->>A: Authentication request
      Note over F,A: 🔒 Ensure HTTPS is used
      alt OAuth Flow (if applicable)
          A->>+O: Redirect to OAuth provider (Google, GitHub, etc.)
          O->>U: Show consent screen
          U->>O: Grant permission
          O->>-A: Return authorization code/tokens
      end
      A->>U: Show authentication interface
      U->>A: Provide credentials
      A->>A: Validate credentials/OAuth tokens
      A->>F: Return authentication result + tokens
      Note over A,F: 🔄 Implement short-lived tokens with refresh capability
      F->>F: Store authentication state securely
      Note over F: 🛡️ Consider storage trade-offs: cookies vs localStorage
      
      Note over F: Making authenticated API call
      F->>B: API request with authentication headers/cookies
      B->>A: Validate token/session with auth provider
      Note over B,A: ⚠️ Always validate on backend - never trust frontend
      A->>B: Return validation result + user claims
      B->>F: Return protected data
      
      alt Token Refresh (if supported)
          F->>A: Request token refresh
          A->>F: Return new access token
          Note over A,F: 🔄 Refresh tokens improve UX and security
      end
  `;
};
