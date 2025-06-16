
import React, { useState } from 'react';
import { Sparkles, Zap, Shield, Heart } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/components/ThemeProvider';
import { useDiagramGenerator } from '@/hooks/useDiagramGenerator';
import { StackSelector } from '@/components/StackSelector';
import { DiagramDisplay } from '@/components/DiagramDisplay';
import { SEOHead } from '@/components/SEOHead';
import { AuthFlow } from '@/types/auth';

const Index = () => {
  const [authFlow, setAuthFlow] = useState<AuthFlow>({
    frontend: 'Next.js',
    authProvider: 'Auth0',
    backend: 'Next.js API Routes'
  });
  const { actualTheme } = useTheme();

  useDiagramGenerator(authFlow, actualTheme);

  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 transition-colors duration-300">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-green-500/10 to-blue-500/10 animate-pulse delay-1000"></div>
        </div>

        {/* Attribution */}
        <div className="relative bg-gradient-to-r from-pink-500/10 via-red-500/10 to-orange-500/10 border-b border-border/30">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center justify-center">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by{' '}
                <a 
                  href="https://renedeanda.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium transition-colors underline underline-offset-2"
                >
                  René DeAnda
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="relative bg-background/80 backdrop-blur-sm border-b border-border/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="relative p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl opacity-50 animate-pulse" />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Auth Flow Visualizer
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground">Understand your authentication stack in 30 seconds</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">Live Preview</span>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-1 space-y-6">
              <StackSelector authFlow={authFlow} setAuthFlow={setAuthFlow} />
            </div>

            <div className="lg:col-span-2">
              <DiagramDisplay authFlow={authFlow} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative bg-background/80 backdrop-blur-sm border-t border-border/50 mt-12 sm:mt-16">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
            <div className="text-center text-muted-foreground space-y-3 sm:space-y-2">
              <p className="text-base sm:text-lg">Built to help developers understand auth flows quickly</p>
              <p className="text-sm opacity-75">No login required • No cookies • Just helpful visuals</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-muted/30 rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs">Always free</span>
                </div>
                <a
                  href="https://github.com/renedeanda/auth-flow-lens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1 bg-muted/30 rounded-full hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-xs">Open source</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
