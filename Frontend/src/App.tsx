import { useState } from 'react';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { AlmacenesList } from './components/almacenes/AlmacenesList';
import { MaterialesList } from './components/materiales/MaterialesList';
import { EntradasList } from './components/inventario/EntradasList';
import { SalidasList } from './components/inventario/SalidasList';
import { TransferenciasList } from './components/inventario/TransferenciasList';
import { OrdenesCompraList } from './components/compras/OrdenesCompraList';
import { CargosList } from './components/admin/CargosList';
import { UsuariosList } from './components/admin/UsuariosList';
import type { User } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  // Renderizar vista actual
  const renderView = () => {
    if (!currentUser) return null;

    switch (currentView) {
      case 'dashboard':
        return <Dashboard currentUser={currentUser} />;
      case 'almacenes':
        return <AlmacenesList />;
      case 'materiales':
        return <MaterialesList />;
      case 'entradas':
        return <EntradasList />;
      case 'salidas':
        return <SalidasList />;
      case 'transferencias':
        return <TransferenciasList />;
      case 'ordenes-compra':
        return <OrdenesCompraList />;
      case 'cargos':
        return <CargosList />;
      case 'usuarios':
        return <UsuariosList />;
      default:
        return <Dashboard currentUser={currentUser} />;
    }
  };

  // Si no hay usuario logueado, mostrar login
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  // Si hay usuario, mostrar layout con contenido
  return (
    <Layout
      currentUser={currentUser}
      onLogout={handleLogout}
      currentView={currentView}
      onNavigate={handleNavigate}
    >
      {renderView()}
    </Layout>
  );
}
