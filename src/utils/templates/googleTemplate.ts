
export const generateGoogleDiagram = (frontend: string, backend: string): string => {
  return `
    sequenceDiagram
      participant U as 👤 User
      participant F as 🖥️ ${frontend}
      participant G as 🌐 Google OAuth
      participant B as ⚡ ${backend}
      
      Note over U,B: 🔄 Google OAuth 2.0 Flow
      U->>F: Click "Sign in with Google"
      F->>F: Generate PKCE code_challenge + state
      F->>G: Redirect to accounts.google.com/oauth/authorize
      Note over F,G: 🔒 Include scopes, client_id, redirect_uri
      G->>U: Show Google consent screen
      U->>G: Grant permissions (profile, email, etc.)
      G->>F: Redirect with authorization code + state
      Note over G,F: ⚠️ Validate state parameter matches original
      F->>G: POST to /oauth/token (code + code_verifier)
      G->>F: Return access_token + id_token + refresh_token
      Note over G,F: 🔄 ID token contains user info, access token for APIs
      F->>F: Store tokens (consider httpOnly cookies vs localStorage)
      Note over F: 📏 Cookies: 4KB limit, localStorage: ~5MB limit
      
      Note over F: Making authenticated API call
      F->>B: API request with Authorization: Bearer <id_token>
      B->>G: Verify JWT signature using Google public keys
      Note over B,G: ⚠️ Verify iss, aud, exp claims + signature
      G->>B: Token signature valid
      B->>B: Extract user claims from verified JWT
      B->>F: Return protected data
      
      alt Token Refresh
          F->>G: POST /oauth/token (refresh_token)
          G->>F: Return new access_token + id_token
          Note over G,F: 🔄 Refresh tokens can be long-lived or rotating
      end
  `;
};
