import { useState } from 'react';
import { Plus, Eye, Edit, FileText, Calendar, User, Package, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { mockSalidas, mockAlmacenes, mockUsers } from '../../data/mockData';
import type { Salida } from '../../types';

export function SalidasList() {
  const [salidas, setSalidas] = useState<Salida[]>(mockSalidas);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSalidas = salidas.filter(salida =>
    salida.numero_salida.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salida.tipo_salida.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAlmacenNombre = (id: string) => {
    return mockAlmacenes.find(a => a.id_almacen === id)?.nombre || 'N/A';
  };

  const getEmpleadoNombre = (id: string) => {
    return mockUsers.find(u => u.id === id)?.nombre || 'N/A';
  };

  const getTipoColor = (tipo: string) => {
    const tipos: Record<string, string> = {
      'Proyecto': 'bg-blue-100 text-blue-700',
      'Transferencia': 'bg-purple-100 text-purple-700',
      'Venta': 'bg-green-100 text-green-700',
      'Merma': 'bg-red-100 text-red-700'
    };
    return tipos[tipo] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Salidas de Inventario</h1>
          <p className="text-slate-600">Registre y gestione las salidas de materiales</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nueva Salida
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-slate-600">Total Salidas</p>
                <p className="text-slate-900">{salidas.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-600">Salidas Este Mes</p>
                <p className="text-slate-900">{salidas.filter(s => s.activo).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-slate-600">Última Salida</p>
                <p className="text-slate-900">
                  {salidas[salidas.length - 1]?.fecha_salida || 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Buscar por número de salida o tipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Lista de Salidas */}
      <div className="space-y-4">
        {filteredSalidas.map((salida) => (
          <Card key={salida.id_salida} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-slate-900">{salida.numero_salida}</h3>
                        <Badge className={getTipoColor(salida.tipo_salida)}>
                          {salida.tipo_salida}
                        </Badge>
                        <Badge variant={salida.activo ? 'default' : 'secondary'}>
                          {salida.activo ? 'Activa' : 'Anulada'}
                        </Badge>
                      </div>
                      <p className="text-slate-600">{salida.observaciones}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Package className="w-4 h-4" />
                        <span>Almacén</span>
                      </div>
                      <p className="text-slate-900">{getAlmacenNombre(salida.id_almacen)}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <FileText className="w-4 h-4" />
                        <span>Proyecto</span>
                      </div>
                      <p className="text-slate-900">{salida.id_proyecto}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <User className="w-4 h-4" />
                        <span>Autorizado por</span>
                      </div>
                      <p className="text-slate-900">{getEmpleadoNombre(salida.id_empleado_autoriza)}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>Fecha</span>
                      </div>
                      <p className="text-slate-900">{salida.fecha_salida}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <p className="text-blue-900">
                      Retirado por: {getEmpleadoNombre(salida.id_empleado_retira)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      Ver Detalle
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit className="w-4 h-4" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <FileText className="w-4 h-4" />
                      Imprimir
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSalidas.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">No se encontraron salidas</p>
        </div>
      )}
    </div>
  );
}
