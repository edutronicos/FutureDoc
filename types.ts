export interface LegalAnalysisResult {
  resumo: string;
  lista_fatos: string[];
}

export interface AnalysisRecord {
  id: string;
  timestamp: string;
  fileName: string;
  result: LegalAnalysisResult;
}

export interface AnalysisError {
  message: string;
  details?: string;
}

export enum ProcessingStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}