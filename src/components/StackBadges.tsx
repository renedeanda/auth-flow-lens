
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AuthFlow } from '@/types/auth';

interface StackBadgesProps {
  authFlow: AuthFlow;
}

export const StackBadges: React.FC<StackBadgesProps> = ({ authFlow }) => {
  return (
    <div className="pt-6 border-t border-border/50">
      <p className="text-sm font-semibold text-foreground mb-4">Current Stack:</p>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:scale-105 transition-transform">
          {authFlow.frontend}
        </Badge>
        <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 hover:scale-105 transition-transform">
          {authFlow.authProvider}
        </Badge>
        <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:scale-105 transition-transform">
          {authFlow.backend}
        </Badge>
      </div>
    </div>
  );
};
