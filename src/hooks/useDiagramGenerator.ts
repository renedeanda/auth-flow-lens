
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
          primaryTextColor: '#F8FAFC',
          primaryBorderColor: '#2563EB',
          lineColor: '#6366F1',
          secondaryColor: '#1E293B',
          tertiaryColor: '#0F172A',
          background: '#0F172A',
          mainBkg: '#1E293B',
          secondBkg: '#334155'
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
