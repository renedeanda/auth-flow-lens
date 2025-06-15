
export const stackPopularity = {
  frontend: {
    'Next.js': { popularity: 'very-high', trend: 'rising', percentage: 45 },
    'React': { popularity: 'very-high', trend: 'stable', percentage: 85 },
    'Vue.js': { popularity: 'high', trend: 'stable', percentage: 25 },
    'Angular': { popularity: 'medium', trend: 'declining', percentage: 15 },
    'Svelte': { popularity: 'medium', trend: 'rising', percentage: 8 },
    'Vanilla JS': { popularity: 'low', trend: 'declining', percentage: 5 }
  },
  authProvider: {
    'Auth0': { popularity: 'very-high', trend: 'stable', percentage: 35 },
    'Firebase Auth': { popularity: 'very-high', trend: 'stable', percentage: 40 },
    'Clerk': { popularity: 'high', trend: 'rising', percentage: 15 },
    'Supabase Auth': { popularity: 'high', trend: 'rising', percentage: 20 },
    'NextAuth.js': { popularity: 'high', trend: 'stable', percentage: 25 },
    'AWS Cognito': { popularity: 'medium', trend: 'stable', percentage: 12 },
    'Custom JWT': { popularity: 'medium', trend: 'declining', percentage: 18 },
    'Passport.js': { popularity: 'medium', trend: 'declining', percentage: 10 },
    'Okta': { popularity: 'medium', trend: 'stable', percentage: 8 },
    'Azure AD': { popularity: 'medium', trend: 'stable', percentage: 7 }
  },
  backend: {
    'Next.js API Routes': { popularity: 'very-high', trend: 'rising', percentage: 40 },
    'Express.js': { popularity: 'very-high', trend: 'stable', percentage: 60 },
    'Fastify': { popularity: 'medium', trend: 'rising', percentage: 12 },
    'NestJS': { popularity: 'high', trend: 'rising', percentage: 18 },
    'Supabase': { popularity: 'high', trend: 'rising', percentage: 15 },
    'Node.js': { popularity: 'high', trend: 'stable', percentage: 45 }
  }
};

export const getPopularityColor = (popularity: string) => {
  switch (popularity) {
    case 'very-high': return 'text-green-600 dark:text-green-400';
    case 'high': return 'text-blue-600 dark:text-blue-400';
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
