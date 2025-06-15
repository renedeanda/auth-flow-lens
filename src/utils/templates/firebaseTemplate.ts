
export const generateFirebaseDiagram = (frontend: string, backend: string): string => {
  return `
    sequenceDiagram
      participant U as 👤 User
      participant F as 🖥️ ${frontend}
      participant FB as 🔥 Firebase Auth
      participant O as 🌐 OAuth Provider
      participant B as ⚡ ${backend}
      
      U->>F: Click "Sign In"
      F->>FB: signInWithEmailAndPassword() or OAuth provider
      Note over F,FB: 🔒 Firebase handles HTTPS + OAuth flows automatically
      alt OAuth Provider Flow
          FB->>+O: Redirect to OAuth provider (Google, GitHub, etc.)
          O->>U: Show provider consent
          U->>O: Grant permission
          O->>-FB: Return OAuth tokens
      end
      FB->>FB: Validate credentials/OAuth tokens
      FB->>F: Return UserCredential object
      F->>FB: user.getIdToken() to get JWT
      FB->>F: Return Firebase ID token (short-lived JWT)
      Note over FB,F: 🔄 ID tokens auto-refresh every hour
      F->>F: Token automatically stored in IndexedDB
      Note over F: 🛡️ Firebase SDK handles secure storage + refresh
      
      Note over F: Making authenticated API call
      F->>F: Firebase SDK auto-refreshes expired tokens
      F->>B: API request with Authorization: Bearer <id_token>
      B->>FB: Verify token using Firebase Admin SDK
      Note over B,FB: ⚠️ Must use Admin SDK - never trust client tokens
      FB->>B: Decoded token + user claims
      B->>F: Return protected data
  `;
};
