
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Bug, TrendingUp } from 'lucide-react';
import { AuthFlow } from '@/types/auth';

interface CommonPitfallsProps {
  authFlow: AuthFlow;
}

const getPitfalls = (authFlow: AuthFlow) => {
  const pitfalls = [];
  
  if (authFlow.authProvider === 'Auth0') {
    pitfalls.push({
      title: 'Silent Authentication Issues',
      description: 'Developers often forget to handle silent auth failures gracefully.',
      solution: 'Always implement fallback to interactive login when silent auth fails.'
    });
    pitfalls.push({
      title: 'Audience Mismatch',
      description: 'API calls fail because audience parameter doesn\'t match API identifier.',
      solution: 'Ensure the audience in your auth request matches your API identifier exactly.'
    });
  }

  if (authFlow.authProvider === 'Firebase Auth') {
    pitfalls.push({
      title: 'Missing Auth State Persistence',
      description: 'Users get logged out on page refresh because persistence isn\'t configured.',
      solution: 'Use setPersistence(browserLocalPersistence) for web apps.'
    });
    pitfalls.push({
      title: 'Security Rules Confusion',
      description: 'Mixing up Authentication vs Authorization in Firestore rules.',
      solution: 'Remember: auth checks if user exists, rules check what they can access.'
    });
  }

  if (authFlow.authProvider === 'Clerk') {
    pitfalls.push({
      title: 'Middleware Configuration',
      description: 'Protected routes not working because middleware isn\'t properly configured.',
      solution: 'Ensure your middleware.ts file includes all protected route patterns.'
    });
    pitfalls.push({
      title: 'Client vs Server Components',
      description: 'Using client-side auth hooks in server components causes hydration errors.',
      solution: 'Use auth() in server components, useAuth() only in client components.'
    });
  }

  if (authFlow.authProvider === 'Supabase Auth') {
    pitfalls.push({
      title: 'RLS Policy Gaps',
      description: 'Data leaks because Row Level Security policies have logical gaps.',
      solution: 'Test RLS policies with different user roles and edge cases thoroughly.'
    });
    pitfalls.push({
      title: 'Session Management',
      description: 'Not handling session refresh properly leads to sudden logouts.',
      solution: 'Set up proper session refresh handling and token expiration management.'
    });
  }

  if (authFlow.authProvider === 'NextAuth.js') {
    pitfalls.push({
      title: 'JWT vs Database Sessions',
      description: 'Confusion about when to use JWT strategy vs database sessions.',
      solution: 'Use database sessions for server-side rendering, JWT for stateless APIs.'
    });
    pitfalls.push({
      title: 'Callback URL Mismatches',
      description: 'OAuth providers reject requests due to incorrect callback URLs.',
      solution: 'Ensure callback URLs in provider settings match your NextAuth configuration exactly.'
    });
  }

  if (authFlow.authProvider === 'Custom JWT') {
    pitfalls.push({
      title: 'Weak Secret Keys',
      description: 'Using predictable or short secret keys makes JWTs vulnerable.',
      solution: 'Use cryptographically secure random keys of at least 256 bits.'
    });
    pitfalls.push({
      title: 'No Token Revocation',
      description: 'JWTs can\'t be invalidated once issued, creating security risks.',
      solution: 'Implement a token blacklist or use short expiration times with refresh tokens.'
    });
  }

  // Frontend-specific pitfalls
  if (authFlow.frontend === 'React' || authFlow.frontend === 'Next.js') {
    pitfalls.push({
      title: 'Token Storage in localStorage',
      description: 'Storing sensitive tokens in localStorage exposes them to XSS attacks.',
      solution: 'Use httpOnly cookies or secure in-memory storage for sensitive tokens.'
    });
  }

  return pitfalls;
};

export const CommonPitfalls: React.FC<CommonPitfallsProps> = ({ authFlow }) => {
  const pitfalls = getPitfalls(authFlow);
  
  if (pitfalls.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Bug className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-semibold text-foreground">Common Pitfalls</h3>
      </div>
      
      {pitfalls.map((pitfall, index) => (
        <Alert key={index} variant="destructive" className="border-l-4 border-l-red-500">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <div>
            <AlertTitle className="text-sm font-semibold">{pitfall.title}</AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground mt-1">
              <div className="mb-2">{pitfall.description}</div>
              <div className="text-green-700 dark:text-green-300 font-medium">
                💡 Solution: {pitfall.solution}
              </div>
            </AlertDescription>
          </div>
        </Alert>
      ))}
    </div>
  );
};
