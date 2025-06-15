
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Copy, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import mermaid from 'mermaid';

interface AuthFlow {
  frontend: string;
  authProvider: string;
  backend: string;
}

const Index = () => {
  const [authFlow, setAuthFlow] = useState<AuthFlow>({
    frontend: 'Next.js',
    authProvider: 'Auth0',
    backend: 'Next.js API Routes'
  });
  const { toast } = useToast();

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        primaryColor: '#3B82F6',
        primaryTextColor: '#1F2937',
        primaryBorderColor: '#2563EB',
        lineColor: '#6366F1',
        secondaryColor: '#EFF6FF',
        tertiaryColor: '#F8FAFC'
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true
      }
    });
  }, []);

  const generateMermaidDiagram = (flow: AuthFlow): string => {
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

  const renderDiagram = async () => {
    const diagramDefinition = generateMermaidDiagram(authFlow);
    
    try {
      const element = document.getElementById('diagram-container');
      if (element) {
        // Clear previous content
        element.innerHTML = '';
        
        // Create a unique ID for this render
        const diagramId = `diagram-${Date.now()}`;
        
        // Render the diagram
        const { svg } = await mermaid.render(diagramId, diagramDefinition);
        element.innerHTML = svg;
      }
    } catch (error) {
      console.error('Mermaid rendering error:', error);
      const element = document.getElementById('diagram-container');
      if (element) {
        element.innerHTML = '<div class="flex items-center justify-center h-64 text-gray-500">Error rendering diagram. Please try a different configuration.</div>';
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      renderDiagram();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [authFlow]);

  const copyDiagramCode = () => {
    const diagramCode = generateMermaidDiagram(authFlow);
    navigator.clipboard.writeText(diagramCode);
    toast({
      title: "Copied to clipboard!",
      description: "Mermaid diagram code copied successfully.",
    });
  };

  const downloadDiagram = () => {
    const svg = document.querySelector('#diagram-container svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'auth-flow-diagram.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
    
    toast({
      title: "Download started!",
      description: "Your auth flow diagram is being downloaded.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Auth Flow Visualizer
              </h1>
              <p className="text-slate-600">Understand your authentication stack in 30 seconds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stack Selector */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🧩</span>
                  Choose Your Stack
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Frontend Framework
                  </label>
                  <Select
                    value={authFlow.frontend}
                    onValueChange={(value) => setAuthFlow(prev => ({ ...prev, frontend: value }))}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Next.js">Next.js</SelectItem>
                      <SelectItem value="React">React</SelectItem>
                      <SelectItem value="Vue.js">Vue.js</SelectItem>
                      <SelectItem value="Angular">Angular</SelectItem>
                      <SelectItem value="Svelte">Svelte</SelectItem>
                      <SelectItem value="Nuxt.js">Nuxt.js</SelectItem>
                      <SelectItem value="Remix">Remix</SelectItem>
                      <SelectItem value="SolidJS">SolidJS</SelectItem>
                      <SelectItem value="HTML/JavaScript">HTML/JavaScript</SelectItem>
                      <SelectItem value="React Native">React Native</SelectItem>
                      <SelectItem value="Flutter Web">Flutter Web</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Auth Provider
                  </label>
                  <Select
                    value={authFlow.authProvider}
                    onValueChange={(value) => setAuthFlow(prev => ({ ...prev, authProvider: value }))}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Auth0">Auth0</SelectItem>
                      <SelectItem value="Firebase Auth">Firebase Auth</SelectItem>
                      <SelectItem value="Clerk">Clerk</SelectItem>
                      <SelectItem value="Supabase Auth">Supabase Auth</SelectItem>
                      <SelectItem value="AWS Cognito">AWS Cognito</SelectItem>
                      <SelectItem value="NextAuth.js">NextAuth.js</SelectItem>
                      <SelectItem value="Passport.js">Passport.js</SelectItem>
                      <SelectItem value="Custom JWT">Custom JWT</SelectItem>
                      <SelectItem value="Okta">Okta</SelectItem>
                      <SelectItem value="Azure AD">Azure AD</SelectItem>
                      <SelectItem value="Google Identity">Google Identity</SelectItem>
                      <SelectItem value="Magic">Magic</SelectItem>
                      <SelectItem value="Stytch">Stytch</SelectItem>
                      <SelectItem value="WorkOS">WorkOS</SelectItem>
                      <SelectItem value="Keycloak">Keycloak</SelectItem>
                      <SelectItem value="FusionAuth">FusionAuth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Backend
                  </label>
                  <Select
                    value={authFlow.backend}
                    onValueChange={(value) => setAuthFlow(prev => ({ ...prev, backend: value }))}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="None (Client-only)">None (Client-only)</SelectItem>
                      <SelectItem value="Next.js API Routes">Next.js API Routes</SelectItem>
                      <SelectItem value="Express.js">Express.js</SelectItem>
                      <SelectItem value="Node.js">Node.js</SelectItem>
                      <SelectItem value="Fastify">Fastify</SelectItem>
                      <SelectItem value="NestJS">NestJS</SelectItem>
                      <SelectItem value="Django">Django</SelectItem>
                      <SelectItem value="Flask">Flask</SelectItem>
                      <SelectItem value="FastAPI">FastAPI</SelectItem>
                      <SelectItem value="Ruby on Rails">Ruby on Rails</SelectItem>
                      <SelectItem value="Spring Boot">Spring Boot</SelectItem>
                      <SelectItem value="ASP.NET Core">ASP.NET Core</SelectItem>
                      <SelectItem value="Go Gin">Go Gin</SelectItem>
                      <SelectItem value="Rust Actix">Rust Actix</SelectItem>
                      <SelectItem value="Serverless Functions">Serverless Functions</SelectItem>
                      <SelectItem value="AWS Lambda">AWS Lambda</SelectItem>
                      <SelectItem value="Vercel Functions">Vercel Functions</SelectItem>
                      <SelectItem value="Netlify Functions">Netlify Functions</SelectItem>
                      <SelectItem value="Cloudflare Workers">Cloudflare Workers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Current Stack Display */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm font-medium text-slate-700 mb-3">Current Stack:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {authFlow.frontend}
                    </Badge>
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                      {authFlow.authProvider}
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      {authFlow.backend}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Diagram Display */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span>📊</span>
                    Authentication Flow
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyDiagramCode}
                      className="hover:bg-slate-50"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Code
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadDiagram}
                      className="hover:bg-slate-50"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PNG
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  id="diagram-container"
                  className="w-full min-h-[500px] bg-white rounded-lg border border-slate-200 p-6 overflow-auto flex items-center justify-center"
                >
                  <div className="text-slate-500">Loading diagram...</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-slate-600">
            <p className="mb-2">Built to help developers understand auth flows quickly</p>
            <p className="text-sm">No login required • No cookies • Just helpful visuals</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
