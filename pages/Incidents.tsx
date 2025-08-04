
import React, { useState } from 'react';
import type { Incident, Site } from '../types';
import { IncidentSeverity } from '../types';

interface IncidentsProps {
  incidents: Incident[];
  setIncidents: React.Dispatch<React.SetStateAction<Incident[]>>;
  sites: Site[];
}

const getSeverityClass = (severity: IncidentSeverity) => {
  switch (severity) {
    case IncidentSeverity.High:
      return 'bg-red-100 text-red-800';
    case IncidentSeverity.Medium:
      return 'bg-yellow-100 text-yellow-800';
    case IncidentSeverity.Low:
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const EditableCell: React.FC<{ value: string; onSave: (value: string) => void }> = ({ value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  const handleSave = () => {
    onSave(text);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        className="w-full px-1 py-0.5 border border-corporate-blue-light rounded"
        autoFocus
      />
    );
  }

  return (
    <div onClick={() => setEditing(true)} className="cursor-pointer min-h-[24px]">
      {value}
    </div>
  );
};

const Incidents: React.FC<IncidentsProps> = ({ incidents, setIncidents, sites }) => {
  const handleAddIncident = () => {
    const newIncident: Incident = {
      id: incidents.length > 0 ? Math.max(...incidents.map(i => i.id)) + 1 : 1,
      date: new Date().toISOString().split('T')[0],
      site: sites[0]?.name || 'N/A',
      description: 'Nueva incidencia...',
      severity: IncidentSeverity.Low,
      responsible: '',
      solution: '',
    };
    setIncidents([newIncident, ...incidents]);
  };
  
  const handleUpdate = (id: number, field: keyof Incident, value: string) => {
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, [field]: value } : inc));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-corporate-blue-dark">Registro de Incidencias</h2>
        <button
          onClick={handleAddIncident}
          className="bg-corporate-blue-light hover:bg-corporate-blue-dark text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Agregar Incidencia
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sede</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsable</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Solución Aplicada</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {incidents.map((incident) => (
              <tr key={incident.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                   <EditableCell value={incident.date} onSave={(val) => handleUpdate(incident.id, 'date', val)} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <select value={incident.site} onChange={(e) => handleUpdate(incident.id, 'site', e.target.value)} className="w-full bg-transparent border-none focus:ring-0">
                      {sites.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs">
                  <EditableCell value={incident.description} onSave={(val) => handleUpdate(incident.id, 'description', val)} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <select
                    value={incident.severity}
                    onChange={(e) => handleUpdate(incident.id, 'severity', e.target.value)}
                    className={`text-xs leading-5 font-semibold rounded-full border-none focus:ring-0 ${getSeverityClass(incident.severity)}`}
                  >
                    {Object.values(IncidentSeverity).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <EditableCell value={incident.responsible} onSave={(val) => handleUpdate(incident.id, 'responsible', val)} />
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs">
                  <EditableCell value={incident.solution} onSave={(val) => handleUpdate(incident.id, 'solution', val)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Incidents;
