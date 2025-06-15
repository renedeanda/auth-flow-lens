
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
      title: 'JWT Security Risks',
      description: 'Ensure JWT secrets are strong, tokens have expiration, and implement proper key rotation.',
      details: 'Common issues: weak secrets, no expiration, storing sensitive data in JWT payload',
      learnMoreUrl: 'https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/'
    });
  }
  
  if (authFlow.authProvider === 'Passport.js') {
    issues.push({
      type: 'warning',
      title: 'Session Security',
      description: 'Configure secure session storage and implement CSRF protection.',
      details: 'Risks: session hijacking, CSRF attacks, insecure session storage',
      learnMoreUrl: 'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html'
    });
  }
  
  if (authFlow.frontend === 'React' || authFlow.frontend === 'Vue.js') {
    issues.push({
      type: 'info',
      title: 'XSS Prevention',
      description: 'Sanitize user inputs and avoid storing sensitive tokens in localStorage.',
      details: 'Best practice: Use httpOnly cookies for sensitive tokens when possible',
      learnMoreUrl: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html'
    });
  }
  
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
  
  // Universal security reminders
  issues.push({
    type: 'info',
    title: 'HTTPS Required',
    description: 'Always use HTTPS in production to prevent token interception.',
    details: 'Tokens sent over HTTP can be easily intercepted',
    learnMoreUrl: 'https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html'
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
