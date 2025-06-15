
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
        Note over F,A: 🔒 HTTPS required for security
        A->>U: Show login form
        U->>A: Enter credentials
        A->>F: Redirect with auth code
        Note over A,F: ⚠️ Validate redirect URI
        F->>A: Exchange code for JWT
        A->>F: Return JWT token
        F->>F: Store JWT (cookie/localStorage)
        Note over F: 🛡️ Use httpOnly cookies when possible
        
        Note over F: User makes API request
        F->>B: API call with JWT header
        B->>A: Validate JWT
        Note over B,A: ⚠️ Always validate on backend
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
        Note over F,FB: 🔒 HTTPS enforced by Firebase
        FB->>U: Show auth popup/form
        U->>FB: Complete authentication
        FB->>F: Return user + ID token
        F->>F: Store token automatically
        Note over F: 🛡️ Firebase handles secure storage
        
        Note over F: User makes API request
        F->>B: API call with Firebase token
        B->>FB: Verify token with Firebase Admin
        Note over B,FB: ⚠️ Use Admin SDK for verification
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
        Note over F,C: 🔒 Clerk handles HTTPS & security
        U->>C: Complete sign in
        C->>F: Set session cookie
        Note over C,F: 🛡️ httpOnly + secure cookies
        F->>F: Redirect to app
        
        Note over F: User makes API request
        F->>B: API call with session cookie
        B->>C: Validate session with Clerk
        Note over B,C: ⚠️ Backend session validation required
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
        Note over F,S: 🔒 HTTPS enforced
        S->>U: Send magic link or show form
        U->>S: Complete authentication
        S->>F: Return session + JWT
        F->>F: Auto-store in localStorage
        Note over F: ⚠️ Consider httpOnly cookies for sensitive apps
        
        Note over F: User makes API request
        F->>S: API call (auto JWT headers)
        S->>S: Validate JWT internally
        Note over S: 🛡️ RLS provides additional security layer
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
        Note over F,C: 🔒 HTTPS required
        C->>U: Challenge (MFA if enabled)
        Note over C,U: 🛡️ Enable MFA for better security
        U->>C: Complete authentication
        C->>F: Return ID/Access/Refresh tokens
        F->>F: Store tokens securely
        Note over F: ⚠️ Refresh tokens are sensitive
        
        Note over F: User makes API request
        F->>B: API call with Bearer token
        B->>C: Validate JWT signature
        Note over B,C: ⚠️ Verify signature + expiration
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
        Note over N,P: 🔒 HTTPS + state parameter for CSRF
        P->>U: Show OAuth consent
        U->>P: Grant permission
        P->>N: Return with authorization code
        Note over P,N: ⚠️ Validate state parameter
        N->>F: Set session cookie
        Note over N,F: 🛡️ httpOnly + secure cookies
        
        Note over F: User makes API request
        F->>B: API call with session cookie
        B->>N: Validate session
        Note over B,N: ⚠️ Server-side session validation
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
        Note over F,B: 🔒 HTTPS + CSRF protection needed
        B->>P: passport.authenticate()
        P->>P: Verify credentials
        Note over P: 🛡️ Hash passwords with bcrypt/scrypt
        P->>B: Authentication result
        B->>B: Create session
        Note over B: ⚠️ Configure secure session store
        B->>F: Set session cookie
        Note over B,F: 🛡️ httpOnly + secure + sameSite
        
        Note over F: User makes API request
        F->>B: API call with session cookie
        B->>P: deserializeUser()
        Note over B,P: ⚠️ Session fixation protection
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
        Note over F,B: 🔒 HTTPS mandatory
        B->>B: Verify credentials
        Note over B: 🛡️ Rate limit login attempts
        B->>B: Generate JWT with secret
        Note over B: ⚠️ Use strong secret (256+ bits)
        B->>F: Return JWT token
        F->>F: Store JWT (localStorage/cookie)
        Note over F: ⚠️ httpOnly cookies preferred over localStorage
        
        Note over F: User makes API request
        F->>B: API call with Authorization: Bearer JWT
        B->>B: Verify JWT signature
        Note over B: ⚠️ Check signature + expiration + issuer
        B->>B: Check token expiry
        Note over B: 🛡️ Implement token blacklisting
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
        Note over F,A: 🔒 Ensure HTTPS is used
        A->>U: Show auth interface
        U->>A: Provide credentials
        A->>F: Return authentication result
        F->>F: Store auth state
        Note over F: 🛡️ Store securely (httpOnly cookies when possible)
        
        Note over F: User makes API request
        F->>B: API call with auth headers
        B->>A: Validate credentials
        Note over B,A: ⚠️ Always validate on backend
        A->>B: Validation result ✅
        B->>F: Return protected data
    `;
  }
};
