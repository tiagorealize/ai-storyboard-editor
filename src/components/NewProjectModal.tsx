
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Sparkles, FileText, Loader2 } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (projectData: { title: string; html: string; scenes: any[] }) => void;
}

const NewProjectModal = ({ isOpen, onClose, onCreateProject }: NewProjectModalProps) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const extractScenesFromHTML = (html: string) => {
    // Simula análise de HTML para identificar cenas
    // Em uma implementação real, isso seria feito por IA
    const scenes = [];
    
    // Procura por elementos com texto significativo
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Pega títulos (h1, h2, h3)
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading, index) => {
      const nextElements = [];
      let nextSibling = heading.nextElementSibling;
      
      // Coleta parágrafos seguintes até o próximo título
      while (nextSibling && !nextSibling.matches('h1, h2, h3, h4, h5, h6')) {
        if (nextSibling.tagName === 'P') {
          nextElements.push(nextSibling.textContent);
        }
        nextSibling = nextSibling.nextElementSibling;
      }
      
      const text = nextElements.join(' ').trim();
      if (text.length > 20) {
        scenes.push({
          id: index + 1,
          title: heading.textContent?.trim() || `Cena ${index + 1}`,
          duration: Math.max(5, Math.min(15, Math.ceil(text.length / 20))),
          thumbnail: '',
          text: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
          hasAudio: true,
          hasImage: false,
          narrationText: text.substring(0, 150) + (text.length > 150 ? '...' : ''),
          voiceType: 'female-casual',
          backgroundMusic: 'calm'
        });
      }
    });

    // Se não encontrou títulos, tenta dividir por parágrafos
    if (scenes.length === 0) {
      const paragraphs = doc.querySelectorAll('p');
      paragraphs.forEach((p, index) => {
        const text = p.textContent?.trim() || '';
        if (text.length > 50) {
          scenes.push({
            id: index + 1,
            title: `Cena ${index + 1}`,
            duration: Math.max(5, Math.min(15, Math.ceil(text.length / 20))),
            thumbnail: '',
            text: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
            hasAudio: true,
            hasImage: false,
            narrationText: text.substring(0, 150) + (text.length > 150 ? '...' : ''),
            voiceType: 'female-casual',
            backgroundMusic: 'calm'
          });
        }
      });
    }

    return scenes.slice(0, 10); // Limita a 10 cenas
  };

  const handleAnalyzeHTML = async () => {
    if (!htmlContent.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simula delay de análise
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const scenes = extractScenesFromHTML(htmlContent);
    setIsAnalyzing(false);
    
    if (scenes.length > 0) {
      onCreateProject({
        title: projectTitle || 'Novo Projeto',
        html: htmlContent,
        scenes
      });
    } else {
      alert('Não foi possível identificar cenas no HTML fornecido. Tente um HTML com títulos e parágrafos.');
    }
  };

  const handleClose = () => {
    setProjectTitle('');
    setHtmlContent('');
    setIsAnalyzing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-video-primary" />
            <span>Criar Novo Projeto</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Título do Projeto */}
          <div className="space-y-2">
            <Label htmlFor="project-title">Título do Projeto</Label>
            <Input
              id="project-title"
              placeholder="Digite o título do seu projeto..."
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
          </div>

          {/* HTML Content */}
          <div className="space-y-2">
            <Label htmlFor="html-content" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Conteúdo HTML</span>
            </Label>
            <Textarea
              id="html-content"
              placeholder="Cole aqui o HTML do seu conteúdo. A IA irá analisar e identificar possíveis cenas automaticamente..."
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
            <p className="text-xs text-gray-500">
              Dica: Use HTML com títulos (h1, h2, h3) e parágrafos (p) para melhores resultados na identificação de cenas.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={handleClose} disabled={isAnalyzing}>
              Cancelar
            </Button>
            <Button 
              onClick={handleAnalyzeHTML}
              disabled={!htmlContent.trim() || isAnalyzing}
              className="bg-video-primary hover:bg-video-primary/90"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analisando HTML...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Identificar Cenas
                </>
              )}
            </Button>
          </div>

          {isAnalyzing && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                <div>
                  <p className="text-blue-800 font-medium">Analisando seu conteúdo...</p>
                  <p className="text-blue-600 text-sm">A IA está identificando possíveis cenas no HTML fornecido.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectModal;
