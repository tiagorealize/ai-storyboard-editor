
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit3, Trash2, Plus, Clock, Image, Volume2, Type, Sparkles } from 'lucide-react';

interface Scene {
  id: number;
  title: string;
  duration: number;
  thumbnail: string;
  text: string;
  hasAudio: boolean;
  hasImage: boolean;
}

interface TimelineProps {
  scenes: Scene[];
  currentScene: number;
  onSceneSelect: (index: number) => void;
  onSceneEdit: (scene: Scene) => void;
  onSceneDelete: (id: number) => void;
  onAddScene: () => void;
}

const Timeline = ({ 
  scenes, 
  currentScene, 
  onSceneSelect, 
  onSceneEdit, 
  onSceneDelete, 
  onAddScene 
}: TimelineProps) => {
  const [draggedScene, setDraggedScene] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedScene(index);
  };

  const handleDragEnd = () => {
    setDraggedScene(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const formatDuration = (seconds: number) => {
    return `${seconds}s`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-video-primary" />
          Timeline de Cenas
        </h3>
        <Button onClick={onAddScene} size="sm" className="bg-video-primary hover:bg-video-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Nova Cena
        </Button>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Timeline Track */}
        <div className="overflow-x-auto custom-scrollbar">
          <div className="flex space-x-4 pb-4 min-w-max">
            {scenes.map((scene, index) => (
              <Card
                key={scene.id}
                className={`timeline-scene cursor-pointer shrink-0 w-64 transition-all duration-300 ${
                  currentScene === index
                    ? 'ring-2 ring-video-primary shadow-lg'
                    : 'hover:shadow-md border-gray-200'
                } ${draggedScene === index ? 'dragging' : ''}`}
                onClick={() => onSceneSelect(index)}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
              >
                <CardContent className="p-4">
                  {/* Scene Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        Cena {index + 1}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {formatDuration(scene.duration)}
                      </Badge>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSceneEdit(scene);
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSceneDelete(scene.id);
                        }}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <div className="relative bg-gray-100 rounded-lg aspect-video mb-3 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <Image className="w-8 h-8 text-gray-400" />
                    </div>
                    {currentScene === index && (
                      <div className="absolute inset-0 bg-video-primary/10 flex items-center justify-center">
                        <div className="w-8 h-8 bg-video-primary rounded-full flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Scene Info */}
                  <h4 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2">
                    {scene.title}
                  </h4>
                  
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {scene.text}
                  </p>

                  {/* Media Indicators */}
                  <div className="flex items-center space-x-2">
                    {scene.hasImage && (
                      <Badge variant="outline" className="text-xs">
                        <Image className="w-3 h-3 mr-1" />
                        Imagem
                      </Badge>
                    )}
                    {scene.hasAudio && (
                      <Badge variant="outline" className="text-xs">
                        <Volume2 className="w-3 h-3 mr-1" />
                        Áudio
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      <Type className="w-3 h-3 mr-1" />
                      Texto
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add Scene Card */}
            <Card
              className="shrink-0 w-64 border-2 border-dashed border-gray-300 hover:border-video-primary cursor-pointer transition-colors duration-200"
              onClick={onAddScene}
            >
              <CardContent className="p-4 h-full flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <Plus className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 text-center">Adicionar Nova Cena</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Timeline Progress Indicator */}
        <div className="mt-4 bg-gray-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-video-primary h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentScene + 1) / scenes.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
