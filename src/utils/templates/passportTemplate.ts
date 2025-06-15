
export const generatePassportDiagram = (frontend: string, backend: string): string => {
  return `
    sequenceDiagram
      participant U as 👤 User
      participant F as 🖥️ ${frontend}
      participant P as 🛂 Passport.js
      participant O as 🌐 OAuth Provider
      participant B as ⚡ ${backend}
      
      U->>F: Submit login form or OAuth
      F->>B: POST /login with credentials + CSRF token
      Note over F,B: 🔒 HTTPS + CSRF protection essential
      alt OAuth Strategy
          B->>+O: passport.authenticate("oauth-provider") (Google, GitHub, etc.)
          O->>U: Show OAuth consent
          U->>O: Grant permission
          O->>-B: Return OAuth profile + tokens
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
};
