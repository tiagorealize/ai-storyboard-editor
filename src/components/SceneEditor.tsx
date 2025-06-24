
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Type, 
  Image, 
  Volume2, 
  Upload, 
  Sparkles, 
  Play, 
  Save,
  X,
  RefreshCw 
} from 'lucide-react';

interface Scene {
  id: number;
  title: string;
  duration: number;
  thumbnail: string;
  text: string;
  hasAudio: boolean;
  hasImage: boolean;
  narrationText?: string;
  voiceType?: string;
  backgroundMusic?: string;
  imageUrl?: string;
}

interface SceneEditorProps {
  scene: Scene | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (scene: Scene) => void;
}

const SceneEditor = ({ scene, isOpen, onClose, onSave }: SceneEditorProps) => {
  const [editedScene, setEditedScene] = useState<Scene | null>(null);
  const [duration, setDuration] = useState([5]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (scene) {
      setEditedScene({ ...scene });
      setDuration([scene.duration]);
    }
  }, [scene]);

  if (!editedScene) return null;

  const handleSave = () => {
    onSave({ ...editedScene, duration: duration[0] });
    onClose();
  };

  const handleAIImprove = async (field: string) => {
    setIsGenerating(true);
    // Simular geração de IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (field === 'text') {
      setEditedScene({
        ...editedScene,
        text: 'Texto melhorado pela IA: ' + editedScene.text
      });
    } else if (field === 'narration') {
      setEditedScene({
        ...editedScene,
        narrationText: 'Narração otimizada pela IA: ' + (editedScene.narrationText || editedScene.text)
      });
    }
    
    setIsGenerating(false);
  };

  const voiceOptions = [
    { value: 'female-casual', label: 'Feminina Casual' },
    { value: 'male-professional', label: 'Masculina Profissional' },
    { value: 'female-energetic', label: 'Feminina Energética' },
    { value: 'male-calm', label: 'Masculina Calma' }
  ];

  const musicOptions = [
    { value: 'upbeat', label: 'Animada' },
    { value: 'calm', label: 'Calma' },
    { value: 'corporate', label: 'Corporativa' },
    { value: 'cinematic', label: 'Cinematográfica' },
    { value: 'none', label: 'Sem música' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Editar Cena {editedScene.id}</span>
            <Badge variant="outline">
              <Sparkles className="w-3 h-3 mr-1" />
              IA Assistida
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content" className="flex items-center space-x-1">
              <Type className="w-4 h-4" />
              <span>Conteúdo</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center space-x-1">
              <Image className="w-4 h-4" />
              <span>Mídia</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center space-x-1">
              <Volume2 className="w-4 h-4" />
              <span>Áudio</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-1">
              <Type className="w-4 h-4" />
              <span>Configurações</span>
            </TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Texto da Cena</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Título da Cena</Label>
                  <Input
                    id="title"
                    value={editedScene.title}
                    onChange={(e) => setEditedScene({ ...editedScene, title: e.target.value })}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="text">Texto Principal</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAIImprove('text')}
                      disabled={isGenerating}
                      className="ai-suggestion"
                    >
                      {isGenerating ? (
                        <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                      ) : (
                        <Sparkles className="w-3 h-3 mr-1" />
                      )}
                      Melhorar com IA
                    </Button>
                  </div>
                  <Textarea
                    id="text"
                    value={editedScene.text}
                    onChange={(e) => setEditedScene({ ...editedScene, text: e.target.value })}
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Imagem de Fundo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <Image className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Faça upload de uma imagem ou gere uma com IA
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                        <Button variant="outline" size="sm" className="ai-suggestion">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Gerar com IA
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audio Tab */}
          <TabsContent value="audio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Narração</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="narration">Texto da Narração</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAIImprove('narration')}
                      disabled={isGenerating}
                      className="ai-suggestion"
                    >
                      {isGenerating ? (
                        <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                      ) : (
                        <Sparkles className="w-3 h-3 mr-1" />
                      )}
                      Otimizar IA
                    </Button>
                  </div>
                  <Textarea
                    id="narration"
                    value={editedScene.narrationText || editedScene.text}
                    onChange={(e) => setEditedScene({ ...editedScene, narrationText: e.target.value })}
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Tipo de Voz</Label>
                  <Select 
                    value={editedScene.voiceType || 'female-casual'}
                    onValueChange={(value) => setEditedScene({ ...editedScene, voiceType: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 z-50">
                      {voiceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Testar Voz
                  </Button>
                </div>
            </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trilha Sonora</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Música de Fundo</Label>
                  <Select 
                    value={editedScene.backgroundMusic || 'upbeat'}
                    onValueChange={(value) => setEditedScene({ ...editedScene, backgroundMusic: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 z-50">
                      {musicOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Reproduzir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Configurações da Cena</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Duração da Cena</Label>
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={duration}
                      onValueChange={setDuration}
                      max={30}
                      min={3}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>3s</span>
                      <span className="font-medium">{duration[0]}s</span>
                      <span>30s</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-video-primary hover:bg-video-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SceneEditor;
