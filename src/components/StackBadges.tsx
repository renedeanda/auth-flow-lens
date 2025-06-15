
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { AuthFlow } from '@/types/auth';

interface StackBadgesProps {
  authFlow: AuthFlow;
}

const getDocumentationUrl = (stackItem: string): string | null => {
  const docUrls: Record<string, string> = {
    // Frontend frameworks
    'Next.js': 'https://nextjs.org/docs',
    'React': 'https://react.dev/learn',
    'Vue.js': 'https://vuejs.org/guide/',
    'Angular': 'https://angular.io/docs',
    'Svelte': 'https://svelte.dev/docs',
    'Nuxt.js': 'https://nuxt.com/docs',
    'Remix': 'https://remix.run/docs',
    'SolidJS': 'https://www.solidjs.com/docs',
    'React Native': 'https://reactnative.dev/docs/getting-started',
    'Flutter Web': 'https://docs.flutter.dev/platform-integration/web',
    
    // Auth providers
    'Auth0': 'https://auth0.com/docs',
    'Firebase Auth': 'https://firebase.google.com/docs/auth',
    'Clerk': 'https://clerk.com/docs',
    'Supabase Auth': 'https://supabase.com/docs/guides/auth',
    'AWS Cognito': 'https://docs.aws.amazon.com/cognito/',
    'NextAuth.js': 'https://next-auth.js.org/getting-started/introduction',
    'Passport.js': 'https://www.passportjs.org/docs/',
    'Okta': 'https://developer.okta.com/docs/',
    'Azure AD': 'https://docs.microsoft.com/en-us/azure/active-directory/',
    'Google Identity': 'https://developers.google.com/identity',
    'Magic': 'https://magic.link/docs',
    'Stytch': 'https://stytch.com/docs',
    'WorkOS': 'https://workos.com/docs',
    'Keycloak': 'https://www.keycloak.org/documentation',
    'FusionAuth': 'https://fusionauth.io/docs/',
    
    // Backend technologies
    'Express.js': 'https://expressjs.com/en/starter/installing.html',
    'Node.js': 'https://nodejs.org/en/docs/',
    'Fastify': 'https://fastify.dev/docs/latest/',
    'NestJS': 'https://docs.nestjs.com/',
    'Django': 'https://docs.djangoproject.com/en/stable/',
    'Flask': 'https://flask.palletsprojects.com/en/stable/',
    'FastAPI': 'https://fastapi.tiangolo.com/',
    'Ruby on Rails': 'https://guides.rubyonrails.org/',
    'Spring Boot': 'https://spring.io/projects/spring-boot',
    'ASP.NET Core': 'https://docs.microsoft.com/en-us/aspnet/core/',
    'Go Gin': 'https://gin-gonic.com/docs/',
    'Rust Actix': 'https://actix.rs/docs/',
    'AWS Lambda': 'https://docs.aws.amazon.com/lambda/',
    'Vercel Functions': 'https://vercel.com/docs/functions',
    'Netlify Functions': 'https://docs.netlify.com/functions/overview/',
    'Cloudflare Workers': 'https://developers.cloudflare.com/workers/',
  };
  
  return docUrls[stackItem] || null;
};

export const StackBadges: React.FC<StackBadgesProps> = ({ authFlow }) => {
  const handleBadgeClick = (stackItem: string) => {
    const url = getDocumentationUrl(stackItem);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const renderBadge = (stackItem: string, colorClasses: string) => {
    const url = getDocumentationUrl(stackItem);
    const isClickable = url !== null;
    
    return (
      <Badge 
        key={stackItem}
        variant="secondary" 
        className={`${colorClasses} ${
          isClickable 
            ? 'hover:scale-105 cursor-pointer transition-all duration-200 hover:shadow-md' 
            : 'hover:scale-105'
        } transition-transform flex items-center gap-1.5`}
        onClick={isClickable ? () => handleBadgeClick(stackItem) : undefined}
      >
        {stackItem}
        {isClickable && <ExternalLink className="w-3 h-3 opacity-60" />}
      </Badge>
    );
  };

  return (
    <div className="pt-6 border-t border-border/50 space-y-4">
      <p className="text-sm font-semibold text-foreground">Current Stack:</p>
      
      <div className="flex flex-wrap gap-2">
        {renderBadge(authFlow.frontend, "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300")}
        {renderBadge(authFlow.authProvider, "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300")}
        {renderBadge(authFlow.backend, "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300")}
      </div>
    </div>
  );
};
