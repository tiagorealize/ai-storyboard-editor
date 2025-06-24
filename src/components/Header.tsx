
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Video, LogOut, FolderOpen, User, Palette } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  onOpenGlobalOptions?: () => void;
}

const Header = ({ onOpenGlobalOptions }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const activeTab = location.pathname === '/' ? 'editor' : 'projects';

  const menuItems = [
    { id: 'projects', label: 'Meus Projetos', icon: FolderOpen, path: '/projects' },
    { id: 'editor', label: 'Editor', icon: Video, path: '/' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-video-gradient rounded-xl flex items-center justify-center">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI VideoStudio</h1>
            <p className="text-xs text-gray-500">Powered by Artificial Intelligence</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`flex items-center space-x-2 ${
                activeTab === item.id 
                  ? 'bg-video-primary text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {onOpenGlobalOptions && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center space-x-2"
              onClick={onOpenGlobalOptions}
            >
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Opções Globais</span>
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-video-gradient text-white">
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white border border-gray-200" align="end">
              <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer text-red-600">
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
