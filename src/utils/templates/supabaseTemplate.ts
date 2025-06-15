
export const generateSupabaseDiagram = (frontend: string, backend: string): string => {
  return `
    sequenceDiagram
      participant U as 👤 User
      participant F as 🖥️ ${frontend}
      participant S as 🟢 Supabase
      participant O as 🌐 OAuth Provider
      participant B as ⚡ ${backend}
      
      U->>F: Click "Sign In"
      F->>S: supabase.auth.signInWithPassword() or OAuth
      Note over F,S: 🔒 All requests go through HTTPS
      alt OAuth Provider Flow
          S->>+O: Handle OAuth with provider (Google, GitHub, etc.)
          O->>U: Show provider consent
          U->>O: Grant permission
          O->>-S: Return OAuth tokens
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
};
