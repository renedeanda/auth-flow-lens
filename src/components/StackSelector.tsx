
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Shield, Palette, Code2, TrendingUp } from 'lucide-react';
import { AuthFlow } from '@/types/auth';
import { frontendOptions, authProviderOptions, backendOptions } from '@/data/stackOptions';
import { StackBadges } from './StackBadges';
import { stackPopularity, getPopularityColor, getTrendIcon } from '@/data/stackPopularity';

interface StackSelectorProps {
  authFlow: AuthFlow;
  setAuthFlow: React.Dispatch<React.SetStateAction<AuthFlow>>;
}

const PopularityBadge = ({ category, value }: { category: keyof typeof stackPopularity, value: string }) => {
  const categoryData = stackPopularity[category] as Record<string, any>;
  const popularity = categoryData[value];
  
  if (!popularity) return null;

  return (
    <div className="flex items-center gap-1 text-xs">
      <span className={getPopularityColor(popularity.popularity)}>
        {popularity.percentage}%
      </span>
      <span className="text-xs">
        {getTrendIcon(popularity.trend)}
      </span>
    </div>
  );
};

export const StackSelector: React.FC<StackSelectorProps> = ({ authFlow, setAuthFlow }) => {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/60 shadow-xl hover:shadow-2xl transition-all duration-300 group">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg group-hover:scale-110 transition-transform">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            Choose Your Stack
            <div className="flex items-center gap-1 text-xs bg-muted/50 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span>Popularity shown</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-500" />
            Frontend Framework
          </label>
          <Select
            value={authFlow.frontend}
            onValueChange={(value) => setAuthFlow(prev => ({ ...prev, frontend: value }))}
          >
            <SelectTrigger className="bg-background/80 backdrop-blur-sm border-border/60 hover:border-primary/50 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {frontendOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{option.label}</span>
                    <PopularityBadge category="frontend" value={option.value} />
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-500" />
            Auth Provider
          </label>
          <Select
            value={authFlow.authProvider}
            onValueChange={(value) => setAuthFlow(prev => ({ ...prev, authProvider: value }))}
          >
            <SelectTrigger className="bg-background/80 backdrop-blur-sm border-border/60 hover:border-primary/50 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {authProviderOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{option.label}</span>
                    <PopularityBadge category="authProvider" value={option.value} />
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Palette className="w-4 h-4 text-purple-500" />
            Backend
          </label>
          <Select
            value={authFlow.backend}
            onValueChange={(value) => setAuthFlow(prev => ({ ...prev, backend: value }))}
          >
            <SelectTrigger className="bg-background/80 backdrop-blur-sm border-border/60 hover:border-primary/50 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {backendOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{option.label}</span>
                    <PopularityBadge category="backend" value={option.value} />
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <StackBadges authFlow={authFlow} />
      </CardContent>
    </Card>
  );
};
