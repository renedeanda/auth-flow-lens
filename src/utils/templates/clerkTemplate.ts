
export const generateClerkDiagram = (frontend: string, backend: string): string => {
  return `
    sequenceDiagram
      participant U as 👤 User
      participant F as 🖥️ ${frontend}
      participant C as 🛡️ Clerk
      participant O as 🌐 OAuth Provider
      participant B as ⚡ ${backend}
      
      U->>F: Access protected route
      F->>C: useAuth() hook checks authentication
      C->>F: User not signed in
      F->>F: Show <SignIn /> component
      Note over F,C: 🔒 Clerk handles OAuth flows + security headers
      alt OAuth Provider
          C->>+O: Handle OAuth flow with provider (Google, GitHub, etc.)
          O->>U: Show provider consent
          U->>O: Grant permission
          O->>-C: Return OAuth data
      end
      U->>C: Complete sign in via Clerk UI
      C->>C: Validate credentials/OAuth data
      C->>F: Set session token in httpOnly cookie + JWT
      Note over C,F: 🛡️ httpOnly cookies + short-lived JWTs with refresh
      F->>F: useAuth() returns signed-in user
      
      Note over F: Making authenticated API call
      F->>B: Request with session cookie (automatic)
      B->>C: Validate session using getAuth() from @clerk/nextjs
      Note over B,C: ⚠️ Server-side validation required
      C->>B: Return user object if valid
      B->>F: Return protected data
      
      Note over C: 🔄 Clerk handles token refresh automatically
  `;
};
