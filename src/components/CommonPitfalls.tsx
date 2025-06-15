
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Bug, TrendingUp, ExternalLink } from 'lucide-react';
import { AuthFlow } from '@/types/auth';

interface CommonPitfallsProps {
  authFlow: AuthFlow;
}

interface Pitfall {
  title: string;
  description: string;
  solution: string;
  severity: 'high' | 'medium' | 'low';
  category: 'security' | 'performance' | 'ux' | 'development';
}

const getPitfalls = (authFlow: AuthFlow): Pitfall[] => {
  const pitfalls: Pitfall[] = [];
  
  // Auth0 specific pitfalls
  if (authFlow.authProvider === 'Auth0') {
    pitfalls.push(
      {
        title: 'Silent Authentication Issues',
        description: 'Developers often forget to handle silent auth failures gracefully, causing unexpected logouts.',
        solution: 'Always implement fallback to interactive login when silent auth fails.',
        severity: 'high',
        category: 'ux'
      },
      {
        title: 'Audience Mismatch',
        description: 'API calls fail because audience parameter doesn\'t match API identifier in Auth0 dashboard.',
        solution: 'Ensure the audience in your auth request matches your API identifier exactly.',
        severity: 'high',
        category: 'development'
      },
      {
        title: 'Token Caching Issues',
        description: 'Not properly handling cached tokens can lead to stale authentication state.',
        solution: 'Use Auth0\'s built-in token caching or implement proper cache invalidation.',
        severity: 'medium',
        category: 'performance'
      }
    );
  }

  // Firebase Auth specific pitfalls
  if (authFlow.authProvider === 'Firebase Auth') {
    pitfalls.push(
      {
        title: 'Missing Auth State Persistence',
        description: 'Users get logged out on page refresh because persistence isn\'t configured properly.',
        solution: 'Use setPersistence(browserLocalPersistence) for web apps.',
        severity: 'high',
        category: 'ux'
      },
      {
        title: 'Security Rules Confusion',
        description: 'Mixing up Authentication vs Authorization in Firestore security rules.',
        solution: 'Remember: auth checks if user exists, rules check what they can access.',
        severity: 'high',
        category: 'security'
      },
      {
        title: 'Email Verification Oversight',
        description: 'Not checking emailVerified property allows unverified users full access.',
        solution: 'Always check user.emailVerified before granting access to sensitive features.',
        severity: 'medium',
        category: 'security'
      }
    );
  }

  // Clerk specific pitfalls
  if (authFlow.authProvider === 'Clerk') {
    pitfalls.push(
      {
        title: 'Middleware Configuration',
        description: 'Protected routes not working because middleware isn\'t properly configured.',
        solution: 'Ensure your middleware.ts file includes all protected route patterns.',
        severity: 'high',
        category: 'development'
      },
      {
        title: 'Client vs Server Components',
        description: 'Using client-side auth hooks in server components causes hydration errors.',
        solution: 'Use auth() in server components, useAuth() only in client components.',
        severity: 'high',
        category: 'development'
      }
    );
  }

  // Supabase Auth specific pitfalls
  if (authFlow.authProvider === 'Supabase Auth') {
    pitfalls.push(
      {
        title: 'RLS Policy Gaps',
        description: 'Data leaks because Row Level Security policies have logical gaps or edge cases.',
        solution: 'Test RLS policies thoroughly with different user roles and edge cases.',
        severity: 'high',
        category: 'security'
      },
      {
        title: 'Session Management',
        description: 'Not handling session refresh properly leads to sudden logouts during usage.',
        solution: 'Set up proper session refresh handling and token expiration management.',
        severity: 'medium',
        category: 'ux'
      }
    );
  }

  // NextAuth.js specific pitfalls
  if (authFlow.authProvider === 'NextAuth.js') {
    pitfalls.push(
      {
        title: 'JWT vs Database Sessions',
        description: 'Confusion about when to use JWT strategy vs database sessions affects performance.',
        solution: 'Use database sessions for server-side rendering, JWT for stateless APIs.',
        severity: 'medium',
        category: 'performance'
      },
      {
        title: 'Callback URL Mismatches',
        description: 'OAuth providers reject requests due to incorrect callback URLs in configuration.',
        solution: 'Ensure callback URLs in provider settings match your NextAuth configuration exactly.',
        severity: 'high',
        category: 'development'
      }
    );
  }

  // Custom JWT specific pitfalls
  if (authFlow.authProvider === 'Custom JWT') {
    pitfalls.push(
      {
        title: 'Weak Secret Keys',
        description: 'Using predictable or short secret keys makes JWTs vulnerable to attacks.',
        solution: 'Use cryptographically secure random keys of at least 256 bits.',
        severity: 'high',
        category: 'security'
      },
      {
        title: 'No Token Revocation',
        description: 'JWTs can\'t be invalidated once issued, creating security risks for compromised tokens.',
        solution: 'Implement a token blacklist or use short expiration times with refresh tokens.',
        severity: 'high',
        category: 'security'
      },
      {
        title: 'Sensitive Data in Payload',
        description: 'Storing sensitive information in JWT payload exposes it to client-side access.',
        solution: 'Only store non-sensitive claims in JWT. Keep sensitive data server-side.',
        severity: 'medium',
        category: 'security'
      }
    );
  }

  // Frontend-specific pitfalls
  if (authFlow.frontend === 'React' || authFlow.frontend === 'Next.js') {
    pitfalls.push(
      {
        title: 'Token Storage in localStorage',
        description: 'Storing sensitive tokens in localStorage exposes them to XSS attacks.',
        solution: 'Use httpOnly cookies or secure in-memory storage for sensitive tokens.',
        severity: 'high',
        category: 'security'
      },
      {
        title: 'Missing Loading States',
        description: 'Not handling authentication loading states properly creates poor user experience.',
        solution: 'Always show loading indicators while checking authentication status.',
        severity: 'low',
        category: 'ux'
      }
    );
  }

  // Universal pitfalls that apply to most setups
  pitfalls.push(
    {
      title: 'Insufficient Error Handling',
      description: 'Poor error handling during auth flows confuses users when something goes wrong.',
      solution: 'Implement comprehensive error handling with user-friendly error messages.',
      severity: 'medium',
      category: 'ux'
    },
    {
      title: 'Missing CSRF Protection',
      description: 'Not implementing CSRF protection on auth endpoints enables attack vectors.',
      solution: 'Use CSRF tokens or SameSite cookie attributes for session-based auth.',
      severity: 'high',
      category: 'security'
    }
  );
  
  return pitfalls;
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'border-l-red-500 bg-red-50 dark:bg-red-950/20';
    case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
    case 'low': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/20';
    default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-950/20';
  }
};

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'high': return '🚨';
    case 'medium': return '⚠️';
    case 'low': return '💡';
    default: return '📝';
  }
};

