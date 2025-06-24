
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { 
  Palette, 
  Type, 
  Monitor, 
  Smartphone, 
  Square, 
  Sparkles,
  Download,
  Share2,
  Eye,
  RefreshCw,
  X
} from 'lucide-react';

interface GlobalOptionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalOptionsDrawer = ({ isOpen, onClose }: GlobalOptionsDrawerProps) => {
  const [selectedTheme, setSelectedTheme] = useState('modern');
  const [selectedFormat, setSelectedFormat] = useState('horizontal');
  const [colorPalette, setColorPalette] = useState('blue');

  const themes = [
    { id: 'modern', name: 'Moderno', preview: 'bg-gradient-to-br from-blue-500 to-purple-600' },
    { id: 'minimal', name: 'Minimalista', preview: 'bg-gradient-to-br from-gray-400 to-gray-600' },
    { id: 'vibrant', name: 'Vibrante', preview: 'bg-gradient-to-br from-pink-500 to-orange-400' },
    { id: 'corporate', name: 'Corporativo', preview: 'bg-gradient-to-br from-blue-800 to-blue-900' },
    { id: 'creative', name: 'Criativo', preview: 'bg-gradient-to-br from-purple-500 to-pink-500' }
  ];

  const colorPalettes = [
    { id: 'blue', name: 'Azul Oceano', colors: ['#3B82F6', '#1E40AF', '#EFF6FF'] },
    { id: 'purple', name: 'Roxo Real', colors: ['#8B5CF6', '#5B21B6', '#F3E8FF'] },
    { id: 'green', name: 'Verde Natureza', colors: ['#10B981', '#047857', '#ECFDF5'] },
    { id: 'orange', name: 'Laranja Energia', colors: ['#F59E0B', '#D97706', '#FEF3C7'] },
    { id: 'pink', name: 'Rosa Moderno', colors: ['#EC4899', '#BE185D', '#FDF2F8'] }
  ];

  const formats = [
    { id: 'horizontal', name: 'Horizontal (16:9)', icon: Monitor, description: 'YouTube, Desktop' },
    { id: 'vertical', name: 'Vertical (9:16)', icon: Smartphone, description: 'TikTok, Instagram Stories' },
    { id: 'square', name: 'Quadrado (1:1)', icon: Square, description: 'Instagram Post, Facebook' }
  ];

  const typography = [
    { id: 'sans', name: 'Sans Serif', preview: 'Aa', description: 'Limpo e moderno' },
    { id: 'serif', name: 'Serif', preview: 'Aa', description: 'Clássico e elegante' },
    { id: 'display', name: 'Display', preview: 'Aa', description: 'Impactante e criativo' }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[500px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Palette className="w-5 h-5 mr-2 text-video-primary" />
            Opções Globais
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          <Tabs defaultValue="style" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="style">Estilo</TabsTrigger>
              <TabsTrigger value="export">Exportar</TabsTrigger>
            </TabsList>

            {/* Style Tab */}
            <TabsContent value="style" className="space-y-6 mt-6">
              {/* Themes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Temas Visuais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedTheme === theme.id
                          ? 'border-video-primary bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTheme(theme.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded ${theme.preview}`} />
                        <span className="font-medium text-sm">{theme.name}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Color Palette */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Paleta de Cores</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {colorPalettes.map((palette) => (
                    <div
                      key={palette.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        colorPalette === palette.id
                          ? 'border-video-primary bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setColorPalette(palette.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{palette.name}</span>
                        <div className="flex space-x-1">
                          {palette.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Typography */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Type className="w-4 h-4 mr-2" />
                    Tipografia
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {typography.map((font) => (
                    <div
                      key={font.id}
                      className="p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{font.name}</div>
                          <div className="text-xs text-gray-500">{font.description}</div>
                        </div>
                        <div className="text-2xl font-bold text-gray-700">{font.preview}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Format */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Formato de Saída</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {formats.map((format) => (
                    <div
                      key={format.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedFormat === format.id
                          ? 'border-video-primary bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedFormat(format.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <format.icon className="w-5 h-5 text-gray-600" />
                        <div>
                          <div className="font-medium text-sm">{format.name}</div>
                          <div className="text-xs text-gray-500">{format.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Export Tab */}
            <TabsContent value="export" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-video-primary hover:bg-video-primary/90" size="lg">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar Vídeo
                  </Button>
                  
                  <Button variant="outline" className="w-full" size="lg">
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar em Tela Cheia
                  </Button>
                  
                  <Button variant="outline" className="w-full" size="lg">
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    IA Assistente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full ai-suggestion">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Gerar Novas Sugestões
                  </Button>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 mb-2">
                      <Sparkles className="w-4 h-4 inline mr-1" />
                      Dica da IA
                    </p>
                    <p className="text-xs text-blue-700">
                      Considere adicionar uma cena de call-to-action no final do seu vídeo para aumentar o engajamento.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-video-primary">5</div>
                      <div className="text-xs text-gray-600">Cenas</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-video-primary">45s</div>
                      <div className="text-xs text-gray-600">Duração</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default GlobalOptionsDrawer;
