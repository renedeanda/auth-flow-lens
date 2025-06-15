
export const generateNextAuthDiagram = (frontend: string, backend: string): string => {
  return `
    sequenceDiagram
      participant U as 👤 User
      participant F as 🖥️ ${frontend}
      participant N as 🔑 NextAuth.js
      participant O as 🌐 OAuth Provider
      participant B as ⚡ ${backend}
      
      Note over U,B: 🔄 NextAuth.js OAuth Flow (3rd party involved)
      U->>F: Click "Sign in with Provider"
      F->>N: signIn("provider") function call
      N->>N: Generate PKCE code_challenge + state + nonce
      N->>O: Redirect to OAuth provider authorization URL
      Note over N,O: 🔒 HTTPS + PKCE + state + nonce for security
      O->>U: Show OAuth consent screen (Google, GitHub, etc.)
      U->>O: Grant permission
      O->>N: Redirect with authorization code + state
      Note over O,N: ⚠️ NextAuth validates state parameter automatically
      N->>O: Exchange code for tokens (+ code_verifier)
      O->>N: Return access_token + id_token + refresh_token
      Note over O,N: 🔄 Provider tokens may include refresh capability
      N->>N: Create NextAuth session + handle token refresh
      N->>F: Set session cookie (next-auth.session-token)
      Note over N,F: 🛡️ httpOnly + secure + sameSite cookies (CSRF resistant)
      
      Note over F: Making authenticated API call
      F->>B: Request with session cookie (automatic)
      B->>N: getServerSession() or getToken()
      Note over B,N: ⚠️ Server-side session validation required
      N->>B: Return session/JWT if valid
      B->>F: Return protected data
      
      alt Token Refresh (Provider Dependent)
          N->>O: Use refresh_token to get new access_token
          O->>N: Return refreshed tokens
          N->>N: Update session with new tokens
          Note over N: 🔄 NextAuth handles refresh automatically when possible
      end
  `;
};
