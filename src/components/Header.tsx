

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Video, FolderOpen, Palette } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
interface HeaderProps {
  onOpenGlobalOptions?: () => void;
}
const Header = ({
  onOpenGlobalOptions
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname === '/projects' ? 'projects' : 'editor';
  const menuItems = [{
    id: 'projects',
    label: 'Meus Projetos',
    icon: FolderOpen,
    path: '/projects'
  }];
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  return <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-video-gradient rounded-xl flex items-center justify-center">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Gerador de vídeo</h1>
            
          </div>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          {/* Navigation Menu - moved to right side */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map(item => <Button key={item.id} variant={activeTab === item.id ? "default" : "ghost"} className={`flex items-center space-x-2 ${activeTab === item.id ? 'bg-video-primary text-white' : 'text-gray-600 hover:text-gray-900'}`} onClick={() => handleNavigation(item.path)}>
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>)}
          </nav>

          {onOpenGlobalOptions && <Button variant="outline" size="sm" className="flex items-center space-x-2" onClick={onOpenGlobalOptions}>
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Opções Globais</span>
            </Button>}
        </div>
      </div>
    </header>;
};
export default Header;

