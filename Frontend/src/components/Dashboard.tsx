import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Package,
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  AlertTriangle,
  Archive,
  DollarSign,
  Users
} from 'lucide-react';
import { mockMateriales, mockEntradas, mockSalidas, mockTransferencias } from '../data/mockData';
import type { User } from '../types';

interface DashboardProps {
  currentUser: User;
}

export function Dashboard({ currentUser }: DashboardProps) {
  // Calcular KPIs
  const totalStock = mockMateriales.reduce((sum, m) => sum + m.stock_actual, 0);
  const entradasRecientes = mockEntradas.length;
  const salidasRecientes = mockSalidas.length;
  const transferenciasActivas = mockTransferencias.filter(t => t.estado !== 'completada').length;
  const materialesBajoStock = mockMateriales.filter(m => m.stock_actual <= m.stock_minimo).length;
  const valorInventario = mockMateriales.reduce((sum, m) => sum + (m.stock_actual * m.precio_unitario), 0);

  const stats = [
    {
      title: 'Stock Total',
      value: totalStock.toLocaleString(),
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Entradas (Mes)',
      value: entradasRecientes,
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Salidas (Mes)',
      value: salidasRecientes,
      change: '-5%',
      trend: 'down',
      icon: TrendingDown,
      color: 'orange'
    },
    {
      title: 'Transferencias Activas',
      value: transferenciasActivas,
      change: '2 pendientes',
      trend: 'neutral',
      icon: ArrowRightLeft,
      color: 'purple'
    }
  ];

  const alerts = [
    {
      id: '1',
      type: 'warning',
      message: 'Arena Gruesa está por debajo del stock mínimo',
      time: 'Hace 2 horas'
    },
    {
      id: '2',
      type: 'info',
      message: 'Nueva transferencia pendiente de aprobación',
      time: 'Hace 4 horas'
    },
    {
      id: '3',
      type: 'warning',
      message: 'Ladrillo King Kong alcanzando stock mínimo',
      time: 'Hace 1 día'
    }
  ];

  const recentMaterials = mockMateriales.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">
          Bienvenido, {currentUser.nombre}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            orange: 'bg-orange-100 text-orange-600',
            purple: 'bg-purple-100 text-purple-600'
          };

          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-slate-600">{stat.title}</p>
                    <p className="text-slate-900">{stat.value}</p>
                    <p className={`text-${stat.trend === 'up' ? 'green' : stat.trend === 'down' ? 'red' : 'slate'}-600`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alertas de Stock */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Alertas y Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${
                    alert.type === 'warning'
                      ? 'bg-orange-50 border-orange-200'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      className={`w-5 h-5 flex-shrink-0 ${
                        alert.type === 'warning' ? 'text-orange-600' : 'text-blue-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-slate-900">{alert.message}</p>
                      <p className="text-slate-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resumen Financiero */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Valor del Inventario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-slate-600 mb-1">Valor Total</p>
                <p className="text-slate-900">
                  S/ {valorInventario.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Materiales Activos</span>
                    <span className="text-slate-900">{mockMateriales.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Bajo Stock</span>
                    <span className="text-orange-600">{materialesBajoStock}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Stock Adecuado</span>
                    <span className="text-green-600">{mockMateriales.length - materialesBajoStock}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Materiales con Stock Crítico */}
      <Card>
        <CardHeader>
          <CardTitle>Materiales con Stock Crítico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockMateriales
              .filter(m => m.stock_actual <= m.stock_minimo)
              .map((material) => (
                <div
                  key={material.id_material}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-slate-900">{material.nombre}</p>
                      <p className="text-slate-600">
                        Código: {material.codigo}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-900">
                      Stock: {material.stock_actual}
                    </p>
                    <p className="text-orange-600">
                      Mínimo: {material.stock_minimo}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Actividad Reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Entradas Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockEntradas.slice(0, 3).map((entrada) => (
                <div
                  key={entrada.id_entrada}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div>
                    <p className="text-slate-900">{entrada.numero_entrada}</p>
                    <p className="text-slate-600">{entrada.tipo_entrada}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-600">{entrada.fecha_entrada}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-orange-600" />
              Salidas Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockSalidas.slice(0, 3).map((salida) => (
                <div
                  key={salida.id_salida}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div>
                    <p className="text-slate-900">{salida.numero_salida}</p>
                    <p className="text-slate-600">{salida.tipo_salida}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-600">{salida.fecha_salida}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
