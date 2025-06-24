
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, RefreshCw, Play, Lightbulb } from 'lucide-react';

interface TopicGeneratorProps {
  onGenerateVideo: (topic: string) => void;
}

const TopicGenerator = ({ onGenerateVideo }: TopicGeneratorProps) => {
  const [topic, setTopic] = useState('Como criar um canal no YouTube que cresce rapidamente');
  const [isGenerating, setIsGenerating] = useState(false);

  const suggestedTopics = [
    '10 dicas para produtividade no trabalho remoto',
    'Tutorial: Como fazer exercícios em casa',
    'Receitas rápidas e saudáveis para o dia a dia',
    'História da inteligência artificial',
    'Tendências de tecnologia para 2024',
    'Como começar a investir do zero'
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    // Simular processo de geração
    await new Promise(resolve => setTimeout(resolve, 2000));
    onGenerateVideo(topic);
    setIsGenerating(false);
  };

  const handleTopicSelect = (selectedTopic: string) => {
    setTopic(selectedTopic);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-ai-gradient rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Geração Inteligente de Vídeo</h2>
          </div>
          <p className="text-gray-600 text-lg">
            Digite um tópico ou escolha uma sugestão da IA para criar seu vídeo automaticamente
          </p>
        </div>

        {/* Topic Input */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <span className="font-medium text-gray-700">Tópico sugerido pela IA</span>
            <Badge variant="secondary" className="ai-suggestion">
              <Sparkles className="w-3 h-3 mr-1" />
              IA
            </Badge>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Digite o tópico do seu vídeo..."
              className="flex-1 text-lg py-3 px-4 border-2 border-gray-200 focus:border-video-primary"
            />
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setTopic('Como criar um canal no YouTube que cresce rapidamente')}
                className="shrink-0"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Nova Sugestão
              </Button>
              
              <Button
                onClick={handleGenerate}
                disabled={!topic.trim() || isGenerating}
                className="bg-video-primary hover:bg-video-primary/90 text-white px-8 shrink-0"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Gerar Vídeo
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Suggested Topics */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
            Tópicos Alternativos Sugeridos
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedTopics.map((suggestedTopic, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 bg-white border-2 border-transparent hover:border-video-primary/20"
                onClick={() => handleTopicSelect(suggestedTopic)}
              >
                <CardContent className="p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">{suggestedTopic}</p>
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="outline" className="text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      IA Sugerido
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Usar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicGenerator;
