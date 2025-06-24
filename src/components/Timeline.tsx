
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Edit3, Trash2, Plus, Clock, Image, Sparkles, Loader2 } from 'lucide-react';

interface Scene {
  id: number;
  title: string;
  duration: number;
  thumbnail: string;
  text: string;
  hasAudio: boolean;
  hasImage: boolean;
  isRendering?: boolean;
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
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-4 px-2 flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Clock className="w-4 h-4 mr-2 text-video-primary" />
          Cenas
        </h3>
      </div>

      {/* Scrollable Timeline */}
      <ScrollArea className="flex-1 pr-2">
        <div className="space-y-3 pb-4">
          {scenes.map((scene, index) => (
            <Card
              key={scene.id}
              className={`timeline-scene cursor-pointer transition-all duration-300 ${
                currentScene === index
                  ? 'ring-2 ring-video-primary shadow-lg bg-video-primary/5'
                  : 'hover:shadow-md border-gray-200 hover:border-video-primary/30'
              } ${draggedScene === index ? 'dragging' : ''} ${
                scene.isRendering ? 'opacity-75' : ''
              }`}
              onClick={() => onSceneSelect(index)}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
            >
              <CardContent className="p-3">
                {/* Scene Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
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
                      disabled={scene.isRendering}
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
                      disabled={scene.isRendering}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="relative bg-gray-100 rounded-lg aspect-video mb-2 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col items-center justify-center">
                    {scene.isRendering ? (
                      <>
                        <Loader2 className="w-6 h-6 text-gray-400 animate-spin mb-1" />
                        <Badge variant="outline" className="text-xs text-orange-600 border-orange-200">
                          <Loader2 className="w-2 h-2 mr-1 animate-spin" />
                          Renderizando
                        </Badge>
                      </>
                    ) : (
                      <Image className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  {currentScene === index && !scene.isRendering && (
                    <div className="absolute inset-0 bg-video-primary/10 flex items-center justify-center">
                      <div className="w-6 h-6 bg-video-primary rounded-full flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Scene Info */}
                <h4 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                  {scene.title}
                </h4>
                
                <p className="text-xs text-gray-600 line-clamp-2">
                  {scene.text}
                </p>
              </CardContent>
            </Card>
          ))}

          {/* Add Scene Button */}
          <Card
            className="border-2 border-dashed border-gray-300 hover:border-video-primary cursor-pointer transition-colors duration-200"
            onClick={onAddScene}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <Plus className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 text-center">Nova Cena</p>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      {/* Progress Indicator */}
      <div className="mt-4 bg-gray-200 h-1 rounded-full overflow-hidden flex-shrink-0">
        <div 
          className="bg-video-primary h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentScene + 1) / scenes.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Timeline;
