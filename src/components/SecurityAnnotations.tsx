
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
  
  // Enhanced token storage guidance with more nuance
  if (authFlow.frontend === 'React' || authFlow.frontend === 'Vue.js' || authFlow.frontend === 'Next.js') {
    issues.push({
      type: 'info',
      title: 'Token Storage Strategy',
      description: 'Storage choice depends on your threat model: httpOnly cookies (CSRF risk) vs localStorage (XSS risk) vs memory (UX impact).',
      details: 'Consider: token size limits (cookies: 4KB, localStorage: ~5MB), domain sharing needs, mobile app support, and refresh token patterns',
      learnMoreUrl: 'https://auth0.com/docs/secure/security-guidance/data-security/token-storage'
    });
  }
  
  // Universal short-lived token guidance with emphasis on refresh tokens
  issues.push({
    type: 'warning',
    title: 'Short-lived Access Tokens + Refresh Tokens',
    description: 'Access tokens should expire in 15-60 minutes. Use refresh tokens for longer sessions without re-authentication.',
    details: 'Many developers use long-lived tokens for convenience, but this increases security risk significantly. Refresh tokens are crucial for both security and UX.',
    learnMoreUrl: 'https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/'
  });
  
  if (authFlow.authProvider === 'Custom JWT') {
    issues.push({
      type: 'warning',
      title: 'JWT Implementation Complexity',
      description: 'Custom JWT implementations often skip refresh tokens, proper key rotation, and token blacklisting.',
      details: 'Consider using a battle-tested auth service instead of rolling your own JWT implementation',
      learnMoreUrl: 'https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/'
    });
  }
  
  if (authFlow.authProvider === 'Passport.js') {
    issues.push({
      type: 'warning',
      title: 'Session vs Token Trade-offs',
      description: 'Sessions with httpOnly cookies prevent XSS but need CSRF protection. Consider hybrid approaches.',
      details: 'Sessions are vulnerable to CSRF, tokens to XSS. Many Passport.js implementations lack refresh token support.',
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
  
  // Provider-specific guidance
  if (authFlow.authProvider === 'Auth0') {
    issues.push({
      type: 'info',
      title: 'Token Validation',
      description: 'Always validate tokens on the backend using Auth0\'s public keys, never trust frontend-only validation.',
      details: 'Verify JWT signature, issuer, audience, and expiration claims',
      learnMoreUrl: 'https://auth0.com/docs/secure/tokens/access-tokens/validate-access-tokens'
    });
  }
  
  if (authFlow.authProvider === 'Firebase Auth') {
    issues.push({
      type: 'info',
      title: 'Firebase Admin SDK Required',
      description: 'Always validate ID tokens server-side using Firebase Admin SDK, never trust client tokens.',
      details: 'Firebase automatically handles token refresh, but backend validation is still required',
      learnMoreUrl: 'https://firebase.google.com/docs/auth/admin/verify-id-tokens'
    });
  }
  
  if (authFlow.authProvider === 'Clerk') {
    issues.push({
      type: 'info',
      title: 'Server-side Validation',
      description: 'Use Clerk\'s getAuth() helper in your backend to validate sessions, don\'t rely on frontend checks.',
      details: 'Clerk handles token refresh automatically but server-side validation is mandatory',
      learnMoreUrl: 'https://clerk.com/docs/backend-requests/handling/manual-jwt'
    });
  }
  
  if (authFlow.authProvider === 'Supabase Auth') {
    issues.push({
      type: 'info',
      title: 'Row Level Security (RLS)',
      description: 'Implement RLS policies to protect your data beyond token validation.',
      details: 'RLS provides an additional security layer and should be enabled on all tables',
      learnMoreUrl: 'https://supabase.com/docs/guides/auth/row-level-security'
    });
  }

  if (authFlow.authProvider === 'AWS Cognito') {
    issues.push({
      type: 'info',
      title: 'JWT Signature Verification',
      description: 'Always validate JWT signatures using Cognito public keys and verify all claims.',
      details: 'Verify signature, issuer, audience, and expiration. Consider MFA for sensitive operations.',
      learnMoreUrl: 'https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html'
    });
  }

  if (authFlow.authProvider === 'NextAuth.js') {
    issues.push({
      type: 'info',
      title: 'Session Security Configuration',
      description: 'Configure secure session cookies and implement proper CSRF protection.',
      details: 'NextAuth.js handles most security automatically, but review session configuration and token refresh settings',
      learnMoreUrl: 'https://next-auth.js.org/configuration/options#session'
    });
  }

  // Add CSRF protection reminder for session-based auth
  if (authFlow.authProvider === 'Passport.js' || authFlow.authProvider === 'NextAuth.js') {
    issues.push({
      type: 'warning',
      title: 'CSRF Protection Required',
      description: 'Implement CSRF tokens to prevent cross-site request forgery attacks.',
      details: 'Session-based auth with cookies is vulnerable to CSRF - use proper CSRF tokens or SameSite cookies',
      learnMoreUrl: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html'
    });
  }

  // Universal security reminders
  issues.push({
    type: 'info',
    title: 'HTTPS & Rate Limiting',
    description: 'Always use HTTPS in production and implement rate limiting on auth endpoints.',
    details: 'Protect against brute force attacks with exponential backoff and account lockout mechanisms',
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
              <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
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
