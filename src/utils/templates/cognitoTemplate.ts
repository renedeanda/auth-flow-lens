
export const generateCognitoDiagram = (frontend: string, backend: string): string => {
  return `
    sequenceDiagram
      participant U as 👤 User
      participant F as 🖥️ ${frontend}
      participant C as ☁️ AWS Cognito
      participant O as 🌐 OAuth Provider
      participant B as ⚡ ${backend}
      
      U->>F: Submit login form
      F->>C: initiateAuth() with username/password or OAuth
      Note over F,C: 🔒 SRP (Secure Remote Password) protocol used
      alt OAuth Provider Flow
          C->>+O: Federated identity with OAuth provider (Google, Facebook, etc.)
          O->>U: Show provider consent
          U->>O: Grant permission
          O->>-C: Return OAuth tokens
      end
      C->>F: Return AuthenticationResult or ChallengeName
      Note over C,F: 🛡️ May require MFA challenge
      alt MFA Required
          F->>U: Show MFA input
          U->>F: Enter MFA code
          F->>C: respondToAuthChallenge()
      end
      C->>F: Return IdToken + AccessToken + RefreshToken
      Note over C,F: 🔄 Access: 1hr, ID: 1hr, Refresh: 30 days (configurable)
      F->>F: Store tokens (secure storage recommended)
      Note over F: ⚠️ RefreshToken is long-lived and very sensitive
      
      Note over F: Making authenticated API call
      F->>B: Request with Authorization: Bearer <AccessToken>
      B->>C: Validate JWT signature using Cognito public keys
      Note over B,C: ⚠️ Verify signature, issuer, audience, expiration
      C->>B: JWT signature valid
      B->>B: Extract user claims from verified JWT
      B->>F: Return protected data
      
      alt Token Refresh
          F->>C: Use RefreshToken to get new tokens
          C->>F: Return new IdToken + AccessToken
          Note over C,F: 🔄 RefreshToken may rotate depending on config
      end
  `;
};
