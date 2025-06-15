import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Shield, AlertTriangle, Info, ExternalLink } from 'lucide-react';
import { AuthFlow } from '@/types/auth';

interface SecurityAnnotationsProps {
  authFlow: AuthFlow;
}

const getSecurityIssues = (authFlow: AuthFlow) => {
  const issues = [];
  
  if (authFlow.authProvider === 'Custom JWT') {
    issues.push({
      type: 'warning',
      title: 'JWT Security & Refresh Tokens',
      description: 'JWTs should be short-lived (15-60 minutes) with longer-lived refresh tokens for security.',
      details: 'Many developers skip refresh tokens, but they\'re crucial for security and user experience',
      learnMoreUrl: 'https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/'
    });
    
    issues.push({
      type: 'info',
      title: 'Token Storage Trade-offs',
      description: 'httpOnly cookies prevent XSS but are vulnerable to CSRF. localStorage prevents CSRF but vulnerable to XSS.',
      details: 'Choice depends on your app\'s threat model: Size limits, convenience, and attack vectors differ',
      learnMoreUrl: 'https://auth0.com/docs/secure/security-guidance/data-security/token-storage'
    });
  }
  
  if (authFlow.authProvider === 'Passport.js') {
    issues.push({
      type: 'warning',
      title: 'Missing Refresh Token Implementation',
      description: 'Many Passport.js implementations skip refresh tokens, requiring full re-authentication when sessions expire.',
      details: 'Consider implementing refresh tokens even with session-based auth for better UX',
      learnMoreUrl: 'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html'
    });
    
    issues.push({
      type: 'warning',
      title: 'Session vs Token Trade-offs',
      description: 'Sessions with httpOnly cookies prevent XSS but need CSRF protection. Consider hybrid approaches.',
      details: 'Sessions are vulnerable to CSRF, tokens to XSS - understand your threat model',
      learnMoreUrl: 'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html'
    });
  }
  
  // Add OAuth-specific guidance for providers that use it
  if (['Auth0', 'Google Identity', 'Azure AD', 'Okta', 'NextAuth.js'].includes(authFlow.authProvider)) {
    issues.push({
      type: 'info',
      title: 'OAuth Flow Complexity',
      description: 'OAuth involves 3rd parties, adding redirect complexity and potential attack vectors like state parameter tampering.',
      details: 'Always validate state parameter, use PKCE for SPAs, and handle callback errors gracefully',
      learnMoreUrl: 'https://datatracker.ietf.org/doc/html/rfc6749#section-10'
    });
  }
  
  // Enhanced token storage guidance
  if (authFlow.frontend === 'React' || authFlow.frontend === 'Vue.js' || authFlow.frontend === 'Next.js') {
    issues.push({
      type: 'info',
      title: 'Token Storage Strategy',
      description: 'Storage choice depends on your threat model: httpOnly cookies (CSRF risk) vs localStorage (XSS risk) vs memory (UX impact).',
      details: 'Consider: token size limits, domain sharing needs, mobile app support, and refresh token patterns',
      learnMoreUrl: 'https://auth0.com/docs/secure/security-guidance/data-security/token-storage'
    });
  }
  
  // Universal refresh token guidance
  issues.push({
    type: 'warning',
    title: 'Short-lived Access Tokens',
    description: 'Access tokens should expire in 15-60 minutes. Use refresh tokens for longer sessions without re-authentication.',
    details: 'Many developers use long-lived tokens for convenience, but this increases security risk significantly',
    learnMoreUrl: 'https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/'
  });
  
  if (authFlow.authProvider === 'Auth0') {
    issues.push({
      type: 'info',
      title: 'Token Validation',
      description: 'Always validate tokens on the backend, never trust frontend-only validation.',
      details: 'Critical: Backend must verify token signature and expiration',
      learnMoreUrl: 'https://auth0.com/docs/secure/tokens/access-tokens/validate-access-tokens'
    });
  }
  
  if (authFlow.authProvider === 'Firebase Auth') {
    issues.push({
      type: 'info',
      title: 'Token Validation',
      description: 'Always validate tokens on the backend, never trust frontend-only validation.',
      details: 'Critical: Backend must verify token signature and expiration',
      learnMoreUrl: 'https://firebase.google.com/docs/auth/admin/verify-id-tokens'
    });
  }
  
  if (authFlow.authProvider === 'Clerk') {
    issues.push({
      type: 'info',
      title: 'Token Validation',
      description: 'Always validate tokens on the backend, never trust frontend-only validation.',
      details: 'Critical: Backend must verify token signature and expiration',
      learnMoreUrl: 'https://clerk.com/docs/backend-requests/handling/manual-jwt'
    });
  }
  
  if (authFlow.authProvider === 'Supabase Auth') {
    issues.push({
      type: 'info',
      title: 'Row Level Security',
      description: 'Implement Row Level Security (RLS) policies to protect your data.',
      details: 'RLS provides an additional security layer beyond token validation',
      learnMoreUrl: 'https://supabase.com/docs/guides/auth/row-level-security'
    });
  }
  
  if (authFlow.authProvider === 'AWS Cognito') {
    issues.push({
      type: 'info',
      title: 'Token Validation',
      description: 'Always validate JWT signatures using Cognito public keys.',
      details: 'Verify signature, issuer, audience, and expiration claims',
      learnMoreUrl: 'https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html'
    });
  }
  
  if (authFlow.authProvider === 'NextAuth.js') {
    issues.push({
      type: 'info',
      title: 'Session Security',
      description: 'Configure secure session cookies and implement CSRF protection.',
      details: 'NextAuth.js handles most security automatically, but review configuration',
      learnMoreUrl: 'https://next-auth.js.org/configuration/options#session'
    });
  }

  // Add missing auth providers
  if (authFlow.authProvider === 'Okta') {
    issues.push({
      type: 'info',
      title: 'Token Validation',
      description: 'Always validate Okta JWT tokens and implement proper scopes.',
      details: 'Verify JWT signature using Okta public keys and validate claims',
      learnMoreUrl: 'https://developer.okta.com/docs/guides/validate-access-tokens/go/main/'
    });
  }

  if (authFlow.authProvider === 'Azure AD') {
    issues.push({
      type: 'info',
      title: 'Token Validation',
      description: 'Validate Azure AD tokens and implement proper API permissions.',
      details: 'Use Microsoft Graph API securely and validate JWT signatures',
      learnMoreUrl: 'https://docs.microsoft.com/en-us/azure/active-directory/develop/access-tokens'
    });
  }

  if (authFlow.authProvider === 'Google Identity') {
    issues.push({
      type: 'info',
      title: 'Token Validation',
      description: 'Verify Google ID tokens and implement proper OAuth 2.0 scopes.',
      details: 'Always validate Google JWT tokens server-side',
      learnMoreUrl: 'https://developers.google.com/identity/protocols/oauth2/openid-connect#validatinganidtoken'
    });
  }

  if (authFlow.authProvider === 'Magic') {
    issues.push({
      type: 'info',
      title: 'Token Security',
      description: 'Implement proper token validation and secure Magic Link handling.',
      details: 'Magic uses cryptographic proofs - ensure proper validation',
      learnMoreUrl: 'https://magic.link/docs/auth/api-reference/server-side-sdks/node#token-validation'
    });
  }

  if (authFlow.authProvider === 'Stytch') {
    issues.push({
      type: 'info',
      title: 'Session Security',
      description: 'Implement proper Stytch session validation and token refresh.',
      details: 'Use Stytch backend SDKs for secure token validation',
      learnMoreUrl: 'https://stytch.com/docs/guides/sessions/using-sessions'
    });
  }

  if (authFlow.authProvider === 'WorkOS') {
    issues.push({
      type: 'info',
      title: 'SSO Security',
      description: 'Implement proper SAML/OIDC validation and organization isolation.',
      details: 'WorkOS handles enterprise SSO - ensure proper user isolation',
      learnMoreUrl: 'https://workos.com/docs/sso/guide/introduction'
    });
  }

  if (authFlow.authProvider === 'Keycloak') {
    issues.push({
      type: 'info',
      title: 'Token Validation',
      description: 'Configure proper realm isolation and validate Keycloak JWT tokens.',
      details: 'Use Keycloak adapters or validate JWTs using realm public keys',
      learnMoreUrl: 'https://www.keycloak.org/docs/latest/securing_apps/index.html#_token-verification'
    });
  }

  if (authFlow.authProvider === 'FusionAuth') {
    issues.push({
      type: 'info',
      title: 'JWT Security',
      description: 'Implement proper FusionAuth JWT validation and refresh token handling.',
      details: 'Use FusionAuth client libraries for secure token management',
      learnMoreUrl: 'https://fusionauth.io/docs/v1/tech/apis/jwt#verify-a-jwt'
    });
  }
  
  // Universal security reminders
  issues.push({
    type: 'info',
    title: 'HTTPS Required',
    description: 'Always use HTTPS in production to prevent token interception.',
    details: 'Tokens sent over HTTP can be easily intercepted',
    learnMoreUrl: 'https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html'
  });

  // Add CSRF protection reminder for session-based auth
  if (authFlow.authProvider === 'Passport.js' || authFlow.authProvider === 'NextAuth.js') {
    issues.push({
      type: 'warning',
      title: 'CSRF Protection',
      description: 'Implement CSRF tokens to prevent cross-site request forgery attacks.',
      details: 'Session-based auth is vulnerable to CSRF - use proper tokens',
      learnMoreUrl: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html'
    });
  }

  // Add rate limiting reminder
  issues.push({
    type: 'info',
    title: 'Rate Limiting',
    description: 'Implement rate limiting on authentication endpoints to prevent brute force attacks.',
    details: 'Protect login endpoints with exponential backoff and account lockout',
    learnMoreUrl: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#account-lockout'
  });
  
  return issues;
};

export const SecurityAnnotations: React.FC<SecurityAnnotationsProps> = ({ authFlow }) => {
  const securityIssues = getSecurityIssues(authFlow);
  
  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-foreground">Security Considerations</h3>
      </div>
      
      {securityIssues.map((issue, index) => (
        <Alert 
          key={index}
          variant={issue.type === 'warning' ? 'destructive' : 'default'}
          className="border-l-4 border-l-orange-500"
        >
          <div className="flex items-start gap-3">
            {issue.type === 'warning' ? (
              <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
            ) : (
              <Info className="w-5 h-5 text-blue-500 mt-0.5" />
            )}
            <div className="flex-1">
              <AlertTitle className="text-sm font-semibold">{issue.title}</AlertTitle>
              <AlertDescription className="text-sm text-muted-foreground mt-1">
                {issue.description}
              </AlertDescription>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={issue.learnMoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2 transition-colors"
                  >
                    Learn more
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">{issue.details}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );
};
