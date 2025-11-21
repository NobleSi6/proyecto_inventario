import { useState } from 'react';
import { Plus, Eye, Edit, ArrowRightLeft, Calendar, User, Building2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { mockTransferencias, mockAlmacenes, mockUsers } from '../../data/mockData';
import type { Transferencia } from '../../types';

export function TransferenciasList() {
  const [transferencias, setTransferencias] = useState<Transferencia[]>(mockTransferencias);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransferencias = transferencias.filter(transferencia =>
    transferencia.numero_transferencia.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAlmacenNombre = (id: string) => {
    return mockAlmacenes.find(a => a.id_almacen === id)?.nombre || 'N/A';
  };

  const getEmpleadoNombre = (id: string) => {
    return mockUsers.find(u => u.id === id)?.nombre || 'N/A';
  };

  const getEstadoConfig = (estado: Transferencia['estado']) => {
    const configs = {
      'pendiente': {
        label: 'Pendiente',
        variant: 'secondary' as const,
        color: 'bg-slate-100 text-slate-700'
      },
      'en_transito': {
        label: 'En Tránsito',
        variant: 'default' as const,
        color: 'bg-blue-100 text-blue-700'
      },
      'completada': {
        label: 'Completada',
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
          <h1 className="text-slate-900 mb-2">Transferencias entre Almacenes</h1>
          <p className="text-slate-600">Gestione el traslado de materiales entre almacenes</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nueva Transferencia
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 rounded-xl">
                <ArrowRightLeft className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <p className="text-slate-600">Pendientes</p>
                <p className="text-slate-900">
                  {transferencias.filter(t => t.estado === 'pendiente').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <ArrowRightLeft className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-600">En Tránsito</p>
                <p className="text-slate-900">
                  {transferencias.filter(t => t.estado === 'en_transito').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <ArrowRightLeft className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-slate-600">Completadas</p>
                <p className="text-slate-900">
                  {transferencias.filter(t => t.estado === 'completada').length}
                </p>
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
                <p className="text-slate-600">Total</p>
                <p className="text-slate-900">{transferencias.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Buscar por número de transferencia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Lista de Transferencias */}
      <div className="space-y-4">
        {filteredTransferencias.map((transferencia) => {
          const estadoConfig = getEstadoConfig(transferencia.estado);
          
          return (
            <Card key={transferencia.id_transferencia} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-slate-900">{transferencia.numero_transferencia}</h3>
                        <Badge className={estadoConfig.color}>
                          {estadoConfig.label}
                        </Badge>
                      </div>
                      <p className="text-slate-600">{transferencia.observaciones}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>{transferencia.fecha_transferencia}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ruta de Transferencia */}
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Building2 className="w-4 h-4" />
                        <span>Origen</span>
                      </div>
                      <p className="text-slate-900">
                        {getAlmacenNombre(transferencia.id_almacen_origen)}
                      </p>
                    </div>

                    <div className="flex items-center justify-center">
                      <ArrowRightLeft className="w-6 h-6 text-slate-400" />
                    </div>

                    <div className="flex-1 text-right">
                      <div className="flex items-center justify-end gap-2 text-slate-600 mb-1">
                        <span>Destino</span>
                        <Building2 className="w-4 h-4" />
                      </div>
                      <p className="text-slate-900">
                        {getAlmacenNombre(transferencia.id_almacen_destino)}
                      </p>
                    </div>
                  </div>

                  {/* Información Adicional */}
                  <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <User className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <p className="text-blue-900">
                      Autorizado por: {getEmpleadoNombre(transferencia.id_empleado_autoriza)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      Ver Detalle
                    </Button>
                    {transferencia.estado === 'pendiente' && (
                      <>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Edit className="w-4 h-4" />
                          Editar
                        </Button>
                        <Button size="sm" className="gap-2">
                          Iniciar Traslado
                        </Button>
                      </>
                    )}
                    {transferencia.estado === 'en_transito' && (
                      <Button size="sm" className="gap-2">
                        Confirmar Recepción
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTransferencias.length === 0 && (
        <div className="text-center py-12">
          <ArrowRightLeft className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">No se encontraron transferencias</p>
        </div>
      )}
    </div>
  );
}
