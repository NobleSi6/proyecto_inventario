import { useState } from 'react';
import { Plus, Edit, Trash2, Package, AlertTriangle, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { mockMateriales } from '../../data/mockData';
import { MaterialForm } from './MaterialForm';
import type { Material } from '../../types';

export function MaterialesList() {
  const [materiales, setMateriales] = useState<Material[]>(mockMateriales);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [activeTab, setActiveTab] = useState('todos');

  const filteredMateriales = materiales
    .filter(material => {
      const matchesSearch = material.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (activeTab === 'bajo-stock') {
        return matchesSearch && material.stock_actual <= material.stock_minimo;
      }
      if (activeTab === 'activos') {
        return matchesSearch && material.activo;
      }
      return matchesSearch;
    });

  const handleCreate = () => {
    setEditingMaterial(null);
    setShowForm(true);
  };

  const handleEdit = (material: Material) => {
    setEditingMaterial(material);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar este material?')) {
      setMateriales(materiales.filter(m => m.id_material !== id));
    }
  };

  const handleSave = (material: Material) => {
    if (editingMaterial) {
      setMateriales(materiales.map(m => 
        m.id_material === material.id_material ? material : m
      ));
    } else {
      setMateriales([...materiales, { ...material, id_material: Date.now().toString() }]);
    }
    setShowForm(false);
    setEditingMaterial(null);
  };

  const getStockStatus = (material: Material) => {
    if (material.stock_actual <= material.stock_minimo) {
      return { label: 'Crítico', variant: 'destructive' as const, color: 'text-red-600' };
    }
    if (material.stock_actual <= material.stock_minimo * 1.2) {
      return { label: 'Bajo', variant: 'secondary' as const, color: 'text-orange-600' };
    }
    return { label: 'Normal', variant: 'default' as const, color: 'text-green-600' };
  };

  if (showForm) {
    return (
      <MaterialForm
        material={editingMaterial}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false);
          setEditingMaterial(null);
        }}
      />
    );
  }

  const materialesBajoStock = materiales.filter(m => m.stock_actual <= m.stock_minimo).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Catálogo de Materiales</h1>
          <p className="text-slate-600">Gestione el inventario de materiales</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Material
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-600">Total Materiales</p>
                <p className="text-slate-900">{materiales.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-slate-600">Bajo Stock</p>
                <p className="text-slate-900">{materialesBajoStock}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-slate-600">Materiales Activos</p>
                <p className="text-slate-900">{materiales.filter(m => m.activo).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Input
              placeholder="Buscar por nombre, código o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="bajo-stock">Bajo Stock</TabsTrigger>
          <TabsTrigger value="activos">Activos</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Lista de Materiales */}
          <div className="grid grid-cols-1 gap-4">
            {filteredMateriales.map((material) => {
              const stockStatus = getStockStatus(material);
              
              return (
                <Card key={material.id_material} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Package className="w-8 h-8 text-slate-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="text-slate-900 mb-1">{material.nombre}</h3>
                            <p className="text-slate-600">{material.descripcion}</p>
                            <p className="text-slate-500 mt-1">Código: {material.codigo}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant={stockStatus.variant}>
                              {stockStatus.label}
                            </Badge>
                            <Badge variant={material.activo ? 'default' : 'secondary'}>
                              {material.activo ? 'Activo' : 'Inactivo'}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4 border-t border-b border-slate-200">
                          <div>
                            <p className="text-slate-600 mb-1">Stock Actual</p>
                            <p className={`${stockStatus.color}`}>
                              {material.stock_actual}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-600 mb-1">Stock Mínimo</p>
                            <p className="text-slate-900">{material.stock_minimo}</p>
                          </div>
                          <div>
                            <p className="text-slate-600 mb-1">Stock Máximo</p>
                            <p className="text-slate-900">{material.stock_maximo}</p>
                          </div>
                          <div>
                            <p className="text-slate-600 mb-1">Precio Unitario</p>
                            <p className="text-slate-900">S/ {material.precio_unitario.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-slate-600 mb-1">Ubicación</p>
                            <p className="text-slate-900">{material.ubicacion_almacen}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => handleEdit(material)}
                          >
                            <Edit className="w-4 h-4" />
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(material.id_material)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredMateriales.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">No se encontraron materiales</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
