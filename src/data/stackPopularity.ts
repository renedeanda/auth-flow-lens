
export const stackPopularity = {
  frontend: {
    'Next.js': { popularity: 'very-high', trend: 'rising', percentage: 45, description: 'Full-stack React framework' },
    'React': { popularity: 'very-high', trend: 'stable', percentage: 85, description: 'Most popular frontend library' },
    'Vue.js': { popularity: 'high', trend: 'stable', percentage: 25, description: 'Progressive framework' },
    'Angular': { popularity: 'medium', trend: 'declining', percentage: 15, description: 'Enterprise-focused framework' },
    'Svelte': { popularity: 'medium', trend: 'rising', percentage: 8, description: 'Compile-time framework' },
    'Vanilla JS': { popularity: 'low', trend: 'declining', percentage: 5, description: 'Pure JavaScript' }
  },
  authProvider: {
    'Auth0': { popularity: 'very-high', trend: 'stable', percentage: 35, description: 'Enterprise auth platform' },
    'Firebase Auth': { popularity: 'very-high', trend: 'stable', percentage: 40, description: 'Google\'s BaaS solution' },
    'Clerk': { popularity: 'high', trend: 'rising', percentage: 15, description: 'Developer-first auth' },
    'Supabase Auth': { popularity: 'high', trend: 'rising', percentage: 20, description: 'Open source Firebase alternative' },
    'NextAuth.js': { popularity: 'high', trend: 'stable', percentage: 25, description: 'Next.js authentication library' },
    'AWS Cognito': { popularity: 'medium', trend: 'stable', percentage: 12, description: 'AWS managed auth service' },
    'Custom JWT': { popularity: 'medium', trend: 'declining', percentage: 18, description: 'Roll your own solution' },
    'Passport.js': { popularity: 'medium', trend: 'declining', percentage: 10, description: 'Node.js auth middleware' },
    'Okta': { popularity: 'medium', trend: 'stable', percentage: 8, description: 'Enterprise identity platform' },
    'Azure AD': { popularity: 'medium', trend: 'stable', percentage: 7, description: 'Microsoft identity service' }
  },
  backend: {
    'Next.js API Routes': { popularity: 'very-high', trend: 'rising', percentage: 40, description: 'Serverless API endpoints' },
    'Express.js': { popularity: 'very-high', trend: 'stable', percentage: 60, description: 'Node.js web framework' },
    'Fastify': { popularity: 'medium', trend: 'rising', percentage: 12, description: 'Fast Node.js framework' },
    'NestJS': { popularity: 'high', trend: 'rising', percentage: 18, description: 'Enterprise Node.js framework' },
    'Supabase': { popularity: 'high', trend: 'rising', percentage: 15, description: 'Backend-as-a-Service' },
    'Node.js': { popularity: 'high', trend: 'stable', percentage: 45, description: 'JavaScript runtime' }
  }
};

export const getPopularityColor = (popularity: string) => {
  switch (popularity) {
    case 'very-high': return 'text-green-600 dark:text-green-400 font-semibold';
    case 'high': return 'text-blue-600 dark:text-blue-400 font-medium';
    case 'medium': return 'text-yellow-600 dark:text-yellow-400';
    case 'low': return 'text-red-600 dark:text-red-400';
    default: return 'text-gray-600 dark:text-gray-400';
  }
};

export const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'rising': return '📈';
    case 'declining': return '📉';
    case 'stable': return '➡️';
    default: return '';
  }
};

export const getTrendColor = (trend: string) => {
  switch (trend) {
    case 'rising': return 'text-green-500';
    case 'declining': return 'text-red-500';
    case 'stable': return 'text-blue-500';
    default: return 'text-gray-500';
  }
};

// Helper function to get stack recommendation score
export const getStackScore = (frontend: string, authProvider: string, backend: string) => {
  const frontendData = stackPopularity.frontend[frontend as keyof typeof stackPopularity.frontend];
  const authData = stackPopularity.authProvider[authProvider as keyof typeof stackPopularity.authProvider];
  const backendData = stackPopularity.backend[backend as keyof typeof stackPopularity.backend];
  
  if (!frontendData || !authData || !backendData) return 0;
  
  const popularityScore = {
    'very-high': 4,
    'high': 3,
    'medium': 2,
    'low': 1
  };
  
  const trendScore = {
    'rising': 1.2,
    'stable': 1.0,
    'declining': 0.8
  };
  
  const score = (
    (popularityScore[frontendData.popularity as keyof typeof popularityScore] || 0) * (trendScore[frontendData.trend as keyof typeof trendScore] || 1) +
    (popularityScore[authData.popularity as keyof typeof popularityScore] || 0) * (trendScore[authData.trend as keyof typeof trendScore] || 1) +
    (popularityScore[backendData.popularity as keyof typeof popularityScore] || 0) * (trendScore[backendData.trend as keyof typeof trendScore] || 1)
  ) / 3;
  
  return Math.round(score * 10) / 10;
};
