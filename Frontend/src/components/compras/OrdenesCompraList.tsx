import { useState } from 'react';
import { Plus, Eye, Edit, ShoppingCart, Calendar, Building2, DollarSign, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { mockOrdenesCompra, mockProveedores } from '../../data/mockData';
import type { OrdenCompra } from '../../types';

export function OrdenesCompraList() {
  const [ordenes, setOrdenes] = useState<OrdenCompra[]>(mockOrdenesCompra);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrdenes = ordenes.filter(orden =>
    orden.numero_orden.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProveedorNombre = (id: string) => {
    return mockProveedores.find(p => p.id_proveedor === id)?.nombre || 'N/A';
  };

  const getEstadoConfig = (estado: OrdenCompra['estado']) => {
    const configs = {
      'borrador': {
        label: 'Borrador',
        variant: 'secondary' as const,
        color: 'bg-slate-100 text-slate-700'
      },
      'enviada': {
        label: 'Enviada',
        variant: 'default' as const,
        color: 'bg-blue-100 text-blue-700'
      },
      'recibida': {
        label: 'Recibida',
        variant: 'default' as const,
        color: 'bg-green-100 text-green-700'
      },
      'cancelada': {
        label: 'Cancelada',
        variant: 'destructive' as const,
        color: 'bg-red-100 text-red-700'
      }
    };
    return configs[estado];
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Órdenes de Compra</h1>
          <p className="text-slate-600">Gestione las órdenes de compra a proveedores</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nueva Orden
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 rounded-xl">
                <FileText className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <p className="text-slate-600">Borradores</p>
                <p className="text-slate-900">
                  {ordenes.filter(o => o.estado === 'borrador').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-600">Enviadas</p>
                <p className="text-slate-900">
                  {ordenes.filter(o => o.estado === 'enviada').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-slate-600">Recibidas</p>
                <p className="text-slate-900">
                  {ordenes.filter(o => o.estado === 'recibida').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-slate-600">Total Invertido</p>
                <p className="text-slate-900">
                  S/ {ordenes.reduce((sum, o) => sum + o.total, 0).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
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
            placeholder="Buscar por número de orden..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Lista de Órdenes */}
      <div className="space-y-4">
        {filteredOrdenes.map((orden) => {
          const estadoConfig = getEstadoConfig(orden.estado);
          
          return (
            <Card key={orden.id_orden} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-slate-900">{orden.numero_orden}</h3>
                        <Badge className={estadoConfig.color}>
                          {estadoConfig.label}
                        </Badge>
                      </div>
                      <p className="text-slate-600">{orden.observaciones}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-600 mb-1">Total</p>
                      <p className="text-slate-900">
                        S/ {orden.total.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Building2 className="w-4 h-4" />
                        <span>Proveedor</span>
                      </div>
                      <p className="text-slate-900">{getProveedorNombre(orden.id_proveedor)}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>Fecha de Orden</span>
                      </div>
                      <p className="text-slate-900">{orden.fecha_orden}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      Ver Detalle
                    </Button>
                    {orden.estado === 'borrador' && (
                      <>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Edit className="w-4 h-4" />
                          Editar
                        </Button>
                        <Button size="sm" className="gap-2">
                          Enviar a Proveedor
                        </Button>
                      </>
                    )}
                    {orden.estado === 'enviada' && (
                      <Button size="sm" className="gap-2">
                        Confirmar Recepción
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="gap-2">
                      <FileText className="w-4 h-4" />
                      Imprimir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredOrdenes.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">No se encontraron órdenes de compra</p>
        </div>
      )}
    </div>
  );
}
