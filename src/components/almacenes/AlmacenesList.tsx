import { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Phone, Building2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { mockAlmacenes } from '../../data/mockData';
import { AlmacenForm } from './AlmacenForm';
import type { Almacen } from '../../types';

export function AlmacenesList() {
  const [almacenes, setAlmacenes] = useState<Almacen[]>(mockAlmacenes);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAlmacen, setEditingAlmacen] = useState<Almacen | null>(null);

  const filteredAlmacenes = almacenes.filter(almacen =>
    almacen.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    almacen.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    almacen.ciudad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setEditingAlmacen(null);
    setShowForm(true);
  };

  const handleEdit = (almacen: Almacen) => {
    setEditingAlmacen(almacen);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar este almacén?')) {
      setAlmacenes(almacenes.filter(a => a.id_almacen !== id));
    }
  };

  const handleSave = (almacen: Almacen) => {
    if (editingAlmacen) {
      setAlmacenes(almacenes.map(a => 
        a.id_almacen === almacen.id_almacen ? almacen : a
      ));
    } else {
      setAlmacenes([...almacenes, { ...almacen, id_almacen: Date.now().toString() }]);
    }
    setShowForm(false);
    setEditingAlmacen(null);
  };

  if (showForm) {
    return (
      <AlmacenForm
        almacen={editingAlmacen}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false);
          setEditingAlmacen(null);
        }}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Gestión de Almacenes</h1>
          <p className="text-slate-600">Administre los almacenes de la empresa</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Almacén
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Buscar por nombre, código o ciudad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Lista de Almacenes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAlmacenes.map((almacen) => (
          <Card key={almacen.id_almacen} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>{almacen.nombre}</CardTitle>
                    <p className="text-slate-600">{almacen.codigo}</p>
                  </div>
                </div>
                <Badge variant={almacen.activo ? 'default' : 'secondary'}>
                  {almacen.activo ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>{almacen.direccion}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>{almacen.ciudad}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4" />
                  <span>{almacen.telefono}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-600">Capacidad</span>
                  <span className="text-slate-900">{almacen.capacidad_m3} m³</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Responsable</span>
                  <span className="text-slate-900">{almacen.responsable}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => handleEdit(almacen)}
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(almacen.id_almacen)}
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlmacenes.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">No se encontraron almacenes</p>
        </div>
      )}
    </div>
  );
}
