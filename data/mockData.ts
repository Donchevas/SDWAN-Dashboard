
import { Site, MigrationStatus, Checklist, Incident, IncidentSeverity, LessonLearned } from '../types';

const siteNames = [
  "Sede Principal Lima", "Sucursal Arequipa", "Oficina Trujillo", "Centro Cusco", "Almacén Piura",
  "Punto Iquitos", "Agencia Huancayo", "Filial Tacna", "Despacho Chiclayo", "Base Ica",
  "Sede Surco", "Sede Miraflores", "Sede San Isidro", "Sede La Molina", "Sede Callao",
  "Sucursal Puno", "Oficina Cajamarca", "Centro Huaraz", "Almacén Tarapoto", "Punto Pucallpa",
  "Agencia Ayacucho", "Filial Moquegua", "Despacho Tumbes", "Base Jaén", "Sede Chimbote",
  "Sucursal Huánuco", "Oficina Abancay", "Centro Cerro de Pasco", "Almacén Sullana", "Punto Talara",
  "Agencia Nazca", "Filial Chachapoyas", "Despacho Moyobamba", "Base Yurimaguas", "Sede Huacho",
  "Sucursal Barranca", "Oficina Jauja", "Centro La Oroya", "Almacén Juliaca", "Punto Andahuaylas",
  "Agencia Puerto Maldonado", "Filial Tingo María", "Despacho Satipo", "Base Oxapampa", "Sede Tarma",
  "Sucursal Chincha", "Oficina Pisco"
];

const managers = [
  "Ana Torres", "Carlos Ruiz", "Sofía Mendoza", "Luis Arias", "Elena Castro", "Javier Ortiz",
  "Valeria Gomez", "Diego Silva", "Camila Flores", "Mateo Vargas"
];

const getRandomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const statuses = Object.values(MigrationStatus);

export const mockSites: Site[] = siteNames.map((name, index) => {
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const plannedDate = getRandomDate(new Date(2024, 5, 1), new Date(2024, 11, 31));
  let actualDate = null;
  if (status === MigrationStatus.Migrated || status === MigrationStatus.Validation) {
    const planned = new Date(plannedDate);
    actualDate = new Date(planned.setDate(planned.getDate() + Math.floor(Math.random() * 5 - 2))).toISOString().split('T')[0];
  }

  return {
    id: index + 1,
    name,
    plannedDate,
    actualDate,
    status,
    manager: managers[Math.floor(Math.random() * managers.length)],
  };
});

export const mockChecklists: Checklist[] = mockSites.map(site => ({
  siteId: site.id,
  cabinetInstalled: Math.random() > 0.2,
  winRouterInstalled: Math.random() > 0.3,
  claroRouterInstalled: Math.random() > 0.3,
  fiberConnected: Math.random() > 0.4,
  fortinetConfigured: Math.random() > 0.5,
  networkValidated: site.status === MigrationStatus.Migrated || site.status === MigrationStatus.Validation,
}));


export const mockIncidents: Incident[] = [
  { id: 1, date: "2024-06-15", site: "Sede Principal Lima", description: "Pérdida de conectividad intermitente post-migración.", severity: IncidentSeverity.High, responsible: "Equipo de Redes", solution: "Ajuste de MTU en la interfaz WAN. Monitoreo activo." },
  { id: 2, date: "2024-06-22", site: "Sucursal Arequipa", description: "Latencia elevada en aplicaciones críticas.", severity: IncidentSeverity.Medium, responsible: "Ana Torres", solution: "Priorización de tráfico con políticas de QoS." },
  { id: 3, date: "2024-07-01", site: "Oficina Trujillo", description: "Fallo en la redundancia del enlace Claro.", severity: IncidentSeverity.High, responsible: "Proveedor Claro", solution: "Reconfiguración de BGP con el proveedor." },
  { id: 4, date: "2024-07-05", site: "Centro Cusco", description: "El personal no puede acceder a la impresora de red.", severity: IncidentSeverity.Low, responsible: "Soporte TI Local", solution: "Actualización de reglas de firewall en Fortinet." },
];

export const mockLessons: LessonLearned[] = [
  { id: 1, site: "Sede Principal Lima", lesson: "Realizar pruebas de carga con aplicaciones críticas antes de dar por finalizada la migración." },
  { id: 2, site: "Sucursal Arequipa", lesson: "Validar reglas de firewall 24h antes de la migración para evitar bloqueos." },
  { id: 3, site: "Oficina Trujillo", lesson: "Asegurar la presencia de un técnico del proveedor durante la ventana de cambio." },
  { id: 4, site: "Sede Dasso", lesson: "Evitar cambios en VLAN durante horas laborales para minimizar el impacto." },
];
