
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { AuthFlow } from '@/types/auth';
import { DiagramControls } from './DiagramControls';
import { SecurityAnnotations } from './SecurityAnnotations';
import { CommonPitfalls } from './CommonPitfalls';

interface DiagramDisplayProps {
  authFlow: AuthFlow;
}

export const DiagramDisplay: React.FC<DiagramDisplayProps> = ({ authFlow }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-card/80 backdrop-blur-sm border-border/60 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="pb-3 sm:pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              Authentication Flow
            </CardTitle>
            <DiagramControls authFlow={authFlow} />
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div 
            id="diagram-container"
            className="w-full min-h-[400px] sm:min-h-[500px] bg-white rounded-xl border border-border/50 p-3 sm:p-6 overflow-auto flex items-center justify-center shadow-inner"
          >
            <div className="text-muted-foreground animate-pulse">Loading diagram...</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card/80 backdrop-blur-sm border-border/60 shadow-xl">
        <CardContent className="p-4 sm:p-6">
          <CommonPitfalls authFlow={authFlow} />
          <SecurityAnnotations authFlow={authFlow} />
        </CardContent>
      </Card>
    </div>
  );
};
