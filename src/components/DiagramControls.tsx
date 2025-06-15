
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
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

  const downloadDiagram = () => {
    const svg = document.querySelector('#diagram-container svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'auth-flow-diagram.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
    
    toast({
      title: "Download started!",
      description: "Your auth flow diagram is being downloaded.",
    });
  };

  return (
    <div className="flex gap-2">
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
    </div>
  );
};
