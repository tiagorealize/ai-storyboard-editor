import { useState } from 'react';
import Header from '@/components/Header';
import VideoPlayer from '@/components/VideoPlayer';
import Timeline from '@/components/Timeline';
import SceneEditor from '@/components/SceneEditor';
import GlobalOptionsDrawer from '@/components/GlobalOptionsDrawer';
import { Button } from '@/components/ui/button';
import { Video, Sparkles } from 'lucide-react';

// Mock data for scenes
const initialScenes = [
  {
    id: 1,
    title: 'Introdução: O que é um canal de YouTube?',
    duration: 8,
    thumbnail: '',
    text: 'Bem-vindos ao nosso guia completo sobre como criar um canal no YouTube que realmente cresce. Hoje vamos aprender as estratégias essenciais para o sucesso.',
    hasAudio: true,
    hasImage: true,
    narrationText: 'Olá pessoal! Hoje vou compartilhar com vocês as estratégias que realmente funcionam para fazer um canal crescer rapidamente no YouTube.',
    voiceType: 'female-energetic',
    backgroundMusic: 'upbeat'
  },
  {
    id: 2,
    title: 'Passo 1: Escolhendo seu nicho',
    duration: 12,
    thumbnail: '',
    text: 'O primeiro passo é escolher um nicho específico. Canais focados em um tema específico tendem a crescer mais rápido do que canais generalistas.',
    hasAudio: true,
    hasImage: true,
    narrationText: 'A primeira regra de ouro é: seja específico! Canais que falam sobre tudo não falam sobre nada.',
    voiceType: 'female-energetic',
    backgroundMusic: 'corporate',
    isRendering: true
  },
  {
    id: 3,
    title: 'Passo 2: Criando conteúdo de qualidade',
    duration: 15,
    thumbnail: '',
    text: 'Qualidade sempre vence quantidade. É melhor fazer um vídeo excelente por semana do que três vídeos mediocres.',
    hasAudio: true,
    hasImage: true,
    narrationText: 'Lembrem-se: o algoritmo do YouTube premia conteúdo que mantém as pessoas assistindo. Foquem na qualidade!',
    voiceType: 'female-energetic',
    backgroundMusic: 'cinematic'
  },
  {
    id: 4,
    title: 'Passo 3: SEO e otimização',
    duration: 10,
    thumbnail: '',
    text: 'Use palavras-chave relevantes no título, descrição e tags. Isso ajuda o YouTube a entender sobre o que é seu vídeo.',
    hasAudio: true,
    hasImage: true,
    narrationText: 'O SEO no YouTube é fundamental. Pesquisem palavras-chave antes de criar seus vídeos!',
    voiceType: 'female-energetic',
    backgroundMusic: 'corporate',
    isRendering: true
  },
  {
    id: 5,
    title: 'Conclusão: Consistência é a chave',
    duration: 8,
    thumbnail: '',
    text: 'Seja consistente, interaja com sua audiência e nunca desista. O crescimento leva tempo, mas com dedicação, você chegará lá!',
    hasAudio: true,
    hasImage: true,
    narrationText: 'E lembrem-se: o sucesso no YouTube não acontece da noite para o dia. Sejam consistentes e pacientes!',
    voiceType: 'female-energetic',
    backgroundMusic: 'upbeat'
  }
];

const Index = () => {
  const [scenes, setScenes] = useState(initialScenes);
  const [currentScene, setCurrentScene] = useState(0);
  const [editingScene, setEditingScene] = useState<any>(null);
  const [isSceneEditorOpen, setIsSceneEditorOpen] = useState(false);
  const [isGlobalOptionsOpen, setIsGlobalOptionsOpen] = useState(false);

  const handleSceneEdit = (scene: any) => {
    setEditingScene(scene);
    setIsSceneEditorOpen(true);
  };

  const handleSceneSave = (updatedScene: any) => {
    setScenes(scenes.map(scene => 
      scene.id === updatedScene.id ? updatedScene : scene
    ));
  };

  const handleSceneDelete = (sceneId: number) => {
    setScenes(scenes.filter(scene => scene.id !== sceneId));
    if (currentScene >= scenes.length - 1) {
      setCurrentScene(Math.max(0, scenes.length - 2));
    }
  };

  const handleAddScene = () => {
    const newScene = {
      id: Math.max(...scenes.map(s => s.id)) + 1,
      title: 'Nova Cena',
      duration: 5,
      thumbnail: '',
      text: 'Texto da nova cena...',
      hasAudio: true,
      hasImage: false,
      narrationText: 'Narração da nova cena...',
      voiceType: 'female-casual',
      backgroundMusic: 'calm'
    };
    setScenes([...scenes, newScene]);
  };

  const handleGenerateVideo = () => {
    console.log('Generating final video...');
    // TODO: Implement video generation logic
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onOpenGlobalOptions={() => setIsGlobalOptionsOpen(true)} />
      
      {/* Main Content - Fixed Width */}
      <main className="flex-1 flex justify-center p-6 overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-[1000px] space-y-6">
          {/* Video Player */}
          <VideoPlayer
            currentScene={currentScene}
            totalScenes={scenes.length}
            onSceneChange={setCurrentScene}
          />

          {/* Timeline */}
          <Timeline
            scenes={scenes}
            currentScene={currentScene}
            onSceneSelect={setCurrentScene}
            onSceneEdit={handleSceneEdit}
            onSceneDelete={handleSceneDelete}
            onAddScene={handleAddScene}
          />

          {/* Generate Video Button */}
          <div className="flex justify-center pt-8 pb-6">
            <Button
              onClick={handleGenerateVideo}
              size="lg"
              className="bg-video-gradient hover:opacity-90 text-white px-12 py-4 h-auto text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Gerar Vídeo Final
              <Video className="w-6 h-6 ml-3" />
            </Button>
          </div>
        </div>
      </main>

      {/* Global Options Drawer */}
      <GlobalOptionsDrawer 
        isOpen={isGlobalOptionsOpen}
        onClose={() => setIsGlobalOptionsOpen(false)}
      />

      {/* Scene Editor Modal */}
      <SceneEditor
        scene={editingScene}
        isOpen={isSceneEditorOpen}
        onClose={() => {
          setIsSceneEditorOpen(false);
          setEditingScene(null);
        }}
        onSave={handleSceneSave}
      />
    </div>
  );
};

export default Index;
