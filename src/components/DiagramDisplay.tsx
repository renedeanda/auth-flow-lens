
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { AuthFlow } from '@/types/auth';
import { DiagramControls } from './DiagramControls';

interface DiagramDisplayProps {
  authFlow: AuthFlow;
}

export const DiagramDisplay: React.FC<DiagramDisplayProps> = ({ authFlow }) => {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/60 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            Authentication Flow
          </CardTitle>
          <DiagramControls authFlow={authFlow} />
        </div>
      </CardHeader>
      <CardContent>
        <div 
          id="diagram-container"
          className="w-full min-h-[500px] bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 p-6 overflow-auto flex items-center justify-center shadow-inner"
        >
          <div className="text-muted-foreground animate-pulse">Loading diagram...</div>
        </div>
      </CardContent>
    </Card>
  );
};
