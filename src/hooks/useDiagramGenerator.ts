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
          primaryColor: '#3B82F6',
          primaryTextColor: '#F1F5F9',
          primaryBorderColor: '#2563EB',
          lineColor: '#8B5CF6',
          secondaryColor: '#1E293B',
          tertiaryColor: '#0F172A',
          background: '#0F172A',
          mainBkg: '#1E293B',
          secondBkg: '#334155',
          // Improved text colors for better contrast
          textColor: '#F1F5F9',
          actorTextColor: '#F1F5F9',
          labelTextColor: '#F1F5F9',
          loopTextColor: '#F1F5F9',
          activationTextColor: '#F1F5F9',
          // Note backgrounds for better readability
          noteBkgColor: '#FCD34D',
          noteTextColor: '#1F2937',
          // Actor colors
          actorBkg: '#1E293B',
          actorBorder: '#475569',
          actorLineColor: '#8B5CF6'
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
