export const stackPopularity = {
  frontend: {
    'Next.js': { popularity: 'very-high', trend: 'rising', percentage: 32, description: 'Full-stack React framework with SSR' },
    'React': { popularity: 'very-high', trend: 'stable', percentage: 68, description: 'Most popular frontend library' },
    'Vue.js': { popularity: 'high', trend: 'stable', percentage: 18, description: 'Progressive JavaScript framework' },
    'Angular': { popularity: 'medium', trend: 'declining', percentage: 12, description: 'Enterprise-focused TypeScript framework' },
    'Svelte': { popularity: 'medium', trend: 'rising', percentage: 6, description: 'Compile-time optimized framework' },
    'Nuxt.js': { popularity: 'medium', trend: 'rising', percentage: 8, description: 'Vue.js meta-framework' },
    'Remix': { popularity: 'medium', trend: 'rising', percentage: 4, description: 'Full-stack web framework focused on web standards' },
    'SolidJS': { popularity: 'low', trend: 'rising', percentage: 2, description: 'Fine-grained reactive framework' },
    'HTML/JavaScript': { popularity: 'low', trend: 'declining', percentage: 15, description: 'Vanilla web technologies' },
    'React Native': { popularity: 'high', trend: 'stable', percentage: 14, description: 'Cross-platform mobile development' },
    'Flutter Web': { popularity: 'low', trend: 'rising', percentage: 3, description: 'Google\'s UI toolkit for web' }
  },
  authProvider: {
    'Auth0': { popularity: 'very-high', trend: 'stable', percentage: 28, description: 'Enterprise auth platform with extensive features' },
    'Firebase Auth': { popularity: 'very-high', trend: 'stable', percentage: 35, description: 'Google\'s BaaS authentication solution' },
    'Clerk': { popularity: 'high', trend: 'rising', percentage: 12, description: 'Developer-first authentication with React components' },
    'Supabase Auth': { popularity: 'high', trend: 'rising', percentage: 15, description: 'Open source Firebase alternative' },
    'NextAuth.js': { popularity: 'high', trend: 'stable', percentage: 22, description: 'Authentication library for Next.js' },
    'AWS Cognito': { popularity: 'medium', trend: 'stable', percentage: 18, description: 'AWS managed authentication service' },
    'Custom JWT': { popularity: 'medium', trend: 'declining', percentage: 25, description: 'Roll your own JWT implementation' },
    'Passport.js': { popularity: 'medium', trend: 'declining', percentage: 16, description: 'Node.js authentication middleware' },
    'Okta': { popularity: 'medium', trend: 'stable', percentage: 8, description: 'Enterprise identity and access management' },
    'Azure AD': { popularity: 'medium', trend: 'stable', percentage: 11, description: 'Microsoft\'s identity platform' },
    'Google Identity': { popularity: 'high', trend: 'stable', percentage: 20, description: 'Google\'s identity services' },
    'Magic': { popularity: 'low', trend: 'stable', percentage: 3, description: 'Passwordless authentication via email/SMS' },
    'Stytch': { popularity: 'low', trend: 'rising', percentage: 4, description: 'Passwordless authentication platform' },
    'WorkOS': { popularity: 'medium', trend: 'rising', percentage: 6, description: 'Enterprise-focused authentication APIs' },
    'Keycloak': { popularity: 'medium', trend: 'stable', percentage: 9, description: 'Open source identity management' },
    'FusionAuth': { popularity: 'low', trend: 'rising', percentage: 5, description: 'Customer identity platform' }
  },
  backend: {
    'None (Client-only)': { popularity: 'high', trend: 'rising', percentage: 25, description: 'Client-side only applications' },
    'Next.js API Routes': { popularity: 'very-high', trend: 'rising', percentage: 30, description: 'Serverless API endpoints in Next.js' },
    'Express.js': { popularity: 'very-high', trend: 'stable', percentage: 45, description: 'Popular Node.js web framework' },
    'Node.js': { popularity: 'high', trend: 'stable', percentage: 35, description: 'JavaScript runtime for server-side' },
    'Fastify': { popularity: 'medium', trend: 'rising', percentage: 8, description: 'Fast and efficient Node.js framework' },
    'NestJS': { popularity: 'high', trend: 'rising', percentage: 15, description: 'Scalable Node.js framework with TypeScript' },
    'Django': { popularity: 'high', trend: 'stable', percentage: 12, description: 'High-level Python web framework' },
    'Flask': { popularity: 'medium', trend: 'stable', percentage: 8, description: 'Lightweight Python web framework' },
    'FastAPI': { popularity: 'high', trend: 'rising', percentage: 14, description: 'Modern Python API framework' },
    'Ruby on Rails': { popularity: 'medium', trend: 'declining', percentage: 6, description: 'Full-stack Ruby web framework' },
    'Spring Boot': { popularity: 'high', trend: 'stable', percentage: 18, description: 'Java application framework' },
    'ASP.NET Core': { popularity: 'medium', trend: 'stable', percentage: 10, description: 'Microsoft\'s web framework' },
    'Go Gin': { popularity: 'medium', trend: 'rising', percentage: 7, description: 'Go web framework' },
    'Rust Actix': { popularity: 'low', trend: 'rising', percentage: 3, description: 'High-performance Rust web framework' },
    'Serverless Functions': { popularity: 'high', trend: 'rising', percentage: 22, description: 'Function-as-a-Service architecture' },
    'AWS Lambda': { popularity: 'high', trend: 'stable', percentage: 20, description: 'Amazon\'s serverless compute service' },
    'Vercel Functions': { popularity: 'medium', trend: 'rising', percentage: 12, description: 'Serverless functions on Vercel' },
    'Netlify Functions': { popularity: 'medium', trend: 'stable', percentage: 8, description: 'Serverless functions on Netlify' },
    'Cloudflare Workers': { popularity: 'medium', trend: 'rising', percentage: 9, description: 'Edge computing platform' }
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
