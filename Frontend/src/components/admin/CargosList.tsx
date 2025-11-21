import { useState } from 'react';
import { Plus, Edit, Trash2, Briefcase } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { mockCargos } from '../../data/mockData';
import type { Cargo } from '../../types';

export function CargosList() {
  const [cargos, setCargos] = useState<Cargo[]>(mockCargos);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCargos = cargos.filter(cargo =>
    cargo.tipo_cargo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar este cargo?')) {
      setCargos(cargos.filter(c => c.id_cargo !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Gestión de Cargos</h1>
          <p className="text-slate-600">Administre los tipos de cargo de la empresa</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Cargo
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Buscar cargo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Lista de Cargos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCargos.map((cargo) => (
          <Card key={cargo.id_cargo} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-slate-900 mb-1">{cargo.tipo_cargo}</h3>
                      <p className="text-slate-600">
                        Creado: {cargo.fecha_creacion}
                      </p>
                    </div>
                    <Badge variant={cargo.activo ? 'default' : 'secondary'}>
                      {cargo.activo ? 'Activo' : 'Inactivo'}
                    </Badge>
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
                      onClick={() => handleDelete(cargo.id_cargo)}
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

      {filteredCargos.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">No se encontraron cargos</p>
        </div>
      )}
    </div>
  );
}
