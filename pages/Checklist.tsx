
import React, { useState, useEffect } from 'react';
import type { Site, Checklist as ChecklistType } from '../types';

interface ChecklistProps {
  sites: Site[];
  checklists: ChecklistType[];
  setChecklists: React.Dispatch<React.SetStateAction<ChecklistType[]>>;
}

interface ToggleProps {
  label: string;
  enabled: boolean;
  onChange: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, enabled, onChange }) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-gray-700 font-medium">{label}</span>
    <button
      type="button"
      className={`${
        enabled ? 'bg-corporate-blue-light' : 'bg-gray-200'
      } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-corporate-blue-light`}
      onClick={onChange}
    >
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
      />
    </button>
  </div>
);


const Checklist: React.FC<ChecklistProps> = ({ sites, checklists, setChecklists }) => {
  const [selectedSiteId, setSelectedSiteId] = useState<number | null>(sites[0]?.id || null);
  const [currentChecklist, setCurrentChecklist] = useState<ChecklistType | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (selectedSiteId) {
      const found = checklists.find(c => c.siteId === selectedSiteId);
      setCurrentChecklist(found || null);
    }
  }, [selectedSiteId, checklists]);

  const handleToggle = (key: keyof Omit<ChecklistType, 'siteId'>) => {
    if (currentChecklist) {
      const updatedChecklist = { ...currentChecklist, [key]: !currentChecklist[key] };
      setCurrentChecklist(updatedChecklist);
    }
  };

  const handleSave = () => {
    if (currentChecklist) {
      setChecklists(prev => prev.map(c => c.siteId === selectedSiteId ? currentChecklist : c));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-corporate-blue-dark mb-1">Checklist Técnico por Sede</h2>
        <p className="text-gray-600">Completa el siguiente formulario para validar requisitos técnicos antes de la migración.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="mb-6">
          <label htmlFor="site-select" className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar Sede
          </label>
          <select
            id="site-select"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-corporate-blue-light focus:border-corporate-blue-light sm:text-sm rounded-md"
            value={selectedSiteId || ''}
            onChange={(e) => setSelectedSiteId(Number(e.target.value))}
          >
            {sites.map(site => (
              <option key={site.id} value={site.id}>{site.name}</option>
            ))}
          </select>
        </div>

        {currentChecklist ? (
          <div className="divide-y divide-gray-200">
            <Toggle label="Gabinete instalado" enabled={currentChecklist.cabinetInstalled} onChange={() => handleToggle('cabinetInstalled')} />
            <Toggle label="Router WIN instalado" enabled={currentChecklist.winRouterInstalled} onChange={() => handleToggle('winRouterInstalled')} />
            <Toggle label="Router Claro instalado" enabled={currentChecklist.claroRouterInstalled} onChange={() => handleToggle('claroRouterInstalled')} />
            <Toggle label="Fibra conectada" enabled={currentChecklist.fiberConnected} onChange={() => handleToggle('fiberConnected')} />
            <Toggle label="Fortinet configurado" enabled={currentChecklist.fortinetConfigured} onChange={() => handleToggle('fortinetConfigured')} />
            <Toggle label="Validación de red completada" enabled={currentChecklist.networkValidated} onChange={() => handleToggle('networkValidated')} />
             <div className="pt-6 flex justify-end">
              <button
                onClick={handleSave}
                className="bg-corporate-blue-light hover:bg-corporate-blue-dark text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Guardar Checklist
              </button>
            </div>
            {showSuccess && (
                <div className="mt-4 text-center p-3 rounded-md bg-green-100 text-green-700">
                    ¡Checklist guardado con éxito! (Simulación)
                </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">Por favor, seleccione una sede para ver su checklist.</p>
        )}
      </div>
    </div>
  );
};

export default Checklist;
