export const stackPopularity = {
  frontend: {
    'Next.js': { popularity: 'very-high', trend: 'rising', description: 'Full-stack React framework with SSR' },
    'React': { popularity: 'very-high', trend: 'stable', description: 'Most popular frontend library' },
    'Vue.js': { popularity: 'high', trend: 'stable', description: 'Progressive JavaScript framework' },
    'Angular': { popularity: 'medium', trend: 'declining', description: 'Enterprise-focused TypeScript framework' },
    'Svelte': { popularity: 'medium', trend: 'rising', description: 'Compile-time optimized framework' },
    'Nuxt.js': { popularity: 'medium', trend: 'rising', description: 'Vue.js meta-framework' },
    'Remix': { popularity: 'medium', trend: 'rising', description: 'Full-stack web framework focused on web standards' },
    'SolidJS': { popularity: 'low', trend: 'rising', description: 'Fine-grained reactive framework' },
    'HTML/JavaScript': { popularity: 'very-high', trend: 'stable', description: 'The foundational web technologies' },
    'React Native': { popularity: 'high', trend: 'stable', description: 'Cross-platform mobile development' },
    'Flutter Web': { popularity: 'low', trend: 'rising', description: 'Google\'s UI toolkit for web' }
  },
  authProvider: {
    'Auth0': { popularity: 'very-high', trend: 'stable', description: 'Enterprise auth platform with extensive features' },
    'Firebase Auth': { popularity: 'very-high', trend: 'stable', description: 'Google\'s BaaS authentication solution' },
    'Clerk': { popularity: 'high', trend: 'rising', description: 'Developer-first authentication with React components' },
    'Supabase Auth': { popularity: 'high', trend: 'rising', description: 'Open source Firebase alternative' },
    'NextAuth.js': { popularity: 'high', trend: 'stable', description: 'Authentication library for Next.js' },
    'AWS Cognito': { popularity: 'medium', trend: 'stable', description: 'AWS managed authentication service' },
    'Custom JWT': { popularity: 'medium', trend: 'declining', description: 'Roll your own JWT implementation' },
    'Passport.js': { popularity: 'medium', trend: 'declining', description: 'Node.js authentication middleware' },
    'Okta': { popularity: 'medium', trend: 'stable', description: 'Enterprise identity and access management' },
    'Azure AD': { popularity: 'medium', trend: 'stable', description: 'Microsoft\'s identity platform' },
    'Google Identity': { popularity: 'high', trend: 'stable', description: 'Google\'s identity services' },
    'Magic': { popularity: 'low', trend: 'stable', description: 'Passwordless authentication via email/SMS' },
    'Stytch': { popularity: 'low', trend: 'rising', description: 'Passwordless authentication platform' },
    'WorkOS': { popularity: 'medium', trend: 'rising', description: 'Enterprise-focused authentication APIs' },
    'Keycloak': { popularity: 'medium', trend: 'stable', description: 'Open source identity management' },
    'FusionAuth': { popularity: 'low', trend: 'rising', description: 'Customer identity platform' }
  },
  backend: {
    'None (Client-only)': { popularity: 'high', trend: 'rising', description: 'Client-side only applications' },
    'Next.js API Routes': { popularity: 'very-high', trend: 'rising', description: 'Serverless API endpoints in Next.js' },
    'Express.js': { popularity: 'very-high', trend: 'stable', description: 'Popular Node.js web framework' },
    'Node.js': { popularity: 'high', trend: 'stable', description: 'JavaScript runtime for server-side' },
    'Fastify': { popularity: 'medium', trend: 'rising', description: 'Fast and efficient Node.js framework' },
    'NestJS': { popularity: 'high', trend: 'rising', description: 'Scalable Node.js framework with TypeScript' },
    'Django': { popularity: 'high', trend: 'stable', description: 'High-level Python web framework' },
    'Flask': { popularity: 'medium', trend: 'stable', description: 'Lightweight Python web framework' },
    'FastAPI': { popularity: 'high', trend: 'rising', description: 'Modern Python API framework' },
    'Ruby on Rails': { popularity: 'medium', trend: 'declining', description: 'Full-stack Ruby web framework' },
    'Spring Boot': { popularity: 'high', trend: 'stable', description: 'Java application framework' },
    'ASP.NET Core': { popularity: 'medium', trend: 'stable', description: 'Microsoft\'s web framework' },
    'Go Gin': { popularity: 'medium', trend: 'rising', description: 'Go web framework' },
    'Rust Actix': { popularity: 'low', trend: 'rising', description: 'High-performance Rust web framework' },
    'Serverless Functions': { popularity: 'high', trend: 'rising', description: 'Function-as-a-Service architecture' },
    'AWS Lambda': { popularity: 'high', trend: 'stable', description: 'Amazon\'s serverless compute service' },
    'Vercel Functions': { popularity: 'medium', trend: 'rising', description: 'Serverless functions on Vercel' },
    'Netlify Functions': { popularity: 'medium', trend: 'stable', description: 'Serverless functions on Netlify' },
    'Cloudflare Workers': { popularity: 'medium', trend: 'rising', description: 'Edge computing platform' }
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

export const getPopularityLabel = (popularity: string) => {
  switch (popularity) {
    case 'very-high': return 'Very Popular';
    case 'high': return 'Popular';
    case 'medium': return 'Moderate';
    case 'low': return 'Niche';
    default: return 'Unknown';
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

// Helper function to get stack recommendation
export const getStackRecommendation = (frontend: string, authProvider: string, backend: string) => {
  const frontendData = stackPopularity.frontend[frontend as keyof typeof stackPopularity.frontend];
  const authData = stackPopularity.authProvider[authProvider as keyof typeof stackPopularity.authProvider];
  const backendData = stackPopularity.backend[backend as keyof typeof stackPopularity.backend];
  
  if (!frontendData || !authData || !backendData) return { level: 'unknown', description: 'Unable to evaluate stack' };
  
  const hasVeryHigh = [frontendData.popularity, authData.popularity, backendData.popularity].includes('very-high');
  const hasHigh = [frontendData.popularity, authData.popularity, backendData.popularity].includes('high');
  const hasLow = [frontendData.popularity, authData.popularity, backendData.popularity].includes('low');
  const risingCount = [frontendData.trend, authData.trend, backendData.trend].filter(t => t === 'rising').length;
  const decliningCount = [frontendData.trend, authData.trend, backendData.trend].filter(t => t === 'declining').length;
  
  if (hasVeryHigh && risingCount >= 1) {
    return { level: 'excellent', description: 'Excellent modern stack choice!' };
  } else if (hasVeryHigh || (hasHigh && risingCount >= 2)) {
    return { level: 'great', description: 'Great stack with good community support' };
  } else if (hasHigh || decliningCount === 0) {
    return { level: 'good', description: 'Solid stack choice for most projects' };
  } else if (hasLow && decliningCount >= 2) {
    return { level: 'consider-alternatives', description: 'Consider exploring more popular alternatives' };
  } else {
    return { level: 'okay', description: 'Decent choice, but room for improvement' };
  }
};

export const getRecommendationColor = (level: string) => {
  switch (level) {
    case 'excellent': return 'text-green-600 dark:text-green-400';
    case 'great': return 'text-blue-600 dark:text-blue-400';
    case 'good': return 'text-indigo-600 dark:text-indigo-400';
    case 'okay': return 'text-yellow-600 dark:text-yellow-400';
    case 'consider-alternatives': return 'text-orange-600 dark:text-orange-400';
    default: return 'text-gray-600 dark:text-gray-400';
  }
};
