
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
        theme: actualTheme === 'dark' ? 'dark' : 'default',
        themeVariables: actualTheme === 'dark' ? {
          // Primary colors with better contrast
          primaryColor: '#3B82F6',
          primaryTextColor: '#FFFFFF',
          primaryBorderColor: '#1D4ED8',
          lineColor: '#60A5FA',
          secondaryColor: '#1F2937',
          tertiaryColor: '#111827',
          
          // Background colors
          background: '#0F172A',
          mainBkg: '#1E293B',
          secondBkg: '#334155',
          
          // Universal text color - white for maximum contrast
          textColor: '#FFFFFF',
          
          // Actor styling
          actorBkg: '#1E293B',
          actorBorder: '#475569',
          actorTextColor: '#FFFFFF',
          actorLineColor: '#60A5FA',
          
          // Message styling
          messageLine0: '#60A5FA',
          messageLine1: '#60A5FA',
          messageText: '#FFFFFF',
          
          // Note styling with high contrast
          noteBkgColor: '#FEF3C7',
          noteTextColor: '#92400E',
          noteLabelColor: '#92400E',
          
          // Sequence diagram elements
          sequenceNumberColor: '#FFFFFF',
          activationBorderColor: '#60A5FA',
          activationBkgColor: '#1E293B',
          
          // Loop and alt styling
          labelBoxBkgColor: '#1E293B',
          labelBoxBorderColor: '#475569',
          labelTextColor: '#FFFFFF',
          loopTextColor: '#FFFFFF',
          
          // Arrow styling
          arrowheadColor: '#60A5FA',
          
          // Class diagram colors
          classText: '#FFFFFF',
          
          // Flowchart colors
          nodeBkg: '#1E293B',
          nodeBorder: '#475569',
          clusterBkg: '#0F172A',
          clusterBorder: '#334155',
          defaultLinkColor: '#60A5FA',
          titleColor: '#FFFFFF',
          
          // Additional text elements
          edgeLabelBackground: '#1E293B',
          
          // Grid and section colors
          gridColor: '#334155',
          section0: '#1E293B',
          section1: '#0F172A',
          section2: '#1E293B',
          section3: '#0F172A',
          
          // Alternative and optional colors
          altTextColor: '#FFFFFF',
          optTextColor: '#FFFFFF'
        } : {
          // Light theme with improved contrast
          primaryColor: '#2563EB',
          primaryTextColor: '#1F2937',
          primaryBorderColor: '#1D4ED8',
          lineColor: '#3B82F6',
          secondaryColor: '#F1F5F9',
          tertiaryColor: '#FFFFFF',
          
          // Background colors
          background: '#FFFFFF',
          mainBkg: '#F8FAFC',
          secondBkg: '#F1F5F9',
          
          // Text colors
          textColor: '#1F2937',
          
          // Actor styling
          actorBkg: '#F8FAFC',
          actorBorder: '#CBD5E1',
          actorTextColor: '#1F2937',
          actorLineColor: '#3B82F6',
          
          // Message styling
          messageLine0: '#3B82F6',
          messageLine1: '#3B82F6',
          messageText: '#1F2937',
          
          // Note styling
          noteBkgColor: '#FEF3C7',
          noteTextColor: '#92400E',
          noteLabelColor: '#92400E',
          
          // Sequence diagram elements
          sequenceNumberColor: '#1F2937',
          activationBorderColor: '#3B82F6',
          activationBkgColor: '#EFF6FF',
          
          // Loop and alt styling
          labelBoxBkgColor: '#F1F5F9',
          labelBoxBorderColor: '#CBD5E1',
          labelTextColor: '#1F2937',
          loopTextColor: '#1F2937',
          
          // Arrow styling
          arrowheadColor: '#3B82F6',
          
          // Class diagram colors
          classText: '#1F2937',
          
          // Flowchart colors
          nodeBkg: '#F8FAFC',
          nodeBorder: '#CBD5E1',
          clusterBkg: '#FFFFFF',
          clusterBorder: '#E2E8F0',
          defaultLinkColor: '#3B82F6',
          titleColor: '#1F2937',
          
          // Additional elements
          edgeLabelBackground: '#FFFFFF',
          
          // Grid and section colors
          gridColor: '#E2E8F0',
          section0: '#F8FAFC',
          section1: '#FFFFFF',
          section2: '#F8FAFC',
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
          useMaxWidth: true,
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
          useMaxWidth: true,
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
