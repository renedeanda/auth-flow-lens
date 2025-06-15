
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { AuthFlow } from '@/types/auth';
import { generateMermaidDiagram } from '@/utils/diagramTemplates';

export const useDiagramGenerator = (authFlow: AuthFlow, actualTheme: 'dark' | 'light') => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: actualTheme === 'dark' ? 'dark' : 'base',
        themeVariables: actualTheme === 'dark' ? {
          primaryColor: '#60A5FA',
          primaryTextColor: '#FFFFFF',
          primaryBorderColor: '#3B82F6',
          lineColor: '#A78BFA',
          secondaryColor: '#374151',
          tertiaryColor: '#1F2937',
          background: '#111827',
          mainBkg: '#374151',
          secondBkg: '#4B5563',
          // High contrast text colors for better readability
          textColor: '#FFFFFF',
          actorTextColor: '#FFFFFF',
          labelTextColor: '#FFFFFF',
          loopTextColor: '#FFFFFF',
          activationTextColor: '#FFFFFF',
          // Note styling with high contrast
          noteBkgColor: '#FEF3C7',
          noteTextColor: '#92400E',
          noteLabelColor: '#92400E',
          // Actor styling with better contrast
          actorBkg: '#4B5563',
          actorBorder: '#9CA3AF',
          actorLineColor: '#A78BFA',
          // Message text styling
          messageLine0: '#FFFFFF',
          messageLine1: '#FFFFFF',
          messageText: '#FFFFFF',
          // Arrow colors
          arrowheadColor: '#A78BFA',
          // Sequence diagram specific
          sequenceNumberColor: '#FFFFFF'
        } : {
          primaryColor: '#3B82F6',
          primaryTextColor: '#1F2937',
          primaryBorderColor: '#2563EB',
          lineColor: '#6366F1',
          secondaryColor: '#EFF6FF',
          tertiaryColor: '#F8FAFC'
        },
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true
        },
        sequence: {
          useMaxWidth: true,
          // Improved spacing and sizing for better readability
          diagramMarginX: 50,
          diagramMarginY: 10,
          actorMargin: 50,
          width: 150,
          height: 65,
          boxMargin: 10,
          boxTextMargin: 5,
          noteMargin: 10,
          messageMargin: 35
        }
      });
      isInitialized.current = true;
    }
  }, [actualTheme]);

  const renderDiagram = async () => {
    const diagramDefinition = generateMermaidDiagram(authFlow);
    
    try {
      const element = document.getElementById('diagram-container');
      if (element) {
        element.innerHTML = '';
        const diagramId = `diagram-${Date.now()}`;
        const { svg } = await mermaid.render(diagramId, diagramDefinition);
        element.innerHTML = svg;
      }
    } catch (error) {
      console.error('Mermaid rendering error:', error);
      const element = document.getElementById('diagram-container');
      if (element) {
        element.innerHTML = '<div class="flex items-center justify-center h-64 text-muted-foreground">Error rendering diagram. Please try a different configuration.</div>';
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      renderDiagram();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [authFlow, actualTheme]);

  return { renderDiagram };
};
