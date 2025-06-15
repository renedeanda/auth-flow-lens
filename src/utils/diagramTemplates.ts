
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
        F->>A: Redirect to /authorize endpoint
        Note over F,A: 🔒 PKCE flow for SPAs (code_challenge)
        A->>U: Show Auth0 Universal Login
        U->>A: Enter credentials
        A->>A: Validate credentials
        A->>F: Redirect with authorization code
        Note over A,F: ⚠️ Validate state parameter for CSRF protection
        F->>A: POST /oauth/token (exchange code + code_verifier)
        A->>F: Return access_token + id_token (JWT)
        F->>F: Store tokens (memory/sessionStorage recommended)
        Note over F: 🛡️ Avoid localStorage for sensitive tokens
        
        Note over F: Making authenticated API call
        F->>B: API request with Authorization: Bearer <access_token>
        B->>A: Validate JWT at /userinfo or decode + verify signature
        Note over B,A: ⚠️ Always validate token signature and expiration
        A->>B: Token valid + user info
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
        F->>FB: signInWithEmailAndPassword(email, password)
        Note over F,FB: 🔒 Firebase handles HTTPS automatically
        FB->>FB: Validate credentials against Firebase project
        FB->>F: Return UserCredential object
        F->>FB: user.getIdToken() to get JWT
        FB->>F: Return Firebase ID token (JWT)
        F->>F: Token automatically stored in IndexedDB
        Note over F: 🛡️ Firebase SDK handles secure token storage
        
        Note over F: Making authenticated API call
        F->>F: Firebase SDK auto-attaches token to requests
        F->>B: API request with Authorization: Bearer <id_token>
        B->>FB: Verify token using Firebase Admin SDK
        Note over B,FB: ⚠️ Must use Admin SDK - never trust client tokens
        FB->>B: Decoded token + user claims
        B->>F: Return protected data
    `;
  } else if (authProvider === 'Clerk') {
    return `
      sequenceDiagram
        participant U as 👤 User
        participant F as 🖥️ ${frontend}
        participant C as 🛡️ Clerk
        participant B as ⚡ ${backend}
        
        U->>F: Access protected route
        F->>C: useAuth() hook checks authentication
        C->>F: User not signed in
        F->>F: Show <SignIn /> component
        Note over F,C: 🔒 Clerk handles HTTPS and security headers
        U->>C: Complete sign in via Clerk UI
        C->>C: Validate credentials
        C->>F: Set session token in httpOnly cookie
        Note over C,F: 🛡️ Clerk uses httpOnly + secure + sameSite cookies
        F->>F: useAuth() returns signed-in user
        
        Note over F: Making authenticated API call
        F->>B: Request with session cookie (automatic)
        B->>C: Validate session using getAuth() from @clerk/nextjs
        Note over B,C: ⚠️ Server-side validation required
        C->>B: Return user object if valid
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
        F->>S: supabase.auth.signInWithPassword({email, password})
        Note over F,S: 🔒 All requests go through HTTPS
        S->>S: Validate credentials in auth.users table
        S->>F: Return {data: {user, session}, error}
        F->>F: Session stored in localStorage by default
        Note over F: ⚠️ Can configure to use cookies instead
        
        Note over F: Making authenticated API call
        F->>S: Query with supabase.from('table').select()
        Note over F,S: JWT automatically attached by Supabase client
        S->>S: Validate JWT + apply Row Level Security (RLS)
        Note over S: 🛡️ RLS policies provide additional security layer
        S->>F: Return filtered data based on RLS + user permissions
        
        Note over B: If using separate backend
        F->>B: Manual API call with session.access_token
        B->>S: Verify JWT using supabase.auth.getUser(jwt)
        S->>B: Return user if token valid
        B->>F: Return protected data
    `;
  } else if (authProvider === 'AWS Cognito') {
    return `
      sequenceDiagram
        participant U as 👤 User
        participant F as 🖥️ ${frontend}
        participant C as ☁️ AWS Cognito
        participant B as ⚡ ${backend}
        
        U->>F: Submit login form
        F->>C: initiateAuth() with username/password
        Note over F,C: 🔒 SRP (Secure Remote Password) protocol used
        C->>F: Return AuthenticationResult or ChallengeName
        Note over C,F: 🛡️ May require MFA challenge
        alt MFA Required
            F->>U: Show MFA input
            U->>F: Enter MFA code
            F->>C: respondToAuthChallenge()
        end
        C->>F: Return IdToken, AccessToken, RefreshToken
        F->>F: Store tokens (recommended: secure storage)
        Note over F: ⚠️ RefreshToken is long-lived and very sensitive
        
        Note over F: Making authenticated API call
        F->>B: Request with Authorization: Bearer <AccessToken>
        B->>C: Validate JWT signature using Cognito public keys
        Note over B,C: ⚠️ Verify signature, issuer, audience, expiration
        C->>B: JWT signature valid
        B->>B: Extract user claims from verified JWT
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
        
        U->>F: Click "Sign in with Provider"
        F->>N: signIn("provider") function call
        N->>N: Generate PKCE code_challenge + state
        N->>P: Redirect to OAuth authorization URL
        Note over N,P: 🔒 HTTPS + PKCE + state parameter for security
        P->>U: Show OAuth consent screen
        U->>P: Grant permission
        P->>N: Redirect with authorization code + state
        Note over P,N: ⚠️ NextAuth validates state parameter
        N->>P: Exchange code for tokens (+ code_verifier)
        P->>N: Return access_token + id_token + refresh_token
        N->>N: Create NextAuth session
        N->>F: Set session cookie (next-auth.session-token)
        Note over N,F: 🛡️ httpOnly + secure + sameSite cookies
        
        Note over F: Making authenticated API call
        F->>B: Request with session cookie
        B->>N: getServerSession() or getToken()
        Note over B,N: ⚠️ Server-side session validation required
        N->>B: Return session/JWT if valid
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
        F->>B: POST /login with credentials + CSRF token
        Note over F,B: 🔒 HTTPS + CSRF protection essential
        B->>P: passport.authenticate("local") middleware
        P->>P: LocalStrategy.verify(username, password, done)
        Note over P: 🛡️ Compare hashed password (bcrypt/argon2)
        P->>B: Return user object or false
        B->>B: req.login() - serialize user to session
        Note over B: ⚠️ Configure secure session store (Redis/MongoDB)
        B->>F: Set session cookie (connect.sid)
        Note over B,F: 🛡️ httpOnly + secure + sameSite + rolling sessions
        
        Note over F: Making authenticated API call
        F->>B: Request with session cookie
        B->>P: passport.session() deserializeUser()
        Note over B,P: ⚠️ Regenerate session ID to prevent fixation
        P->>B: Return user object from session
        B->>F: Return protected data
    `;
  } else if (authProvider === 'Custom JWT') {
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
        B->>B: Generate JWT with HS256/RS256
        Note over B: ⚠️ Use cryptographically strong secret (256+ bits)
        B->>B: Set claims: iss, aud, exp, iat, sub
        Note over B: 🛡️ Short expiration (15-60 minutes recommended)
        B->>F: Return {access_token, refresh_token}
        F->>F: Store tokens
        Note over F: ⚠️ Access token in memory, refresh in httpOnly cookie
        
        Note over F: Making authenticated API call
        F->>B: Request with Authorization: Bearer <access_token>
        B->>B: Verify JWT signature using secret/public key
        Note over B: ⚠️ Validate signature + expiration + issuer + audience
        B->>B: Check token blacklist (if implemented)
        Note over B: 🛡️ Implement token revocation for security
        B->>F: Return protected data
        
        alt Token Expired
            F->>B: POST /auth/refresh with refresh_token
            B->>B: Validate refresh token + generate new access token
            B->>F: Return new access_token
        end
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
        A->>U: Show authentication interface
        U->>A: Provide credentials
        A->>A: Validate credentials
        A->>F: Return authentication result + token/session
        F->>F: Store authentication state securely
        Note over F: 🛡️ Use httpOnly cookies when possible
        
        Note over F: Making authenticated API call
        F->>B: API request with authentication headers/cookies
        B->>A: Validate token/session with auth provider
        Note over B,A: ⚠️ Always validate on backend - never trust frontend
        A->>B: Return validation result + user claims
        B->>F: Return protected data
    `;
  }
};
