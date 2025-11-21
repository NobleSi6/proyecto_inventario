import { useState } from 'react';
import { Plus, Eye, Edit, FileText, Calendar, User, Package } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { mockEntradas, mockAlmacenes, mockUsers } from '../../data/mockData';
import type { Entrada } from '../../types';

export function EntradasList() {
  const [entradas, setEntradas] = useState<Entrada[]>(mockEntradas);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntradas = entradas.filter(entrada =>
    entrada.numero_entrada.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entrada.tipo_entrada.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAlmacenNombre = (id: string) => {
    return mockAlmacenes.find(a => a.id_almacen === id)?.nombre || 'N/A';
  };

  const getEmpleadoNombre = (id: string) => {
    return mockUsers.find(u => u.id === id)?.nombre || 'N/A';
  };

  const getTipoColor = (tipo: string) => {
    const tipos: Record<string, string> = {
      'Compra': 'bg-blue-100 text-blue-700',
      'Transferencia': 'bg-purple-100 text-purple-700',
      'Devolución': 'bg-green-100 text-green-700',
      'Ajuste': 'bg-orange-100 text-orange-700'
    };
    return tipos[tipo] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Entradas de Inventario</h1>
          <p className="text-slate-600">Registre y gestione las entradas de materiales</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nueva Entrada
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-600">Total Entradas</p>
                <p className="text-slate-900">{entradas.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-slate-600">Entradas Este Mes</p>
                <p className="text-slate-900">{entradas.length}</p>
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
                <p className="text-slate-600">Última Entrada</p>
                <p className="text-slate-900">
                  {entradas[entradas.length - 1]?.fecha_entrada || 'N/A'}
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
            placeholder="Buscar por número de entrada o tipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Lista de Entradas */}
      <div className="space-y-4">
        {filteredEntradas.map((entrada) => (
          <Card key={entrada.id_entrada} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-slate-900">{entrada.numero_entrada}</h3>
                        <Badge className={getTipoColor(entrada.tipo_entrada)}>
                          {entrada.tipo_entrada}
                        </Badge>
                      </div>
                      <p className="text-slate-600">{entrada.observaciones}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Package className="w-4 h-4" />
                        <span>Almacén</span>
                      </div>
                      <p className="text-slate-900">{getAlmacenNombre(entrada.id_almacen)}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <FileText className="w-4 h-4" />
                        <span>Orden de Compra</span>
                      </div>
                      <p className="text-slate-900">{entrada.id_orden_compra}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <User className="w-4 h-4" />
                        <span>Recibido por</span>
                      </div>
                      <p className="text-slate-900">{getEmpleadoNombre(entrada.id_empleado_recibe)}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>Fecha</span>
                      </div>
                      <p className="text-slate-900">{entrada.fecha_entrada}</p>
                    </div>
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

      {filteredEntradas.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">No se encontraron entradas</p>
        </div>
      )}
    </div>
  );
}
