
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
  Type, 
  Image, 
  Volume2, 
  Upload, 
  Sparkles, 
  Play, 
  Save,
  X,
  RefreshCw,
  ChevronDown,
  ChevronUp
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

interface InlineSceneEditorProps {
  scene: Scene | null;
  onSave: (scene: Scene) => void;
  onClose: () => void;
}

const InlineSceneEditor = ({ scene, onSave, onClose }: InlineSceneEditorProps) => {
  const [editedScene, setEditedScene] = useState<Scene | null>(null);
  const [duration, setDuration] = useState([5]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Editar Cena {editedScene.id}
          </h3>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Sparkles className="w-3 h-3" />
            <span>IA Assistida</span>
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isCollapsed ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-6">
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
            <TabsContent value="content" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media" className="space-y-6 mt-6">
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
            </TabsContent>

            {/* Audio Tab */}
            <TabsContent value="audio" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Testar Voz
                    </Button>
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

                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Reproduzir
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6 mt-6">
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

          {/* Footer Actions */}
          <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-video-primary hover:bg-video-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InlineSceneEditor;
