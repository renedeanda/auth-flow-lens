
import { AuthFlow } from '@/types/auth';
import { generateAuth0Diagram } from './templates/auth0Template';
import { generateGoogleDiagram } from './templates/googleTemplate';
import { generateNextAuthDiagram } from './templates/nextAuthTemplate';
import { generateFirebaseDiagram } from './templates/firebaseTemplate';
import { generateClerkDiagram } from './templates/clerkTemplate';
import { generateSupabaseDiagram } from './templates/supabaseTemplate';
import { generateCognitoDiagram } from './templates/cognitoTemplate';
import { generatePassportDiagram } from './templates/passportTemplate';
import { generateCustomJwtDiagram } from './templates/customJwtTemplate';
import { generateGenericDiagram } from './templates/genericTemplate';

export const generateMermaidDiagram = (flow: AuthFlow): string => {
  const { frontend, authProvider, backend } = flow;
  
  switch (authProvider) {
    case 'Auth0':
      return generateAuth0Diagram(frontend, backend);
    case 'Google Identity':
      return generateGoogleDiagram(frontend, backend);
    case 'NextAuth.js':
      return generateNextAuthDiagram(frontend, backend);
    case 'Firebase Auth':
      return generateFirebaseDiagram(frontend, backend);
    case 'Clerk':
      return generateClerkDiagram(frontend, backend);
    case 'Supabase Auth':
      return generateSupabaseDiagram(frontend, backend);
    case 'AWS Cognito':
      return generateCognitoDiagram(frontend, backend);
    case 'Passport.js':
      return generatePassportDiagram(frontend, backend);
    case 'Custom JWT':
      return generateCustomJwtDiagram(frontend, backend);
    default:
      return generateGenericDiagram(frontend, authProvider, backend);
  }
};
