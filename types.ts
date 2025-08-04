
export enum MigrationStatus {
  Pending = "Pendiente",
  InProgress = "En Proceso",
  Migrated = "Migrada",
  Validation = "Validación",
}

export interface Site {
  id: number;
  name: string;
  plannedDate: string;
  actualDate: string | null;
  status: MigrationStatus;
  manager: string;
}

export interface Checklist {
  siteId: number;
  cabinetInstalled: boolean;
  winRouterInstalled: boolean;
  claroRouterInstalled: boolean;
  fiberConnected: boolean;
  fortinetConfigured: boolean;
  networkValidated: boolean;
}

export enum IncidentSeverity {
  High = "Alta",
  Medium = "Media",
  Low = "Baja",
}

export interface Incident {
  id: number;
  date: string;
  site: string;
  description: string;
  severity: IncidentSeverity;
  responsible: string;
  solution: string;
}

export interface LessonLearned {
  id: number;
  site: string;
  lesson: string;
}
