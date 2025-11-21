import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import type { Almacen } from '../../types';

interface AlmacenFormProps {
  almacen: Almacen | null;
  onSave: (almacen: Almacen) => void;
  onCancel: () => void;
}

export function AlmacenForm({ almacen, onSave, onCancel }: AlmacenFormProps) {
  const [formData, setFormData] = useState<Almacen>(
    almacen || {
      id_almacen: '',
      nombre: '',
      codigo: '',
      direccion: '',
      ciudad: '',
      telefono: '',
      capacidad_m3: 0,
      activo: true,
      fecha_creacion: new Date().toISOString().split('T')[0],
      responsable: ''
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof Almacen, value: any) => {
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
            {almacen ? 'Editar Almacén' : 'Nuevo Almacén'}
          </h1>
          <p className="text-slate-600">
            {almacen ? 'Modifique los datos del almacén' : 'Complete los datos del nuevo almacén'}
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Información del Almacén</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Almacén *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  placeholder="Ej: Almacén Central"
                  required
                />
              </div>

              {/* Código */}
              <div className="space-y-2">
                <Label htmlFor="codigo">Código *</Label>
                <Input
                  id="codigo"
                  value={formData.codigo}
                  onChange={(e) => handleChange('codigo', e.target.value)}
                  placeholder="Ej: ALM-001"
                  required
                />
              </div>

              {/* Ciudad */}
              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad *</Label>
                <Input
                  id="ciudad"
                  value={formData.ciudad}
                  onChange={(e) => handleChange('ciudad', e.target.value)}
                  placeholder="Ej: Lima"
                  required
                />
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => handleChange('telefono', e.target.value)}
                  placeholder="Ej: 01-2345678"
                  required
                />
              </div>

              {/* Dirección */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="direccion">Dirección *</Label>
                <Input
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) => handleChange('direccion', e.target.value)}
                  placeholder="Ej: Av. Industrial 123"
                  required
                />
              </div>

              {/* Capacidad */}
              <div className="space-y-2">
                <Label htmlFor="capacidad">Capacidad (m³) *</Label>
                <Input
                  id="capacidad"
                  type="number"
                  value={formData.capacidad_m3}
                  onChange={(e) => handleChange('capacidad_m3', Number(e.target.value))}
                  placeholder="Ej: 5000"
                  required
                />
              </div>

              {/* Responsable */}
              <div className="space-y-2">
                <Label htmlFor="responsable">Responsable *</Label>
                <Input
                  id="responsable"
                  value={formData.responsable}
                  onChange={(e) => handleChange('responsable', e.target.value)}
                  placeholder="Ej: Juan Pérez"
                  required
                />
              </div>

              {/* Estado Activo */}
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <Label htmlFor="activo">Estado del Almacén</Label>
                    <p className="text-slate-600">
                      {formData.activo ? 'El almacén está activo' : 'El almacén está inactivo'}
                    </p>
                  </div>
                  <Switch
                    id="activo"
                    checked={formData.activo}
                    onCheckedChange={(checked) => handleChange('activo', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-6">
              <Button type="submit" className="gap-2">
                <Save className="w-4 h-4" />
                {almacen ? 'Guardar Cambios' : 'Crear Almacén'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
