import { useState } from 'react';
import { Plus, Edit, Trash2, User, Mail, Shield, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { mockUsers, mockCargos } from '../../data/mockData';
import type { User as UserType, UserRole } from '../../types';

export function UsuariosList() {
  const [usuarios, setUsuarios] = useState<UserType[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCargoNombre = (id: string) => {
    return mockCargos.find(c => c.id_cargo === id)?.tipo_cargo || 'N/A';
  };

  const getRoleBadgeColor = (rol: UserRole) => {
    const colors: Record<UserRole, string> = {
      'administrador': 'bg-purple-100 text-purple-700',
      'gerente_almacen': 'bg-blue-100 text-blue-700',
      'almacenero': 'bg-green-100 text-green-700',
      'comprador': 'bg-orange-100 text-orange-700'
    };
    return colors[rol];
  };

  const getRoleLabel = (rol: UserRole) => {
    const labels: Record<UserRole, string> = {
      'administrador': 'Administrador',
      'gerente_almacen': 'Gerente de Almacén',
      'almacenero': 'Almacenero',
      'comprador': 'Comprador'
    };
    return labels[rol];
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Gestión de Usuarios</h1>
          <p className="text-slate-600">Administre los usuarios del sistema</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-600">Total Usuarios</p>
                <p className="text-slate-900">{usuarios.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-slate-600">Activos</p>
                <p className="text-slate-900">
                  {usuarios.filter(u => u.activo).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-slate-600">Administradores</p>
                <p className="text-slate-900">
                  {usuarios.filter(u => u.rol === 'administrador').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <User className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-slate-600">Operativos</p>
                <p className="text-slate-900">
                  {usuarios.filter(u => u.rol !== 'administrador').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Buscar por nombre, email o usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Usuarios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUsuarios.map((usuario) => (
          <Card key={usuario.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-14 h-14">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                    {getInitials(usuario.nombre)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-slate-900 mb-1">{usuario.nombre}</h3>
                      <p className="text-slate-600">@{usuario.username}</p>
                    </div>
                    <Badge variant={usuario.activo ? 'default' : 'secondary'}>
                      {usuario.activo ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{usuario.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-slate-600" />
                      <Badge className={getRoleBadgeColor(usuario.rol)}>
                        {getRoleLabel(usuario.rol)}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-slate-200">
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <Edit className="w-4 h-4" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(usuario.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsuarios.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">No se encontraron usuarios</p>
        </div>
      )}
    </div>
  );
}
