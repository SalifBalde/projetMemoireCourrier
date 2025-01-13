export interface SuiviCourrierdto {
  id: number;
  structureId: number;
  structureLibelle: string;
  userId: number;
  user: string;
  courrierStatutCourrierId: number;
  courrierStatutCourrierLibelle: string;
  courrierId: number;
  courrierCodeBarre: string;
  createdAt: Date;
}

