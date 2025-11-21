import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import type { Material } from '../../types';

interface MaterialFormProps {
  material: Material | null;
  onSave: (material: Material) => void;
  onCancel: () => void;
}

export function MaterialForm({ material, onSave, onCancel }: MaterialFormProps) {
  const [formData, setFormData] = useState<Material>(
    material || {
      id_material: '',
      codigo: '',
      nombre: '',
      descripcion: '',
      id_categoria: '1',
      id_unidad: '1',
      precio_unitario: 0,
      stock_minimo: 0,
      stock_maximo: 0,
      stock_actual: 0,
      ubicacion_almacen: '',
      activo: true
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof Material, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-slate-900 mb-2">
            {material ? 'Editar Material' : 'Nuevo Material'}
          </h1>
          <p className="text-slate-600">
            {material ? 'Modifique los datos del material' : 'Complete los datos del nuevo material'}
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Información General */}
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="codigo">Código *</Label>
                  <Input
                    id="codigo"
                    value={formData.codigo}
                    onChange={(e) => handleChange('codigo', e.target.value)}
                    placeholder="Ej: MAT-001"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre del Material *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    placeholder="Ej: Cemento Portland"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="descripcion">Descripción *</Label>
                  <Textarea
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) => handleChange('descripcion', e.target.value)}
                    placeholder="Ej: Bolsa de 42.5 kg"
                    required
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ubicacion">Ubicación en Almacén *</Label>
                  <Input
                    id="ubicacion"
                    value={formData.ubicacion_almacen}
                    onChange={(e) => handleChange('ubicacion_almacen', e.target.value)}
                    placeholder="Ej: A-01-01"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="precio">Precio Unitario (S/) *</Label>
                  <Input
                    id="precio"
                    type="number"
                    step="0.01"
                    value={formData.precio_unitario}
                    onChange={(e) => handleChange('precio_unitario', Number(e.target.value))}
                    placeholder="Ej: 28.50"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Control de Stock */}
          <Card>
            <CardHeader>
              <CardTitle>Control de Stock</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="stock_minimo">Stock Mínimo *</Label>
                  <Input
                    id="stock_minimo"
                    type="number"
                    value={formData.stock_minimo}
                    onChange={(e) => handleChange('stock_minimo', Number(e.target.value))}
                    placeholder="Ej: 100"
                    required
                  />
                  <p className="text-slate-500">Nivel de alerta</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock_maximo">Stock Máximo *</Label>
                  <Input
                    id="stock_maximo"
                    type="number"
                    value={formData.stock_maximo}
                    onChange={(e) => handleChange('stock_maximo', Number(e.target.value))}
                    placeholder="Ej: 500"
                    required
                  />
                  <p className="text-slate-500">Capacidad máxima</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock_actual">Stock Actual *</Label>
                  <Input
                    id="stock_actual"
                    type="number"
                    value={formData.stock_actual}
                    onChange={(e) => handleChange('stock_actual', Number(e.target.value))}
                    placeholder="Ej: 350"
                    required
                  />
                  <p className="text-slate-500">Cantidad disponible</p>
                </div>
              </div>

              {/* Indicador Visual de Stock */}
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-600">Nivel de Stock</span>
                  <span className="text-slate-900">
                    {formData.stock_actual} / {formData.stock_maximo}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      formData.stock_actual <= formData.stock_minimo
                        ? 'bg-red-500'
                        : formData.stock_actual <= formData.stock_minimo * 1.2
                        ? 'bg-orange-500'
                        : 'bg-green-500'
                    }`}
                    style={{
                      width: `${Math.min(
                        (formData.stock_actual / formData.stock_maximo) * 100,
                        100
                      )}%`
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-slate-500">Mínimo: {formData.stock_minimo}</span>
                  <span className="text-slate-500">Máximo: {formData.stock_maximo}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estado */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="activo">Estado del Material</Label>
                  <p className="text-slate-600 mt-1">
                    {formData.activo ? 'El material está activo y disponible' : 'El material está inactivo'}
                  </p>
                </div>
                <Switch
                  id="activo"
                  checked={formData.activo}
                  onCheckedChange={(checked) => handleChange('activo', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Botones */}
          <div className="flex gap-3">
            <Button type="submit" className="gap-2">
              <Save className="w-4 h-4" />
              {material ? 'Guardar Cambios' : 'Crear Material'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
