import { AnalysisRecord } from '../types';

const STORAGE_KEY = 'future_doc_db_v1';

/**
 * Simulates a local SQLite database persistence layer.
 * In a real backend environment, this would act as the ORM/DAO layer.
 */
export const StorageService = {
  saveRecord: (record: AnalysisRecord): void => {
    try {
      const existingData = localStorage.getItem(STORAGE_KEY);
      const records: AnalysisRecord[] = existingData ? JSON.parse(existingData) : [];
      records.unshift(record); // Add new record to the top
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      console.log(`[Persistence] Record ${record.id} saved successfully.`);
    } catch (error) {
      console.error("Failed to save record to local storage", error);
    }
  },

  getAllRecords: (): AnalysisRecord[] => {
    try {
      const existingData = localStorage.getItem(STORAGE_KEY);
      return existingData ? JSON.parse(existingData) : [];
    } catch (error) {
      console.error("Failed to retrieve records", error);
      return [];
    }
  }
};