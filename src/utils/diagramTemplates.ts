
import { AuthFlow } from '@/types/auth';

export const generateMermaidDiagram = (flow: AuthFlow): string => {
  const { frontend, authProvider, backend } = flow;
  
  if (authProvider === 'Auth0') {
    return `
      sequenceDiagram
        participant U as 👤 User
        participant F as 🖥️ ${frontend}
        participant A as 🔐 Auth0
        participant B as ⚡ ${backend}
        
        U->>F: Click "Sign In"
        F->>A: Redirect to Auth0
        A->>U: Show login form
        U->>A: Enter credentials
        A->>F: Redirect with auth code
        F->>A: Exchange code for JWT
        A->>F: Return JWT token
        F->>F: Store JWT (cookie/localStorage)
        
        Note over F: User makes API request
        F->>B: API call with JWT header
        B->>A: Validate JWT
        A->>B: Token valid ✅
        B->>F: Return protected data
    `;
  } else if (authProvider === 'Firebase Auth') {
    return `
      sequenceDiagram
        participant U as 👤 User
        participant F as 🖥️ ${frontend}
        participant FB as 🔥 Firebase Auth
        participant B as ⚡ ${backend}
        
        U->>F: Click "Sign In"
        F->>FB: Firebase signInWithEmailAndPassword()
        FB->>U: Show auth popup/form
        U->>FB: Complete authentication
        FB->>F: Return user + ID token
        F->>F: Store token automatically
        
        Note over F: User makes API request
        F->>B: API call with Firebase token
        B->>FB: Verify token with Firebase Admin
        FB->>B: Token valid ✅
        B->>F: Return protected data
    `;
  } else if (authProvider === 'Clerk') {
    return `
      sequenceDiagram
        participant U as 👤 User
        participant F as 🖥️ ${frontend}
        participant C as 🛡️ Clerk
        participant B as ⚡ ${backend}
        
        U->>F: Access protected page
        F->>C: Check auth status with useAuth()
        C->>F: Not authenticated
        F->>C: Show SignIn component
        U->>C: Complete sign in
        C->>F: Set session cookie
        F->>F: Redirect to app
        
        Note over F: User makes API request
        F->>B: API call with session cookie
        B->>C: Validate session with Clerk
        C->>B: Session valid ✅
        B->>F: Return protected data
    `;
  } else if (authProvider === 'Supabase Auth') {
    return `
      sequenceDiagram
        participant U as 👤 User
        participant F as 🖥️ ${frontend}
        participant S as 🟢 Supabase
        participant B as ⚡ ${backend}
        
        U->>F: Click "Sign In"
        F->>S: supabase.auth.signInWithPassword()
        S->>U: Send magic link or show form
        U->>S: Complete authentication
        S->>F: Return session + JWT
        F->>F: Auto-store in localStorage
        
        Note over F: User makes API request
        F->>S: API call (auto JWT headers)
        S->>S: Validate JWT internally
        S->>F: Return data with RLS ✅
    `;
  } else if (authProvider === 'AWS Cognito') {
    return `
      sequenceDiagram
        participant U as 👤 User
        participant F as 🖥️ ${frontend}
        participant C as ☁️ AWS Cognito
        participant B as ⚡ ${backend}
        
        U->>F: Submit login form
        F->>C: AWS.CognitoIdentityServiceProvider.initiateAuth()
        C->>U: Challenge (MFA if enabled)
        U->>C: Complete authentication
        C->>F: Return ID/Access/Refresh tokens
        F->>F: Store tokens securely
        
        Note over F: User makes API request
        F->>B: API call with Bearer token
        B->>C: Validate JWT signature
        C->>B: Token valid ✅
        B->>F: Return protected data
    `;
  } else if (authProvider === 'NextAuth.js') {
    return `
      sequenceDiagram
        participant U as 👤 User
        participant F as 🖥️ ${frontend}
        participant N as 🔑 NextAuth.js
        participant P as 🌐 OAuth Provider
        participant B as ⚡ ${backend}
        
        U->>F: Click "Sign In"
        F->>N: signIn() function
        N->>P: Redirect to OAuth provider
        P->>U: Show OAuth consent
        U->>P: Grant permission
        P->>N: Return with authorization code
        N->>F: Set session cookie
        
        Note over F: User makes API request
        F->>B: API call with session cookie
        B->>N: Validate session
        N->>B: Session valid ✅
        B->>F: Return protected data
    `;
  } else if (authProvider === 'Passport.js') {
    return `
      sequenceDiagram
        participant U as 👤 User
        participant F as 🖥️ ${frontend}
        participant P as 🛂 Passport.js
        participant B as ⚡ ${backend}
        
        U->>F: Submit login form
        F->>B: POST /auth/login
        B->>P: passport.authenticate()
        P->>P: Verify credentials
        P->>B: Authentication result
        B->>B: Create session
        B->>F: Set session cookie
        
        Note over F: User makes API request
        F->>B: API call with session cookie
        B->>P: deserializeUser()
        P->>B: User data ✅
        B->>F: Return protected data
    `;
  } else if (authProvider === 'Custom JWT') {
    return `
      sequenceDiagram
        participant U as 👤 User
        participant F as 🖥️ ${frontend}
        participant B as ⚡ ${backend}
        
        U->>F: Submit login form
        F->>B: POST /auth/login
        B->>B: Verify credentials
        B->>B: Generate JWT with secret
        B->>F: Return JWT token
        F->>F: Store JWT (localStorage/cookie)
        
        Note over F: User makes API request
        F->>B: API call with Authorization: Bearer JWT
        B->>B: Verify JWT signature
        B->>B: Check token expiry
        B->>F: Return protected data ✅
    `;
  } else {
    return `
      sequenceDiagram
        participant U as 👤 User
        participant F as 🖥️ ${frontend}
        participant A as 🔑 ${authProvider}
        participant B as ⚡ ${backend}
        
        U->>F: Initiate authentication
        F->>A: Authentication request
        A->>U: Show auth interface
        U->>A: Provide credentials
        A->>F: Return authentication result
        F->>F: Store auth state
        
        Note over F: User makes API request
        F->>B: API call with auth headers
        B->>A: Validate credentials
        A->>B: Validation result ✅
        B->>F: Return protected data
    `;
  }
};
