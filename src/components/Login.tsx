import { useState } from 'react';
import { Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { mockUsers, mockCredentials } from '../data/mockData';
import type { User as UserType } from '../types';

interface LoginProps {
  onLogin: (user: UserType) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular delay de autenticación
    setTimeout(() => {
      const correctPassword = mockCredentials[username];
      
      if (!correctPassword) {
        setError('Usuario no encontrado');
        setIsLoading(false);
        return;
      }

      if (correctPassword !== password) {
        setError('Usuario o contraseña incorrectos');
        setIsLoading(false);
        return;
      }

      const user = mockUsers.find(u => u.username === username);
      if (user && user.activo) {
        if (rememberMe) {
          localStorage.setItem('rememberUser', username);
        }
        onLogin(user);
      } else {
        setError('Usuario inactivo');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-white"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <h1 className="text-slate-900 mb-2">Sistema de Gestión de Inventarios</h1>
          <p className="text-slate-600">Inicia sesión para continuar</p>
        </div>

        {/* Formulario de login */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Usuario */}
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Ingrese su usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {/* Recuérdame */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="cursor-pointer">
                  Recuérdame
                </Label>
              </div>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>

          {/* Registro */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              ¿No tienes cuenta?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Regístrate aquí
              </a>
            </p>
          </div>

          {/* Usuarios de demo */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-slate-500 text-center mb-3">Usuarios de demostración:</p>
            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>Administrador:</span>
                <span className="font-mono">admin / password123</span>
              </div>
              <div className="flex justify-between">
                <span>Gerente:</span>
                <span className="font-mono">gerente / password123</span>
              </div>
              <div className="flex justify-between">
                <span>Almacenero:</span>
                <span className="font-mono">almacenero / password123</span>
              </div>
              <div className="flex justify-between">
                <span>Comprador:</span>
                <span className="font-mono">comprador / password123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
