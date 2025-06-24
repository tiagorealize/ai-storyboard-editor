
import { useState } from 'react';
import Header from '@/components/Header';
import NewProjectModal from '@/components/NewProjectModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Video, Calendar, Clock, MoreVertical, Plus, Play, Loader2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

// Mock data para projetos
const mockProjects = [
  {
    id: 1,
    title: 'Como Criar um Canal no YouTube',
    description: 'Guia completo para crescimento no YouTube',
    thumbnail: '/placeholder.svg',
    duration: '2:15',
    scenes: 5,
    createdAt: '2024-06-20',
    status: 'completed'
  },
  {
    id: 2,
    title: 'Marketing Digital para Iniciantes',
    description: 'Estratégias básicas de marketing online',
    thumbnail: '/placeholder.svg',
    duration: '3:42',
    scenes: 8,
    createdAt: '2024-06-19',
    status: 'rendering',
    renderProgress: 65,
    renderingStep: 'Gerando áudio das cenas...',
    estimatedTime: '2 min'
  },
  {
    id: 3,
    title: 'Receitas Saudáveis Rápidas',
    description: 'Pratos nutritivos em menos de 30 minutos',
    thumbnail: '/placeholder.svg',
    duration: '1:58',
    scenes: 4,
    createdAt: '2024-06-18',
    status: 'completed'
  }
];

const Projects = () => {
  const navigate = useNavigate();
  const [projects] = useState(mockProjects);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  const handleCreateNew = () => {
    setIsNewProjectModalOpen(true);
  };

  const handleCreateProject = (projectData: { title: string; html: string; scenes: any[] }) => {
    console.log('Criando projeto:', projectData);
    // Aqui você salvaria o projeto com as cenas identificadas
    // Por enquanto, vamos apenas redirecionar para o editor
    setIsNewProjectModalOpen(false);
    navigate('/', { state: { scenes: projectData.scenes, title: projectData.title } });
  };

  const handleEditProject = (projectId: number) => {
    // Por enquanto, redireciona para o editor
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Finalizado</Badge>;
      case 'rendering':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          Renderizando
        </Badge>;
      case 'draft':
        return <Badge variant="secondary">Rascunho</Badge>;
      default:
        return <Badge variant="outline">Em Progresso</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header da página */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Projetos</h1>
            <p className="text-gray-600">Gerencie todos os seus vídeos criados com IA</p>
          </div>
          
          <Button 
            onClick={handleCreateNew}
            className="bg-video-primary hover:bg-video-primary/90 text-white flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Projeto</span>
          </Button>
        </div>

        {/* Grid de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                {/* Thumbnail */}
                <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                  {project.status === 'rendering' ? (
                    <div className="flex flex-col items-center space-y-2">
                      <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                      <span className="text-xs text-gray-500">Processando...</span>
                    </div>
                  ) : (
                    <Video className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                
                {/* Status badge */}
                <div className="absolute top-3 left-3">
                  {getStatusBadge(project.status)}
                </div>

                {/* Menu de ações */}
                <div className="absolute top-3 right-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                        disabled={project.status === 'rendering'}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditProject(project.id)}>
                        <Play className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Rendering Progress */}
                {project.status === 'rendering' && (
                  <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-orange-800">
                        {project.renderingStep}
                      </span>
                      <span className="text-xs text-orange-600">
                        ~{project.estimatedTime} restante
                      </span>
                    </div>
                    <Progress value={project.renderProgress} className="h-2" />
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-orange-600">
                        {project.renderProgress}% concluído
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Video className="w-4 h-4" />
                    <span>{project.scenes} cenas</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(project.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleEditProject(project.id)}
                    className="text-xs"
                    disabled={project.status === 'rendering'}
                  >
                    {project.status === 'rendering' ? 'Processando...' : 'Abrir'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estado vazio (se não houver projetos) */}
        {projects.length === 0 && (
          <div className="text-center py-16">
            <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum projeto ainda</h3>
            <p className="text-gray-600 mb-6">Comece criando seu primeiro vídeo com IA</p>
            <Button onClick={handleCreateNew} className="bg-video-primary hover:bg-video-primary/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Projeto
            </Button>
          </div>
        )}
      </main>

      {/* Modal de Novo Projeto */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
};

export default Projects;
