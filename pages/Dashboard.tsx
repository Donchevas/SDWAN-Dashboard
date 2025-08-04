
import React, { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import KPICard from '../components/KPICard';
import { Site, MigrationStatus } from '../types';

interface DashboardProps {
  sites: Site[];
}

const Dashboard: React.FC<DashboardProps> = ({ sites }) => {
  const totalSites = sites.length;
  const migratedSites = useMemo(() => sites.filter(s => s.status === MigrationStatus.Migrated || s.status === MigrationStatus.Validation).length, [sites]);
  const progressPercentage = totalSites > 0 ? Math.round((migratedSites / totalSites) * 100) : 0;

  const statusCounts = useMemo(() => {
    return sites.reduce((acc, site) => {
      acc[site.status] = (acc[site.status] || 0) + 1;
      return acc;
    }, {} as Record<MigrationStatus, number>);
  }, [sites]);
  
  const chartData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  const COLORS: Record<MigrationStatus, string> = {
    [MigrationStatus.Migrated]: '#16a34a', // green-600
    [MigrationStatus.Validation]: '#3b82f6', // blue-500
    [MigrationStatus.InProgress]: '#f59e0b', // amber-500
    [MigrationStatus.Pending]: '#d1d5db', // gray-300
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-corporate-blue-dark">Panel de Control del Proyecto SD-WAN – Migración Nacional</h1>
        <p className="mt-2 text-gray-600 max-w-4xl">
          El objetivo de este proyecto es migrar 47 sedes de la tecnología MPLS a una arquitectura SD-WAN. 
          Esta transición estratégica mejorará el rendimiento de la red, fortalecerá la seguridad y proporcionará una mayor escalabilidad para futuras demandas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard 
          title="Avance Global" 
          value={`${progressPercentage}%`}
          description="Porcentaje de sedes migradas y validadas"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>}
        />
        <KPICard 
          title="Sedes Migradas"
          value={`${migratedSites} / ${totalSites}`}
          description="Número de sedes completadas vs el total"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>}
        />
         <KPICard 
          title="Sedes Pendientes"
          value={totalSites - migratedSites}
          description="Sedes restantes por iniciar o en proceso"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-corporate-blue-dark mb-4">Progreso de Migración por Estado</h2>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as MigrationStatus]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} sedes`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