export const CommonPitfalls: React.FC<CommonPitfallsProps> = ({ authFlow }) => {
  const pitfalls = getPitfalls(authFlow);
  
  if (pitfalls.length === 0) {
    return null;
  }

  // Group pitfalls by severity
  const groupedPitfalls = pitfalls.reduce((acc, pitfall) => {
    if (!acc[pitfall.severity]) {
      acc[pitfall.severity] = [];
    }
    acc[pitfall.severity].push(pitfall);
    return acc;
  }, {} as Record<string, Pitfall[]>);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Bug className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-semibold text-foreground">Common Pitfalls & Solutions</h3>
        <div className="flex items-center gap-1 text-xs bg-muted/50 px-2 py-1 rounded-full">
          <TrendingUp className="w-3 h-3" />
          <span>{pitfalls.length} issues to avoid</span>
        </div>
      </div>
      
      {['high', 'medium', 'low'].map(severity => {
        const severityPitfalls = groupedPitfalls[severity];
        if (!severityPitfalls || severityPitfalls.length === 0) return null;
        
        return (
          <div key={severity} className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {getSeverityIcon(severity)} {severity} Priority ({severityPitfalls.length})
            </h4>
            {severityPitfalls.map((pitfall, index) => (
              <Alert key={`${severity}-${index}`} className={`border-l-4 ${getSeverityColor(severity)}`}>
                <AlertTriangle className="w-4 h-4" />
                <div>
                  <AlertTitle className="text-sm font-semibold flex items-center gap-2">
                    {pitfall.title}
                    <span className="text-xs px-2 py-0.5 bg-muted rounded-full capitalize">
                      {pitfall.category}
                    </span>
                  </AlertTitle>
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
      })}
    </div>
  );
};
