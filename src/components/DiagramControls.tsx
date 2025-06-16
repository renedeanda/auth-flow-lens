
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AuthFlow } from '@/types/auth';
import { generateMermaidDiagram } from '@/utils/diagramTemplates';

interface DiagramControlsProps {
  authFlow: AuthFlow;
}

export const DiagramControls: React.FC<DiagramControlsProps> = ({ authFlow }) => {
  const { toast } = useToast();

  const copyDiagramCode = () => {
    const diagramCode = generateMermaidDiagram(authFlow);
    navigator.clipboard.writeText(diagramCode);
    toast({
      title: "Copied to clipboard!",
      description: "Mermaid diagram code copied successfully.",
    });
  };

  const downloadDiagram = async () => {
    try {
      const svg = document.querySelector('#diagram-container svg') as SVGElement;
      if (!svg) {
        toast({
          title: "Error",
          description: "No diagram found to download.",
          variant: "destructive"
        });
        return;
      }

      // Get SVG dimensions and device pixel ratio for high-resolution rendering
      const svgRect = svg.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      const scale = Math.max(pixelRatio, 2); // Ensure at least 2x scaling for crisp images
      
      const svgData = new XMLSerializer().serializeToString(svg);
      
      // Create high-resolution canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      // Set canvas size with high-resolution scaling
      const width = svgRect.width || 800;
      const height = svgRect.height || 600;
      
      canvas.width = width * scale;
      canvas.height = height * scale;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      img.onload = () => {
        if (ctx) {
          // Scale the context for high-resolution rendering
          ctx.scale(scale, scale);
          
          // Fill background with white
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, width, height);
          
          // Draw the SVG with high quality
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to PNG with high quality
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const downloadLink = document.createElement('a');
              downloadLink.download = `auth-flow-${authFlow.frontend}-${authFlow.authProvider}.png`;
              downloadLink.href = url;
              downloadLink.click();
              URL.revokeObjectURL(url);
              
              toast({
                title: "Download complete!",
                description: "Your auth flow diagram has been downloaded.",
              });
            }
          }, 'image/png', 1.0); // Maximum quality
        }
      };
      
      img.onerror = () => {
        toast({
          title: "Download failed",
          description: "Could not generate PNG from diagram.",
          variant: "destructive"
        });
      };
      
      // Create blob URL for SVG with proper encoding
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      img.src = svgUrl;
      
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download failed",
        description: "An error occurred while downloading the diagram.",
        variant: "destructive"
      });
    }
  };

  const shareConfiguration = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('frontend', authFlow.frontend);
    currentUrl.searchParams.set('auth', authFlow.authProvider);
    currentUrl.searchParams.set('backend', authFlow.backend);
    
    navigator.clipboard.writeText(currentUrl.toString());
    toast({
      title: "Link copied!",
      description: "Shareable configuration link copied to clipboard.",
    });
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={copyDiagramCode}
        className="hover:bg-primary/10 hover:border-primary/50 transition-all group"
      >
        <Copy className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
        Copy Code
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={downloadDiagram}
        className="hover:bg-primary/10 hover:border-primary/50 transition-all group"
      >
        <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
        Download PNG
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={shareConfiguration}
        className="hover:bg-primary/10 hover:border-primary/50 transition-all group"
      >
        <Share2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
        Share Config
      </Button>
    </div>
  );
};
