
import React from 'react';
import type { Site } from '../types';
import { MigrationStatus } from '../types';

interface ScheduleProps {
  sites: Site[];
  setSites: React.Dispatch<React.SetStateAction<Site[]>>;
}

const getStatusClass = (status: MigrationStatus) => {
  switch (status) {
    case MigrationStatus.Migrated:
      return 'bg-green-100 text-green-800';
    case MigrationStatus.Validation:
      return 'bg-blue-100 text-blue-800';
    case MigrationStatus.InProgress:
      return 'bg-yellow-100 text-yellow-800';
    case MigrationStatus.Pending:
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Schedule: React.FC<ScheduleProps> = ({ sites, setSites }) => {

  const handleStatusChange = (siteId: number, newStatus: MigrationStatus) => {
    setSites(prevSites =>
      prevSites.map(site => {
        if (site.id === siteId) {
          const updatedSite = { ...site, status: newStatus };
          if (newStatus === MigrationStatus.Migrated && !site.actualDate) {
            updatedSite.actualDate = new Date().toISOString().split('T')[0];
          }
          if(newStatus === MigrationStatus.Pending){
            updatedSite.actualDate = null;
          }
          return updatedSite;
        }
        return site;
      })
    );
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-corporate-blue-dark mb-4">Cronograma Detallado de Migración</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sede</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Programada</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Real</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado Actual</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsable de Sede</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sites.map((site) => (
              <tr key={site.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{site.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{site.plannedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{site.actualDate || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(site.status)}`}>
                    {site.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{site.manager}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <select
                    value={site.status}
                    onChange={(e) => handleStatusChange(site.id, e.target.value as MigrationStatus)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-corporate-blue-light focus:border-corporate-blue-light sm:text-sm rounded-md"
                  >
                    {Object.values(MigrationStatus).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
