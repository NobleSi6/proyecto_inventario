import { ReactNode } from 'react';
import {
  LayoutDashboard,
  Package,
  Archive,
  ArrowRightLeft,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  ChevronDown,
  Building2,
  Briefcase
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import type { User, UserRole } from '../types';

interface LayoutProps {
  children: ReactNode;
  currentUser: User;
  onLogout: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    roles: ['administrador', 'gerente_almacen', 'almacenero', 'comprador']
  },
  {
    id: 'almacenes',
    label: 'Almacenes',
    icon: Building2,
    roles: ['administrador', 'gerente_almacen']
  },
  {
    id: 'materiales',
    label: 'Materiales',
    icon: Package,
    roles: ['administrador', 'gerente_almacen', 'almacenero', 'comprador']
  },
  {
    id: 'entradas',
    label: 'Entradas',
    icon: Archive,
    roles: ['administrador', 'gerente_almacen', 'almacenero']
  },
  {
    id: 'salidas',
    label: 'Salidas',
    icon: Archive,
    roles: ['administrador', 'gerente_almacen', 'almacenero']
  },
  {
    id: 'transferencias',
    label: 'Transferencias',
    icon: ArrowRightLeft,
    roles: ['administrador', 'gerente_almacen', 'almacenero']
  },
  {
    id: 'ordenes-compra',
    label: 'Órdenes de Compra',
    icon: ShoppingCart,
    roles: ['administrador', 'comprador']
  },
  {
    id: 'cargos',
    label: 'Cargos',
    icon: Briefcase,
    roles: ['administrador']
  },
  {
    id: 'usuarios',
    label: 'Usuarios',
    icon: Users,
    roles: ['administrador']
  }
];

export function Layout({ children, currentUser, onLogout, currentView, onNavigate }: LayoutProps) {
  const visibleMenuItems = menuItems.filter(item => 
    item.roles.includes(currentUser.rol)
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleName = (rol: UserRole) => {
    const roleNames: Record<UserRole, string> = {
      'administrador': 'Administrador',
      'gerente_almacen': 'Gerente de Almacén',
      'almacenero': 'Almacenero',
      'comprador': 'Comprador'
    };
    return roleNames[rol];
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-200">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-white"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <div>
            <div className="text-slate-900">Inventarios</div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <Avatar>
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {getInitials(currentUser.nombre)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-slate-900 truncate">{currentUser.nombre}</div>
              <div className="text-slate-500 truncate">{getRoleName(currentUser.rol)}</div>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Buscar..."
                className="w-80 pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
