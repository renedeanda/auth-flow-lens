
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
        
        Note over U,B: 🔄 OAuth 2.0 + PKCE Flow (with 3rd party)
        U->>F: Click "Sign In"
        F->>F: Generate PKCE code_challenge + state
        Note over F: 🛡️ PKCE prevents authorization code interception
        F->>A: Redirect to /authorize (code_challenge + state)
        A->>U: Show Auth0 Universal Login
        U->>A: Enter credentials or select OAuth provider
        alt OAuth Provider (Google, GitHub, etc.)
            A->>+third: Redirect to OAuth provider
            third->>U: Show provider consent screen
            U->>third: Grant permission
            third->>-A: Return with authorization code
            A->>A: Exchange code for provider tokens
        end
        A->>A: Validate credentials/tokens
        A->>F: Redirect with authorization code + state
        Note over A,F: ⚠️ Always validate state parameter (CSRF protection)
        F->>A: POST /oauth/token (code + code_verifier)
        A->>F: Return access_token + id_token + refresh_token
        Note over A,F: 🔄 Access token: 15-60min, Refresh token: weeks/months
        F->>F: Store tokens securely (memory/httpOnly cookies)
        Note over F: 🛡️ Choose storage based on threat model
        
        Note over F: Making authenticated API call
        F->>B: API request with Authorization: Bearer <access_token>
        B->>A: Validate JWT signature + claims
        Note over B,A: ⚠️ Backend validation required - never trust frontend
        A->>B: Token valid + user claims
        B->>F: Return protected data
        
        alt Access Token Expired
            F->>A: POST /oauth/token (refresh_token)
            A->>F: Return new access_token + refresh_token
            Note over A,F: 🔄 Rotate refresh tokens for security
        end
    `;
  } else if (authProvider === 'Google Identity') {
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
  } else if (authProvider === 'NextAuth.js') {
    return `
      sequenceDiagram
        participant U as 👤 User
        participant F as 🖥️ ${frontend}
        participant N as 🔑 NextAuth.js
        participant P as 🌐 OAuth Provider
        participant B as ⚡ ${backend}
        
        Note over U,B: 🔄 NextAuth.js OAuth Flow (3rd party involved)
        U->>F: Click "Sign in with Provider"
        F->>N: signIn("provider") function call
        N->>N: Generate PKCE code_challenge + state + nonce
        N->>P: Redirect to OAuth provider authorization URL
        Note over N,P: 🔒 HTTPS + PKCE + state + nonce for security
        P->>U: Show OAuth consent screen (Google, GitHub, etc.)
        U->>P: Grant permission
        P->>N: Redirect with authorization code + state
        Note over P,N: ⚠️ NextAuth validates state parameter automatically
        N->>P: Exchange code for tokens (+ code_verifier)
        P->>N: Return access_token + id_token + refresh_token
        Note over P,N: 🔄 Provider tokens may include refresh capability
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
            N->>P: Use refresh_token to get new access_token
            P->>N: Return refreshed tokens
            N->>N: Update session with new tokens
            Note over N: 🔄 NextAuth handles refresh automatically when possible
        end
    `;
  } else if (authProvider === 'Firebase Auth') {
    return `
      sequenceDiagram
        participant U as 👤 User
        participant F as 🖥️ ${frontend}
        participant FB as 🔥 Firebase Auth
        participant B as ⚡ ${backend}
        
        U->>F: Click "Sign In"
        F->>FB: signInWithEmailAndPassword() or OAuth provider
        Note over F,FB: 🔒 Firebase handles HTTPS + OAuth flows automatically
        alt OAuth Provider Flow
            FB->>+third: Redirect to OAuth provider
            third->>U: Show provider consent
            U->>third: Grant permission
            third->>-FB: Return OAuth tokens
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
        Note over F,C: 🔒 Clerk handles OAuth flows + security headers
        alt OAuth Provider
            C->>+third: Handle OAuth flow with provider
            third->>U: Show provider consent
            U->>third: Grant permission
            third->>-C: Return OAuth data
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
  } else if (authProvider === 'Supabase Auth') {
    return `
      sequenceDiagram
        participant U as 👤 User
        participant F as 🖥️ ${frontend}
        participant S as 🟢 Supabase
        participant B as ⚡ ${backend}
        
        U->>F: Click "Sign In"
        F->>S: supabase.auth.signInWithPassword() or OAuth
        Note over F,S: 🔒 All requests go through HTTPS
        alt OAuth Provider Flow
            S->>+third: Handle OAuth with provider (Google, GitHub, etc.)
            third->>U: Show provider consent
            U->>third: Grant permission
            third->>-S: Return OAuth tokens
        end
        S->>S: Validate credentials/OAuth tokens in auth.users table
        S->>F: Return {data: {user, session}, error}
        Note over S,F: 🔄 Session includes access_token + refresh_token
        F->>F: Session stored (localStorage default, configurable)
        Note over F: ⚠️ Can configure httpOnly cookies instead
        
        Note over F: Making authenticated API call
        F->>S: Query with supabase.from('table').select()
        Note over F,S: JWT automatically attached by Supabase client
        S->>S: Validate JWT + apply Row Level Security (RLS)
        Note over S: 🛡️ RLS policies provide additional security layer
        S->>F: Return filtered data based on RLS + user permissions
        
        alt Separate Backend API
            F->>B: Manual API call with session.access_token
            B->>S: Verify JWT using supabase.auth.getUser(jwt)
            S->>B: Return user if token valid
            B->>F: Return protected data
        end
        
        Note over S: 🔄 Supabase auto-refreshes tokens before expiry
    `;
  } else if (authProvider === 'AWS Cognito') {
    return `
      sequenceDiagram
        participant U as 👤 User
        participant F as 🖥️ ${frontend}
        participant C as ☁️ AWS Cognito
        participant B as ⚡ ${backend}
        
        U->>F: Submit login form
        F->>C: initiateAuth() with username/password or OAuth
        Note over F,C: 🔒 SRP (Secure Remote Password) protocol used
        alt OAuth Provider Flow
            C->>+third: Federated identity with OAuth provider
            third->>U: Show provider consent
            U->>third: Grant permission
            third->>-C: Return OAuth tokens
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
  } else if (authProvider === 'Passport.js') {
    return `
      sequenceDiagram
        participant U as 👤 User
        participant F as 🖥️ ${frontend}
        participant P as 🛂 Passport.js
        participant B as ⚡ ${backend}
        
        U->>F: Submit login form or OAuth
        F->>B: POST /login with credentials + CSRF token
        Note over F,B: 🔒 HTTPS + CSRF protection essential
        alt OAuth Strategy
            B->>+third: passport.authenticate("oauth-provider")
            third->>U: Show OAuth consent
            U->>third: Grant permission
            third->>-B: Return OAuth profile + tokens
            B->>P: OAuth strategy verify callback
        else Local Strategy
            B->>P: passport.authenticate("local") middleware
            P->>P: LocalStrategy.verify(username, password, done)
            Note over P: 🛡️ Compare hashed password (bcrypt/argon2)
        end
        P->>B: Return user object or false
        B->>B: req.login() - serialize user to session
        Note over B: ⚠️ Configure secure session store (Redis/MongoDB)
        B->>F: Set session cookie (connect.sid)
        Note over B,F: 🛡️ httpOnly + secure + sameSite + rolling sessions
        Note over B,F: ⚠️ Consider implementing refresh tokens for better UX
        
        Note over F: Making authenticated API call
        F->>B: Request with session cookie
        B->>P: passport.session() deserializeUser()
        Note over B,P: ⚠️ Regenerate session ID to prevent fixation
        P->>B: Return user object from session
        B->>F: Return protected data
        
        Note over B: 🔄 Session expiry requires full re-authentication
        Note over B: 💡 Consider hybrid approach with refresh tokens
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
        alt OAuth Flow (if applicable)
            A->>+third: Redirect to OAuth provider
            third->>U: Show consent screen
            U->>third: Grant permission
            third->>-A: Return authorization code/tokens
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
  }
};
