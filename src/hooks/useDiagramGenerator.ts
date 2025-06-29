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
        theme: 'default',
        themeVariables: {
          // Primary colors - sky blue for main boxes
          primaryColor: '#87CEEB',
          primaryTextColor: '#1F2937',
          primaryBorderColor: '#0EA5E9',
          lineColor: '#0EA5E9',
          secondaryColor: '#FFFFFF',
          tertiaryColor: '#FFFFFF',
          
          // Background colors - white
          background: '#FFFFFF',
          mainBkg: '#FFFFFF',
          secondBkg: '#FFFFFF',
          
          // Text colors
          textColor: '#1F2937',
          
          // Actor styling - sky blue background with dark text
          actorBkg: '#87CEEB',
          actorBorder: '#0EA5E9',
          actorTextColor: '#1F2937',
          actorLineColor: '#0EA5E9',
          
          // Message styling
          messageLine0: '#0EA5E9',
          messageLine1: '#0EA5E9',
          messageText: '#1F2937',
          
          // Note styling - keep yellow
          noteBkgColor: '#FEF3C7',
          noteTextColor: '#92400E',
          noteBorderColor: '#F59E0B',
          
          // Sequence diagram elements
          sequenceNumberColor: '#1F2937',
          activationBorderColor: '#0EA5E9',
          activationBkgColor: '#F0F9FF',
          
          // Loop and alt styling
          labelBoxBkgColor: '#FFFFFF',
          labelBoxBorderColor: '#CBD5E1',
          labelTextColor: '#1F2937',
          loopTextColor: '#1F2937',
          
          // Arrow styling
          arrowheadColor: '#0EA5E9',
          
          // Class diagram colors
          classText: '#1F2937',
          
          // Flowchart colors - white backgrounds
          nodeBkg: '#FFFFFF',
          nodeBorder: '#CBD5E1',
          clusterBkg: '#FFFFFF',
          clusterBorder: '#E2E8F0',
          defaultLinkColor: '#0EA5E9',
          titleColor: '#1F2937',
          
          // Additional elements
          edgeLabelBackground: '#FFFFFF',
          
          // Grid and section colors
          gridColor: '#E2E8F0',
          section0: '#FFFFFF',
          section1: '#FFFFFF',
          section2: '#FFFFFF',
          section3: '#FFFFFF',
          
          // Alternative and optional colors
          altTextColor: '#1F2937',
          optTextColor: '#1F2937'
        },
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          curve: 'basis'
        },
        sequence: {
          diagramMarginX: 50,
          diagramMarginY: 20,
          actorMargin: 50,
          width: 150,
          height: 65,
          boxMargin: 10,
          boxTextMargin: 5,
          noteMargin: 10,
          messageMargin: 35,
          mirrorActors: true,
          bottomMarginAdj: 1,
          rightAngles: false,
          showSequenceNumbers: false
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
