
export const generateCustomJwtDiagram = (frontend: string, backend: string): string => {
  return `
    sequenceDiagram
      participant U as 👤 User
      participant F as 🖥️ ${frontend}
      participant B as ⚡ ${backend}
      
      U->>F: Submit login form
      F->>B: POST /auth/login with credentials
      Note over F,B: 🔒 HTTPS mandatory for credential transmission
      B->>B: Validate credentials (rate limiting applied)
      Note over B: 🛡️ Hash comparison (bcrypt) + account lockout
      B->>B: Generate short-lived JWT (15-60 min) + refresh token
      Note over B: ⚠️ Use cryptographically strong secret (256+ bits)
      B->>B: Set claims: iss, aud, exp, iat, sub
      Note over B: 🔄 Access token: short-lived, Refresh: long-lived
      B->>F: Return {access_token, refresh_token}
      F->>F: Store tokens based on threat model
      Note over F: 🛡️ Access: memory/short cookie, Refresh: httpOnly cookie
      Note over F: 📊 Storage trade-offs: httpOnly (CSRF) vs localStorage (XSS)
      
      Note over F: Making authenticated API call
      F->>B: Request with Authorization: Bearer <access_token>
      B->>B: Verify JWT signature using secret/public key
      Note over B: ⚠️ Validate signature + expiration + issuer + audience
      B->>B: Check token blacklist (if implemented)
      Note over B: 🛡️ Implement token revocation for security
      B->>F: Return protected data
      
      alt Access Token Expired
          F->>B: POST /auth/refresh with refresh_token
          B->>B: Validate refresh token (check rotation/reuse)
          Note over B: 🔄 Consider refresh token rotation for security
          B->>F: Return new access_token (+ optionally new refresh_token)
          Note over B,F: ⚠️ Many implementations skip refresh tokens - don't!
      end
      
      Note over B: 💡 Refresh tokens prevent frequent re-authentication
      Note over B: 🛡️ Refresh token theft is still a risk - consider rotation
  `;
};
