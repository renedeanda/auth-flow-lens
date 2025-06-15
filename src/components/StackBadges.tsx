
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AuthFlow } from '@/types/auth';
import { stackPopularity, getStackScore, getTrendIcon, getTrendColor } from '@/data/stackPopularity';

interface StackBadgesProps {
  authFlow: AuthFlow;
}

export const StackBadges: React.FC<StackBadgesProps> = ({ authFlow }) => {
  const stackScore = getStackScore(authFlow.frontend, authFlow.authProvider, authFlow.backend);
  
  const getScoreColor = (score: number) => {
    if (score >= 3.5) return 'text-green-600 dark:text-green-400';
    if (score >= 2.5) return 'text-blue-600 dark:text-blue-400';
    if (score >= 1.5) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 3.5) return 'Excellent choice! Modern, popular stack';
    if (score >= 2.5) return 'Good choice! Solid, reliable stack';
    if (score >= 1.5) return 'Decent choice, consider alternatives';
    return 'Consider more popular alternatives';
  };

  return (
    <div className="pt-6 border-t border-border/50 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">Current Stack:</p>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-muted-foreground">Score:</span>
              <span className={`font-bold ${getScoreColor(stackScore)}`}>
                {stackScore}/4.0
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">{getScoreDescription(stackScore)}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:scale-105 transition-transform cursor-help">
              <div className="flex items-center gap-1">
                {authFlow.frontend}
                <span className={getTrendColor(stackPopularity.frontend[authFlow.frontend as keyof typeof stackPopularity.frontend]?.trend || '')}>
                  {getTrendIcon(stackPopularity.frontend[authFlow.frontend as keyof typeof stackPopularity.frontend]?.trend || '')}
                </span>
              </div>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">
              {stackPopularity.frontend[authFlow.frontend as keyof typeof stackPopularity.frontend]?.description || 'Frontend framework'}
            </p>
            <p className="text-xs text-muted-foreground">
              {stackPopularity.frontend[authFlow.frontend as keyof typeof stackPopularity.frontend]?.percentage}% adoption
            </p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 hover:scale-105 transition-transform cursor-help">
              <div className="flex items-center gap-1">
                {authFlow.authProvider}
                <span className={getTrendColor(stackPopularity.authProvider[authFlow.authProvider as keyof typeof stackPopularity.authProvider]?.trend || '')}>
                  {getTrendIcon(stackPopularity.authProvider[authFlow.authProvider as keyof typeof stackPopularity.authProvider]?.trend || '')}
                </span>
              </div>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">
              {stackPopularity.authProvider[authFlow.authProvider as keyof typeof stackPopularity.authProvider]?.description || 'Authentication provider'}
            </p>
            <p className="text-xs text-muted-foreground">
              {stackPopularity.authProvider[authFlow.authProvider as keyof typeof stackPopularity.authProvider]?.percentage}% adoption
            </p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:scale-105 transition-transform cursor-help">
              <div className="flex items-center gap-1">
                {authFlow.backend}
                <span className={getTrendColor(stackPopularity.backend[authFlow.backend as keyof typeof stackPopularity.backend]?.trend || '')}>
                  {getTrendIcon(stackPopularity.backend[authFlow.backend as keyof typeof stackPopularity.backend]?.trend || '')}
                </span>
              </div>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">
              {stackPopularity.backend[authFlow.backend as keyof typeof stackPopularity.backend]?.description || 'Backend solution'}
            </p>
            <p className="text-xs text-muted-foreground">
              {stackPopularity.backend[authFlow.backend as keyof typeof stackPopularity.backend]?.percentage}% adoption
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="text-xs text-muted-foreground">
        {getScoreDescription(stackScore)}
      </div>
    </div>
  );
};
